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
  'English Language',
  'English Literature',
  'Science',
  'History',
  'Geography',
  'Urdu Language',
  'Urdu Literature',
  'Islamiyat',
  'Computer Science',
];

export const getStudentById = (id: string): Student | undefined => {
  return students.find(s => s.id === id);
};
