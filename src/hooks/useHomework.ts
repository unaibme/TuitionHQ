import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Homework } from '../types/homework';

const STORAGE_KEY = 'homework-tracker-data';

interface DbHomework {
  id: string;
  student_id: string;
  subject: string;
  due_date: string;
  notes: string;
  completed: boolean;
  created_at: string;
}

function mapDbToHomework(db: DbHomework): Homework {
  return {
    id: db.id,
    studentId: db.student_id as 'muhammad' | 'mahveen' | 'hadia',
    subject: db.subject,
    dueDate: db.due_date,
    notes: db.notes,
    completed: db.completed,
    createdAt: db.created_at,
  };
}

export function useHomework() {
  const [homework, setHomework] = useState<Homework[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      
      if (isOnline) {
        try {
          const { data, error } = await supabase
            .from('homework')
            .select('*')
            .order('due_date', { ascending: true });
          
          if (error) {
            console.error('Supabase error:', error);
            loadFromLocalStorage();
          } else if (data) {
            const mapped = data.map(mapDbToHomework);
            setHomework(mapped);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
          }
        } catch (err) {
          console.error('Error loading from Supabase:', err);
          loadFromLocalStorage();
        }
      } else {
        loadFromLocalStorage();
      }
      
      setIsLoading(false);
    }
    
    loadData();
  }, [isOnline]);

  function loadFromLocalStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHomework(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse homework data:', e);
      }
    }
  }

  const addHomework = useCallback((newHomework: Omit<Homework, 'id' | 'createdAt' | 'completed'>) => {
    const homeworkItem: Homework = {
      ...newHomework,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setHomework(prev => {
      const updated = [...prev, homeworkItem];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    if (isOnline) {
      supabase
        .from('homework')
        .insert({
          id: homeworkItem.id,
          student_id: homeworkItem.studentId,
          subject: homeworkItem.subject,
          due_date: homeworkItem.dueDate,
          notes: homeworkItem.notes,
          completed: homeworkItem.completed,
          created_at: homeworkItem.createdAt,
        })
        .then(({ error }) => {
          if (error) console.error('Supabase insert error:', error);
        });
    }
  }, [isOnline]);

  const toggleComplete = useCallback((id: string) => {
    setHomework(prev => {
      const updated = prev.map(h => 
        h.id === id ? { ...h, completed: !h.completed } : h
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    if (isOnline) {
      const item = homework.find(h => h.id === id);
      if (item) {
        supabase
          .from('homework')
          .update({ completed: !item.completed })
          .eq('id', id)
          .then(({ error }) => {
            if (error) console.error('Supabase update error:', error);
          });
      }
    }
  }, [homework, isOnline]);

  const deleteHomework = useCallback((id: string) => {
    setHomework(prev => {
      const updated = prev.filter(h => h.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    if (isOnline) {
      supabase
        .from('homework')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.error('Supabase delete error:', error);
        });
    }
  }, [isOnline]);

  const updateHomework = useCallback((updatedHomework: Homework) => {
    setHomework(prev => {
      const updated = prev.map(h => 
        h.id === updatedHomework.id ? updatedHomework : h
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    if (isOnline) {
      supabase
        .from('homework')
        .update({
          student_id: updatedHomework.studentId,
          subject: updatedHomework.subject,
          due_date: updatedHomework.dueDate,
          notes: updatedHomework.notes,
          completed: updatedHomework.completed,
          updated_at: new Date().toISOString(),
        })
        .eq('id', updatedHomework.id)
        .then(({ error }) => {
          if (error) console.error('Supabase update error:', error);
        });
    }
  }, [isOnline]);

  const sortedHomework = [...homework].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return {
    homework: sortedHomework,
    isLoading,
    isOnline,
    addHomework,
    toggleComplete,
    deleteHomework,
    updateHomework,
  };
}
