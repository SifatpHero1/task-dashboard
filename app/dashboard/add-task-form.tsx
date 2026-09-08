"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTaskForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      router.refresh(); // Server component রি-লোড হয়ে নতুন টাস্ক দেখাবে
    } else {
      setError("টাস্ক তৈরি করা যায়নি! আবার চেষ্টা করুন।");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 mb-6 space-y-3">
      <h2 className="text-xl font-semibold">Add New Task</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        rows={2}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}