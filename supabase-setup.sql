-- Run this SQL in your Supabase SQL Editor to create the homework table

-- Create the homework table
CREATE TABLE IF NOT EXISTS homework (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id TEXT NOT NULL,
  subject TEXT NOT NULL,
  due_date DATE NOT NULL,
  notes TEXT DEFAULT '',
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all operations (for this personal app)
CREATE POLICY "Allow all access to homework" ON homework
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Optional: Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_homework_due_date ON homework(due_date);
CREATE INDEX IF NOT EXISTS idx_homework_student_id ON homework(student_id);
