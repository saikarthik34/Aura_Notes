"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
import NoteCard from "@/components/NoteCard";
import NoteModal from "@/components/NoteModal";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch("/api/notes");
      if (res.ok) {
        const data = await res.json();
        setNotes(data.notes);
      }
    } catch (error) {
      console.error("Failed to load notes", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchNotes();
    }
  }, [status, router, fetchNotes]);

  const handleSaveNote = async (noteData, noteId) => {
    const url = noteId ? `/api/notes/${noteId}` : "/api/notes";
    const method = noteId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData),
      });

      if (res.ok) {
        fetchNotes();
      }
    } catch (error) {
      console.error("Failed to save note", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const res = await fetch(`/api/notes/${noteId}`, { method: "DELETE" });
      if (res.ok) {
        setNotes(notes.filter(n => n._id !== noteId));
      }
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  };

  const openCreateModal = () => {
    setCurrentNote(null);
    setIsModalOpen(true);
  };

  const openEditModal = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  if (status === "loading" || loading) {
    return <div className={styles.loadingSpinner}>Loading your secure dashboard...</div>;
  }

  return (
    <div className={`container ${styles.dashboardContainer} animate-fade-in`}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.welcomeText}>Hello, {session?.user?.name?.split(' ')[0] || 'User'}!</h1>
        <button className="btn-primary" onClick={openCreateModal}>+ New Note</button>
      </div>

      {notes.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>📝</div>
          <h2>No notes yet</h2>
          <p>Create your first note to start organizing your thoughts.</p>
        </div>
      ) : (
        <div className={styles.notesGrid}>
          {notes.map(note => (
            <NoteCard 
              key={note._id} 
              note={note} 
              onEdit={openEditModal} 
              onDelete={handleDeleteNote} 
            />
          ))}
        </div>
      )}

      <NoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveNote}
        initialData={currentNote}
      />
    </div>
  );
}
