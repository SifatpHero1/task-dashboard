import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Task } from "@prisma/client";
import AddTaskForm from "./add-task-form";
import TaskItem from "./task-item";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const tasks: Task[] = await prisma.task.findMany({
    where: session.user.role === "ADMIN" ? {} : { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {session.user.email}{" "}
        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">({session.user.role})</span>
      </h1>

      <AddTaskForm />

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found. Create one!</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task: Task) => (
              <TaskItem key={task.id} task={task} />
           ))}
          </ul>
        )}
      </div>
    </div>
  );
}