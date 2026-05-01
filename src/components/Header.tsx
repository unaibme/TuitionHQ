import { GraduationCap } from 'lucide-react';
import './Header.css';

export function Header() {
  const now = new Date();
  const formattedDate = now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-icon">
          <GraduationCap size={28} />
        </div>
        <div className="header-text">
          <h1>{formattedDate}</h1>
          <div className="header-details">
            <p className="header-subtitle">Tutor: Unaib</p>
          </div>
        </div>
      </div>
    </header>
  );
}
