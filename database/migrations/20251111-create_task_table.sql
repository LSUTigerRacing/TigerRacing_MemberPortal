CREATE TABLE IF NOT EXISTS public.task (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assigner uuid REFERENCES public.users(id) ON DELETE SET NULL,
  completion_st bool DEFAULT false,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  start_date timestamptz DEFAULT now(),
  due_date timestamptz DEFAULT now()
);