CREATE TABLE IF NOT EXISTS "public"."test_table" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
   "test_int" BIGINT,
   "test_string" TEXT,
    "test_numeric" numeric GENERATED ALWAYS AS (("test_int" * 5)::double precision) STORED,
    "test_date" DATE
);