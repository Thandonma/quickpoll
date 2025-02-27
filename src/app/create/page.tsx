"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Navbar from "@/app/components/Navbar";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  const [loading, setLoading] = useState(false);

  const addChoice = () => {
    if (choices.length < 4) setChoices([...choices, ""]);
  };

  const removeChoice = (index: number) => {
    if (choices.length > 2) {
      const newChoices = choices.filter((_, i) => i !== index);
      setChoices(newChoices);
    }
  };

  const handleSubmit = async () => {
    if (question.trim() === "" || choices.some((c) => c.trim() === "")) {
      alert("Please fill in all fields before creating the poll.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.from("polls").insert([{ question, choices }]);
      if (error) throw new Error(error.message);

      console.log("Inserted poll data:", data);

      alert("Poll created successfully! 🎉");
      setQuestion("");
      setChoices(["", ""]);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error creating poll:", err);
        alert(`Failed to create poll: ${err.message}`);
      } else {
        console.error("Unexpected error:", err);
        alert("Failed to create poll: An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter poll question"
          className="w-full border p-2 rounded"
        />
        
        {choices.map((c, i) => (
          <div key={i} className="flex items-center space-x-2">
            <input
              value={c}
              onChange={(e) => {
                const newChoices = [...choices];
                newChoices[i] = e.target.value;
                setChoices(newChoices);
              }}
              placeholder={`Choice ${i + 1}`}
              className="w-full border p-2 my-2 rounded"
            />
            {choices.length > 2 && (
              <button onClick={() => removeChoice(i)} className="text-red-500">✖</button>
            )}
          </div>
        ))}
        
        {choices.length < 4 && (
          <button onClick={addChoice} className="bg-purple-500 text-white px-4 py-2 rounded mt-2">
            + Add Choice
          </button>
        )}
        
        <button
          onClick={handleSubmit}
          disabled={loading} 
          className={`bg-purple-700 text-white px-4 py-2 rounded mt-3 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Creating Poll..." : "Create Poll"}
        </button>
      </div>
    </div>
  );
}
