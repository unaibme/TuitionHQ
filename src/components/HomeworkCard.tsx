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
    const numberToWords = (num: number) => {
      const ones = [
        'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
        'seventeen', 'eighteen', 'nineteen'
      ];
      const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

      if (num < 20) return ones[num];

      const tenPart = Math.floor(num / 10);
      const onePart = num % 10;
      return onePart === 0 ? tens[tenPart] : `${tens[tenPart]}-${ones[onePart]}`;
    };

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 0) {
      const daysAgo = Math.abs(diffDays);
      const dayWord = numberToWords(daysAgo);
      return `${dayWord} ${daysAgo === 1 ? 'day' : 'days'} ago`;
    }
    return `${diffDays} days left`;
  };

  const getSubjectColor = (subject: string) => {
    const colors = [
      '#EF4444', '#F97316', '#F59E0B', '#84CC16', '#22C55E', 
      '#14B8A6', '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6',
      '#EC4899', '#F43F5E'
    ];
    const hash = subject.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
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

  const handleClick = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setShowMenu(true);
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
      onClick={handleClick}
    >
      <div className="card-row">
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
        
        <span className="date-center">{formatDate(dueDate)}</span>
        
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
