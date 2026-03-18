import { GraduationCap } from 'lucide-react';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-icon">
          <GraduationCap size={28} />
        </div>
        <div className="header-text">
          <h1>Homework Tracker</h1>
          <p className="header-subtitle">Tutor: Unaib</p>
        </div>
      </div>
    </header>
  );
}
