import { BookOpen } from 'lucide-react';
import type { Homework } from '../types/homework';
import { HomeworkCard } from './HomeworkCard';
import './HomeworkList.css';

interface HomeworkListProps {
  homework: Homework[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (homework: Homework) => void;
}

export function HomeworkList({ homework, onToggleComplete, onDelete, onEdit }: HomeworkListProps) {
  if (homework.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <BookOpen size={48} />
        </div>
        <h2>No Homework Yet</h2>
        <p>Tap the + button to add your first homework assignment</p>
      </div>
    );
  }

  return (
    <div className="homework-list">
      {homework.map(h => (
        <HomeworkCard
          key={h.id}
          homework={h}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
