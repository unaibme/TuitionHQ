import { useState, useRef } from 'react';
import type { Homework } from '../types/homework';
import { getStudentById } from '../data/students';
import './HomeworkCard.css';

interface HomeworkCardProps {
  homework: Homework;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (homework: Homework) => void;
}

export function HomeworkCard({ homework, onToggleComplete, onDelete, onEdit }: HomeworkCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const longPressTimer = useRef<number | null>(null);

  const student = getStudentById(homework.studentId);
  const parseDateOnly = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };
  const dueDate = parseDateOnly(homework.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const isOverdue = !homework.completed && dueDate < today;
  const isDueToday = dueDate.toDateString() === today.toDateString();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysRemaining = () => {
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day';
    if (diffDays < 0) {
      const daysAgo = Math.abs(diffDays);
      return `${daysAgo} days`;
    }
    return `${diffDays} days`;
    return `${diffDays} days`;
  };

  const getSubjectColor = (subject: string) => {
    void subject;
    return '#FFFFFF';
  };

  const handleLongPressStart = (_e: React.MouseEvent | React.TouchEvent) => {
    longPressTimer.current = window.setTimeout(() => {
      setShowMenu(true);
    }, 500);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div 
      className={`homework-card ${homework.completed ? 'completed' : ''}`}
      style={{ 
        borderColor: student?.color,
        background: `linear-gradient(135deg, ${student?.color}40 0%, var(--bg-secondary) 60%)`
      }}
      onMouseDown={handleLongPressStart}
      onMouseUp={handleLongPressEnd}
      onMouseLeave={handleLongPressEnd}
      onTouchStart={handleLongPressStart}
      onTouchEnd={handleLongPressEnd}
    >
      <div className="card-row">
        <div className="left-meta">
          <span 
            className="subject-badge"
            style={{ 
              backgroundColor: getSubjectColor(homework.subject) + '20',
              borderColor: getSubjectColor(homework.subject),
              color: getSubjectColor(homework.subject)
            }}
          >
            {homework.subject}
          </span>
          <span className="date-inline">{formatDate(dueDate)}</span>
        </div>
        
        <span
          className="student-badge"
          style={{
            borderColor: student?.color,
            color: student?.color
          }}
        >
          {student?.name}
        </span>
        
        <span className={`days-right ${isOverdue ? 'overdue' : ''} ${isDueToday ? 'today' : ''}`}>
          {getDaysRemaining()}
        </span>
      </div>
      
      {homework.notes && (
        <p className="notes">{homework.notes}</p>
      )}

      {showMenu && (
        <div className="context-menu" onClick={(e) => e.stopPropagation()}>
          <button 
            className="menu-item edit"
            onClick={() => { onEdit(homework); closeMenu(); }}
          >
            Edit
          </button>
          <button 
            className="menu-item complete"
            onClick={() => { onToggleComplete(homework.id); closeMenu(); }}
          >
            {homework.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button 
            className="menu-item delete"
            onClick={() => { onDelete(homework.id); closeMenu(); }}
          >
            Delete
          </button>
          <button 
            className="menu-item cancel"
            onClick={closeMenu}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
