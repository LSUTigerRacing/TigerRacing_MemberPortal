CREATE TABLE IF NOT EXISTS public.user_task (
  user_id uuid DEFAULT gen_random_uuid() NOT NULL,
  task_id uuid DEFAULT gen_random_uuid() NOT NULL,
  PRIMARY KEY (user_id, task_id),
  FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE,
  FOREIGN KEY (task_id) REFERENCES public.task(id) ON DELETE CASCADE
);