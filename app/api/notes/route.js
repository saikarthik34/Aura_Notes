import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Note from '@/models/Note';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  
  try {
    const notes = await Note.find({ userId: session.user.id }).sort({ updatedAt: -1 });
    return NextResponse.json({ notes });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch notes" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { title, content, colorTag } = await req.json();
    const newNote = await Note.create({ 
      title, 
      content, 
      colorTag,
      userId: session.user.id 
    });
    return NextResponse.json({ note: newNote }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create note" }, { status: 500 });
  }
}
