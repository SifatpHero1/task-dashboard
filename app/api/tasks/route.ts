import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const whereClause = session.user.role === "ADMIN" ? {} : { userId: session.user.id };
  const tasks = await prisma.task.findMany({ where: whereClause, orderBy: { createdAt: "desc" } });
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description } = await req.json();
  if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

  const newTask = await prisma.task.create({
    data: { title, description, userId: session.user.id },
  });
  return NextResponse.json(newTask, { status: 201 });
}