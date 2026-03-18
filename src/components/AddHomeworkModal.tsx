import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { students, subjects } from '../data/students';
import type { Homework } from '../types/homework';
import './AddHomeworkModal.css';

interface AddHomeworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (homework: Omit<Homework, 'id' | 'createdAt' | 'completed'>) => void;
  onUpdate: (homework: Homework) => void;
  editingHomework: Homework | null;
}

export function AddHomeworkModal({ isOpen, onClose, onAdd, onUpdate, editingHomework }: AddHomeworkModalProps) {
  const [studentId, setStudentId] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Populate form when editing
  useEffect(() => {
    if (editingHomework) {
      setStudentId(editingHomework.studentId);
      setSubject(editingHomework.subject);
      setDueDate(editingHomework.dueDate);
      setNotes(editingHomework.notes);
    } else {
      setStudentId('');
      setSubject('');
      setDueDate('');
      setNotes('');
    }
  }, [editingHomework, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !subject || !dueDate) return;

    if (editingHomework) {
      onUpdate({
        ...editingHomework,
        studentId: studentId as 'muhammad' | 'mahveen' | 'hadia',
        subject,
        dueDate,
        notes,
      });
    } else {
      onAdd({
        studentId: studentId as 'muhammad' | 'mahveen' | 'hadia',
        subject,
        dueDate,
        notes,
      });
    }

    handleClose();
  };

  const handleClose = () => {
    setStudentId('');
    setSubject('');
    setDueDate('');
    setNotes('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingHomework ? 'Edit Homework' : 'Add Homework'}</h2>
          <button className="close-btn" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="student">Student</label>
            <select
              id="student"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              required
            >
              <option value="">Select a student</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
            >
              <option value="">Select a subject</option>
              {subjects.map(sub => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add any additional details..."
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editingHomework ? 'Update Homework' : 'Save Homework'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
