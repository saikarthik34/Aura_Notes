"use client";

import styles from "./NoteCard.module.css";

export default function NoteCard({ note, onEdit, onDelete }) {
  const formattedDate = new Date(note.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div 
      className={`glass-panel ${styles.card}`} 
      style={{ borderTopColor: note.colorTag || "var(--accent-color)" }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{note.title}</h3>
      </div>
      <div className={styles.content}>
        {note.content}
      </div>
      <div className={styles.footer}>
        <span>{formattedDate}</span>
        <div className={styles.actions}>
          <button 
            className={styles.actionBtn} 
            onClick={(e) => { e.stopPropagation(); onEdit(note); }}
            title="Edit Note"
          >
            ✏️
          </button>
          <button 
            className={`${styles.actionBtn} ${styles.delete}`} 
            onClick={(e) => { e.stopPropagation(); onDelete(note._id); }}
            title="Delete Note"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
