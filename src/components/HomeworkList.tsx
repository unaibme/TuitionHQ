import { BookOpen, Loader2 } from 'lucide-react';
import type { Homework } from '../types/homework';
import { HomeworkCard } from './HomeworkCard';
import './HomeworkList.css';

interface HomeworkListProps {
  homework: Homework[];
  isLoading: boolean;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (homework: Homework) => void;
}

export function HomeworkList({ homework, isLoading, onToggleComplete, onDelete, onEdit }: HomeworkListProps) {
  if (isLoading) {
    return (
      <div className="loading-state">
        <Loader2 size={48} className="loading-spinner" />
        <p>Loading homework...</p>
      </div>
    );
  }
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
