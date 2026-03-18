export interface Student {
  id: 'muhammad' | 'mahveen' | 'hadia';
  name: string;
  color: string;
}

export const students: Student[] = [
  { id: 'muhammad', name: 'Muhammad', color: '#22C55E' },
  { id: 'mahveen', name: 'Mahveen', color: '#A855F7' },
  { id: 'hadia', name: 'Hadia', color: '#F97316' },
];

export const subjects = [
  'Math',
  'English',
  'Science',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Geography',
  'Urdu',
  'Computer Science',
  'Art',
  'Music',
];

export const getStudentById = (id: string): Student | undefined => {
  return students.find(s => s.id === id);
};
