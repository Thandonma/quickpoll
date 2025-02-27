"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Poll {
  id: string;
  question: string; // Correctly using 'question' as the field name
  choices: Choice[];
}

interface Choice {
  choice: string;
  count: number;
}

export default function RecentPolls() {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    const fetchRecentPolls = async () => {
      const { data: pollsData, error: pollsError } = await supabase
        .from("polls")
        .select("id, question") // Ensure we are selecting 'question'
        .order("created_at", { ascending: false })
        .limit(5);

      if (pollsError) {
        console.error("Error fetching polls:", pollsError.message);
        return;
      }

      const pollsWithVotes = await Promise.all(
        pollsData.map(async (poll) => {
          const { data: votesData, error: votesError } = await supabase
            .from("votes")
            .select("choice, count")
            .eq("poll_id", poll.id);

          if (votesError) {
            console.error(`Error fetching votes for poll ${poll.id}:`, votesError.message);
            return { ...poll, choices: [] };
          }

          return { ...poll, choices: votesData };
        })
      );

      setPolls(pollsWithVotes);
    };

    fetchRecentPolls();
  }, []);

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-2xl font-bold text-purple-700">Recent Polls</h2>

      {polls.map((poll) => (
        <Card key={poll.id} className="rounded-lg shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-black">{poll.question}</CardTitle> {/* Using 'question' */}
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {poll.choices.length > 0 ? (
                poll.choices.map((choice, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 border-b last:border-b-0"
                  >
                    <span className="text-gray-700">{choice.choice}</span>
                    <span className="font-semibold text-purple-700">{choice.count} votes</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No votes yet.</p>
              )}
            </div>

            <div className="mt-4">
              <Link
                href={`/poll/${poll.id}`}
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                View Poll
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}