import { useState } from 'react';
import { Header } from './components/Header';
import { HomeworkList } from './components/HomeworkList';
import { AddHomeworkModal } from './components/AddHomeworkModal';
import { FAB } from './components/FAB';
import { useHomework } from './hooks/useHomework';
import type { Homework } from './types/homework';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHomework, setEditingHomework] = useState<Homework | null>(null);
  const { homework, isLoading, addHomework, toggleComplete, deleteHomework, updateHomework } = useHomework();

  const handleAdd = () => {
    setEditingHomework(null);
    setIsModalOpen(true);
  };

  const handleEdit = (homeworkItem: Homework) => {
    setEditingHomework(homeworkItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingHomework(null);
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <HomeworkList
          homework={homework}
          isLoading={isLoading}
          onToggleComplete={toggleComplete}
          onDelete={deleteHomework}
          onEdit={handleEdit}
        />
      </main>
      <FAB onClick={handleAdd} />
      <AddHomeworkModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={addHomework}
        onUpdate={updateHomework}
        editingHomework={editingHomework}
      />
    </div>
  );
}

export default App;
