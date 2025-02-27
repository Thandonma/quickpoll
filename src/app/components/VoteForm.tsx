"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function VoteForm({ pollId, choices }: { pollId: string, choices: string[] }) {
  const [selectedChoice, setSelectedChoice] = useState<string>("");

  const handleVote = async () => {
    if (!selectedChoice) {
      alert("Please select a choice before voting.");
      return;
    }

    // Check if this choice already has a vote in the votes table for this poll
    const { data, error } = await supabase
      .from("votes")
      .select("id, count")
      .eq("poll_id", pollId)
      .eq("choice", selectedChoice)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching vote:", error.message);
      alert("Something went wrong. Please try again.");
      return;
    }

    if (data) {
      // If the choice already exists, increment count
      const { error: updateError } = await supabase
        .from("votes")
        .update({ count: data.count + 1 })
        .eq("id", data.id);

      if (updateError) {
        console.error("Error updating vote count:", updateError.message);
        alert("Failed to submit vote. Please try again.");
        return;
      }
    } else {
      // If the choice does not exist yet, insert new row with count = 1
      const { error: insertError } = await supabase.from("votes").insert([
        {
          poll_id: pollId,
          choice: selectedChoice,
          count: 1,
        },
      ]);

      if (insertError) {
        console.error("Error inserting vote:", insertError.message);
        alert("Failed to submit vote. Please try again.");
        return;
      }
    }

    alert("Vote submitted successfully!");
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-3">Vote Now</h2>
      {choices.map(choice => (
        <label key={choice} className="block mb-2">
          <input
            type="radio"
            value={choice}
            checked={selectedChoice === choice}
            onChange={() => setSelectedChoice(choice)}
          />
          <span className="ml-2">{choice}</span>
        </label>
      ))}
      <button
        onClick={handleVote}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg"
      >
        Submit Vote
      </button>
    </div>
  );
}
