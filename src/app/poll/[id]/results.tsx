"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // Ensure this path is correct

// Define the Result type
interface Result {
  poll_id: string;
  choice: string;
  count: number;
}

export default function Results() {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const { data, error } = await supabase
        .from("votes")
        .select("poll_id, choice, count") // Ensure the database column names match
        .order("poll_id", { ascending: true });

      if (error) {
        console.error("Error fetching results:", error.message);
        return;
      }

      // Ensure data is typed correctly
      setResults(data as Result[]);
    };

    fetchResults();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700">Poll Results</h1>

      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} className="p-4 border rounded-lg my-4 shadow-md">
            <h2 className="text-lg font-bold">Poll ID: {result.poll_id}</h2>
            <p className="text-purple-600">
              {result.choice}: <span className="font-semibold">{result.count} votes</span>
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No results available.</p>
      )}
    </div>
  );
}
