"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@prisma/client";

export default function TaskItem({ task }: { task: Task }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const updateStatus = async (status: string) => {
    setBusy(true);
    await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
    setBusy(false);
  };

  const deleteTask = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    setBusy(true);
    await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
    router.refresh();
    setBusy(false);
  };

  return (
    <li className="border p-4 rounded flex justify-between items-center">
      <div>
        <p className={`font-medium ${task.status === "DONE" ? "line-through text-gray-400" : ""}`}>
          {task.title}
        </p>
        <p className="text-sm text-gray-500">{task.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded text-sm ${
          task.status === "DONE" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
        }`}>
          {task.status}
        </span>
        {task.status !== "DONE" && (
          <button
            onClick={() => updateStatus("DONE")}
            disabled={busy}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:bg-gray-400"
          >
            ✅ Done
          </button>
        )}
        <button
          onClick={deleteTask}
          disabled={busy}
          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:bg-gray-400"
        >
          🗑️ Delete
        </button>
      </div>
    </li>
  );
}