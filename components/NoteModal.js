"use client";

import { useState, useEffect } from "react";
import styles from "./NoteModal.module.css";

const COLORS = ["#6366f1", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#64748b"];

export default function NoteModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({ title: "", content: "", colorTag: COLORS[0] });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title || "",
          content: initialData.content || "",
          colorTag: initialData.colorTag || COLORS[0]
        });
      } else {
        setFormData({ title: "", content: "", colorTag: COLORS[0] });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;
    
    setIsSaving(true);
    await onSave(formData, initialData?._id);
    setIsSaving(false);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={`glass-panel animate-fade-in ${styles.modalContent}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{initialData ? "Edit Note" : "Create Note"}</h2>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Title</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Note Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              autoFocus
            />
          </div>

          <div className={styles.formGroup} style={{ marginTop: '16px' }}>
            <label>Content</label>
            <textarea 
              className={`input-field ${styles.textarea}`} 
              placeholder="Write your thoughts..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
            />
          </div>

          <div className={styles.formGroup} style={{ marginTop: '16px' }}>
            <label>Color Tag</label>
            <div className={styles.colorPicker}>
              {COLORS.map(color => (
                <div 
                  key={color}
                  className={`${styles.colorOption} ${formData.colorTag === color ? styles.active : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData({...formData, colorTag: color})}
                />
              ))}
            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
