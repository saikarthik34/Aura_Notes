import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Note from '@/models/Note';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { id } = await params;
    const { title, content, colorTag } = await req.json();

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { title, content, colorTag },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ message: "Note not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ note: updatedNote });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update note" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { id } = await params;
    
    const deletedNote = await Note.findOneAndDelete({ _id: id, userId: session.user.id });

    if (!deletedNote) {
      return NextResponse.json({ message: "Note not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete note" }, { status: 500 });
  }
}
