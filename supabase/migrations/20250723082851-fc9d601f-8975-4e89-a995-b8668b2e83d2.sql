-- Fix search path security issues for all functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'admin')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Function to calculate grade from marks
CREATE OR REPLACE FUNCTION public.calculate_grade(marks INTEGER)
RETURNS TEXT AS $$
BEGIN
  CASE
    WHEN marks >= 90 THEN RETURN 'A+';
    WHEN marks >= 80 THEN RETURN 'A';
    WHEN marks >= 70 THEN RETURN 'B+';
    WHEN marks >= 60 THEN RETURN 'B';
    WHEN marks >= 50 THEN RETURN 'C+';
    WHEN marks >= 40 THEN RETURN 'C';
    WHEN marks >= 30 THEN RETURN 'D+';
    WHEN marks >= 20 THEN RETURN 'D';
    ELSE RETURN 'F';
  END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Trigger to auto-calculate grade when inserting/updating results
CREATE OR REPLACE FUNCTION public.auto_calculate_grade()
RETURNS TRIGGER AS $$
BEGIN
  NEW.grade = public.calculate_grade(NEW.marks);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';