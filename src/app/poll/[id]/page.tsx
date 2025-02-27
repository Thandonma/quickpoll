

"use client";


import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";


interface Poll {
  id: string;
  question: string;
  choices: string[]; // Assuming poll has a "choices" array in your DB
}

export default function PollPage() {
  const { id } = useParams();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string>("");

  useEffect(() => {
    const fetchPoll = async () => {
      const { data, error } = await supabase
        .from("polls")
        .select("id, question, choices") // Make sure "choices" column exists in the polls table
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching poll:", error.message);
        return;
      }

      setPoll(data as Poll);
    };

    if (id) fetchPoll();
  }, [id]);

  const handleVote = async () => {
    if (!selectedChoice) {
      alert("Please select a choice before voting.");
      return;
    }

    const { error } = await supabase
      .from("votes")
      .insert([{ poll_id: id, choice: selectedChoice }]);

    if (error) {
      console.error("Error submitting vote:", error.message);
      alert("Failed to submit vote. Please try again.");
    } else {
      alert("Vote submitted successfully!");
    }
  };

  if (!poll) {
    return <p className="text-center py-20">Loading poll...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-purple-700 mb-4 text-center">
          {poll.question}
        </h1>

        <div className="space-y-4">
          {poll.choices.map((choice, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="radio"
                id={`choice-${index}`}
                name="poll-choice"
                value={choice}
                className="w-5 h-5 text-purple-600"
                onChange={() => setSelectedChoice(choice)}
              />
              <label
                htmlFor={`choice-${index}`}
                className="text-lg text-gray-700"
              >
                {choice}
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleVote}
          className="mt-6 w-full bg-purple-600 text-white font-medium py-3 rounded-lg hover:bg-purple-700"
        >
          Submit Vote
        </button>
      </div>
    </div>
  );
}
