"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

// Define the Poll type
interface Poll {
  id: string;
  question: string;
  choices: string[];
}

export default function Polls() {
  const [polls, setPolls] = useState<Poll[]>([]); // Use the Poll type
  
  useEffect(() => {
    const fetchPolls = async () => {
      const { data, error } = await supabase.from("polls").select("*");
      if (error) {
        console.error("Error fetching polls:", error);
        return;
      }
      setPolls(data);
    };
    fetchPolls();
  }, []);

  const vote = async (pollId: string, choice: string) => {
    const { data, error } = await supabase.from("votes").insert([{ poll_id: pollId, choice, user_id: "anonymous" }]);
    if (error) {
      console.error("Error casting vote:", error);
      return;
    }
    console.log("Vote casted:", data);
  };

  return (
    <div>
      {polls.length === 0 ? (
        <p>Loading polls...</p>
      ) : (
        polls.map((poll) => (
          <div key={poll.id} className="p-4 border rounded-lg my-4">
            <h2 className="text-lg font-bold">{poll.question}</h2>
            {poll.choices.map((choice: string) => (
              <button key={choice} onClick={() => vote(poll.id, choice)} className="bg-purple-500 text-white px-3 py-1 rounded mr-2 mt-2">{choice}</button>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
