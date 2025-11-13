CREATE TABLE "public"."projects" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "due_date" DATE,
    "member_count" INT DEFAULT NULL,
    "created_at" TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE "public"."projects" ENABLE ROW LEVEL SECURITY;

