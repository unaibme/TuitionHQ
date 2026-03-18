import { Plus } from 'lucide-react';
import './FAB.css';

interface FABProps {
  onClick: () => void;
}

export function FAB({ onClick }: FABProps) {
  return (
    <button className="fab" onClick={onClick} aria-label="Add homework">
      <Plus size={28} />
    </button>
  );
}
