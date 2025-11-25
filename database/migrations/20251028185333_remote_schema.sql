

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."purchase_status" AS ENUM (
    'pending',
    'approved',
    'needs_changes',
    'ordered',
    'arrived',
    'rejected'
);


ALTER TYPE "public"."purchase_status" OWNER TO "postgres";


CREATE TYPE "public"."vendor" AS ENUM (
    'amazon'
);


ALTER TYPE "public"."vendor" OWNER TO "postgres";


CREATE TYPE "public"."vendors" AS ENUM (
    'amazon'
);


ALTER TYPE "public"."vendors" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_dummy_items"("n" integer) RETURNS integer
    LANGUAGE "plpgsql"
    AS $$    --Returns # Of Dummy Rows Generated
DECLARE
  rows INT;
BEGIN
  INSERT INTO public.purchase_item (
    id, requester, part_url, part_name, manufacturer_pt_no,
    unit_price, quantity, supplier, status, notes,
    created_at, needed_by, po_no, order_date, request_id, approvals
  )
  SELECT
    gen_random_uuid() AS id,                                                         
    (SELECT id FROM "users" ORDER BY random() LIMIT 1) AS requester,                                                  
    format('https://example.com/item_%s', i) AS part_url,                            
    format('Item_%s', i) AS part_name,                                                      
    100000 + i AS manufacturer_pt_no,                                                  
    round((random() * 150 + 10)::numeric, 2) AS unit_price,                                  
    (1 + floor(random() * 10))::int AS quantity,                                           
    format('Supplier%s', 1+ (floor(random() * 6))::int) AS supplier,                                 
    (enum_range(NULL::public.purchase_status))[
    1 + floor(random() * array_length(enum_range(NULL::public.purchase_status), 1))::int
    ]::public.purchase_status AS status,                                                 
    format('Dummy_Item_%s', i) AS notes,                                                
    now() - make_interval(days => i) AS created_at,                                          
    current_date + make_interval(days => (2 * (3*i % 11))) AS needed_by,                    
    'TR26-' || LPAD(i::text, 3, '0') AS po_no,                                          
    current_date - make_interval(days => i*5) AS order_date,                                 
    gen_random_uuid() AS request_id,                                                         
    ARRAY[(random()>0.5), (random()>0.5), (random()>0.5)] AS approvals                     
  FROM generate_series(1, n) AS s(i);

  GET DIAGNOSTICS rows = ROW_COUNT;
  RETURN rows;
END;
$$;


ALTER FUNCTION "public"."add_dummy_items"("n" integer) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."purchase_item" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "requester" "uuid" NOT NULL,
    "part_url" character varying,
    "part_name" "text",
    "manufacturer_pt_no" bigint,
    "unit_price" double precision,
    "quantity" bigint,
    "supplier" "text",
    "status" "public"."purchase_status",
    "notes" "text",
    "created_at" timestamp without time zone,
    "needed_by" "date",
    "po_no" character varying DEFAULT '"TR26-"'::character varying,
    "order_date" "date",
    "order_received_date" "date",
    "order_active_status" "date",
    "request_id" "uuid" NOT NULL,
    "subtotal" numeric GENERATED ALWAYS AS (("unit_price" * ("quantity")::double precision)) STORED,
    "approvals" boolean[]
);


ALTER TABLE "public"."purchase_item" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_purchase_item"("p_requester" "uuid" DEFAULT NULL::"uuid", "p_part_url" character varying DEFAULT NULL::character varying, "p_part_name" "text" DEFAULT NULL::"text", "p_manufacturer_pt_no" bigint DEFAULT NULL::bigint, "p_unit_price" double precision DEFAULT NULL::double precision, "p_quantity" bigint DEFAULT NULL::bigint, "p_supplier" "text" DEFAULT NULL::"text", "p_status" "public"."purchase_status" DEFAULT NULL::"public"."purchase_status", "p_notes" "text" DEFAULT NULL::"text", "p_needed_by" "date" DEFAULT NULL::"date", "p_order_date" "date" DEFAULT NULL::"date", "p_order_received_date" "date" DEFAULT NULL::"date", "p_order_active_status" "date" DEFAULT NULL::"date", "p_request_id" "uuid" DEFAULT NULL::"uuid", "p_po_number" numeric DEFAULT NULL::numeric) RETURNS SETOF "public"."purchase_item"
    LANGUAGE "sql"
    AS $$
    INSERT INTO purchase_item (
        requester,
        part_url,
        part_name,
        manufacturer_pt_no,
        unit_price,
        quantity,
        supplier,
        status,
        notes,
        created_at,
        needed_by,
        po_no,
        order_date,
        order_received_date,
        order_active_status,
        request_id
    )
    VALUES (
        COALESCE(p_requester, auth.uid()),        -- default requester
        p_part_url,
        p_part_name,
        p_manufacturer_pt_no,
        p_unit_price,
        p_quantity,
        p_supplier,
        COALESCE(p_status, 'pending'),            -- default status
        p_notes,
        NOW(),                                     -- created_at
        p_needed_by,
        'TR26-' || p_po_number,                    -- NULL if p_po_number not provided
        p_order_date,
        p_order_received_date,
        p_order_active_status,
        p_request_id
    )
    RETURNING *;
$$;


ALTER FUNCTION "public"."add_purchase_item"("p_requester" "uuid", "p_part_url" character varying, "p_part_name" "text", "p_manufacturer_pt_no" bigint, "p_unit_price" double precision, "p_quantity" bigint, "p_supplier" "text", "p_status" "public"."purchase_status", "p_notes" "text", "p_needed_by" "date", "p_order_date" "date", "p_order_received_date" "date", "p_order_active_status" "date", "p_request_id" "uuid", "p_po_number" numeric) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."check_supabase_connection"() RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN 'OK'::TEXT;
END;$$;


ALTER FUNCTION "public"."check_supabase_connection"() OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."role" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" DEFAULT ''::"text" NOT NULL,
    "permissions" "jsonb"
);


ALTER TABLE "public"."role" OWNER TO "postgres";


COMMENT ON TABLE "public"."role" IS 'Role Table';



CREATE OR REPLACE FUNCTION "public"."get_all_roles"() RETURNS SETOF "public"."role"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.role;
END;
$$;


ALTER FUNCTION "public"."get_all_roles"() OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."purchase_request" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "status" "public"."purchase_status",
    "requester" "uuid" DEFAULT "auth"."uid"(),
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."purchase_request" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_purchase_item_by_id"("p_id" "uuid") RETURNS SETOF "public"."purchase_request"
    LANGUAGE "sql"
    AS $$
    SELECT *
    FROM purchase_request
    WHERE id = p_id;
$$;


ALTER FUNCTION "public"."get_purchase_item_by_id"("p_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_purchase_item_by_status"("p_status" "public"."purchase_status") RETURNS SETOF "public"."purchase_item"
    LANGUAGE "sql"
    AS $$
    SELECT *
    FROM purchase_item
    WHERE purchase_item.status = p_status;
$$;


ALTER FUNCTION "public"."get_purchase_item_by_status"("p_status" "public"."purchase_status") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_purchase_items"() RETURNS SETOF "public"."purchase_item"
    LANGUAGE "sql"
    AS $$
    SELECT *
    FROM purchase_item;
$$;


ALTER FUNCTION "public"."get_purchase_items"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_role_by_id"("role_id" "uuid") RETURNS SETOF "public"."role"
    LANGUAGE "sql"
    AS $$
  SELECT *
  FROM public.role
  WHERE id = role_id;
$$;


ALTER FUNCTION "public"."get_role_by_id"("role_id" "uuid") OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" DEFAULT ''::"text" NOT NULL,
    "email" "text" DEFAULT ''::"text",
    "password_hash" "text",
    "lsu_email" "text" DEFAULT ''::"text" NOT NULL,
    "eight_nine" bigint NOT NULL,
    "hazing_status" boolean DEFAULT false NOT NULL,
    "fee_status" boolean DEFAULT false NOT NULL,
    "grad_date" "date",
    "shirt_size" "text",
    "system" "text",
    "subsystem" "text",
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."users" OWNER TO "postgres";


COMMENT ON TABLE "public"."users" IS 'Table containing general user data; Role assignments are found in the user_role table.';



CREATE OR REPLACE FUNCTION "public"."get_user_by_id"("p_id" integer) RETURNS SETOF "public"."users"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY 
  SELECT *
  FROM public.user
  WHERE id = p_id;
END;
$$;


ALTER FUNCTION "public"."get_user_by_id"("p_id" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_by_name"("p_name" "text") RETURNS SETOF "public"."users"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.user
  WHERE name = p_name;
  END;
$$;


ALTER FUNCTION "public"."get_user_by_name"("p_name" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."seed_purchase_items"("n" integer) RETURNS integer
    LANGUAGE "plpgsql"
    AS $$    --Returns # Of Dummy Rows Generated
DECLARE
  rows INT;
BEGIN
  INSERT INTO public.purchase_item (
    id, requester, part_url, part_name, manufacturer_pt_no,
    unit_price, quantity, supplier, status, notes,
    created_at, needed_by, po_no, order_date, request_id, approvals
  )
  SELECT
    gen_random_uuid() AS id,                                                         
    (SELECT id FROM "user" ORDER BY random() LIMIT 1) AS requester,                                                  
    format('https://example.com/item_%s', i) AS part_url,                            
    format('Item_%s', i) AS part_name,                                                      
    100000 + i AS manufacturer_pt_no,                                                  
    round((random() * 150 + 10)::numeric, 2) AS unit_price,                                  
    (1 + floor(random() * 10))::int AS quantity,                                           
    format('Supplier%s', 1+ (floor(random() * 6))::int) AS supplier,                                 
    (enum_range(NULL::public.purchase_status))[
    1 + floor(random() * array_length(enum_range(NULL::public.purchase_status), 1))::int
    ]::public.purchase_status AS status,                                                 
    format('Dummy_Item_%s', i) AS notes,                                                
    now() - make_interval(days => i) AS created_at,                                          
    current_date + make_interval(days => (2 * (3*i % 11))) AS needed_by,                    
    'TR26-' || LPAD(i::text, 3, '0') AS po_no,                                          
    current_date - make_interval(days => i*5) AS order_date,                                 
    gen_random_uuid() AS request_id,                                                         
    ARRAY[(random()>0.5), (random()>0.5), (random()>0.5)] AS approvals                     
  FROM generate_series(1, n) AS s(i);

  GET DIAGNOSTICS rows = ROW_COUNT;
  RETURN rows;
END;
$$;


ALTER FUNCTION "public"."seed_purchase_items"("n" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_role_permissions"("role_id" "uuid", "permission_updates" "jsonb") RETURNS SETOF "public"."role"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  RETURN QUERY
  UPDATE "role"
  SET permissions = permissions::JSONB || permission_updates
  WHERE id = role_id
  RETURNING *;
END;
$$;


ALTER FUNCTION "public"."update_role_permissions"("role_id" "uuid", "permission_updates" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_user"("updates" "jsonb") RETURNS TABLE("id" "uuid", "name" "text", "email" "text", "lsu_email" "text", "eight_nine" bigint, "hazing_status" boolean, "fee_status" boolean, "grad_date" "date", "shirt_size" "text", "system" "text", "subsystem" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    UPDATE users
    SET
        name = COALESCE((updates->>'name')::TEXT, users.name),
        email = COALESCE((updates->>'email')::TEXT, users.email),
        lsu_email = COALESCE((updates->>'lsu_email')::TEXT, users.lsu_email),
        eight_nine = COALESCE((updates->>'eight_nine')::INTEGER, users.eight_nine),
        hazing_status = COALESCE((updates->>'hazing_status')::BOOLEAN, users.hazing_status),
        fee_status = COALESCE((updates->>'fee_status')::BOOLEAN, users.fee_status),
        grad_date = COALESCE((updates->>'grad_date')::TIMESTAMP, users.grad_date),
        shirt_size = COALESCE((updates->>'shirt_size')::TEXT, users.shirt_size),
        system = COALESCE((updates->>'system')::TEXT, users.system),
        subsystem = COALESCE((updates->>'subsystem')::TEXT, users.subsystem)
    WHERE users.id = (updates->>'user_id')::UUID
    RETURNING 
        users.id,
        users.name,
        users.email,
        users.lsu_email,
        users.eight_nine,
        users.hazing_status,
        users.fee_status,
        users.grad_date,
        users.shirt_size,
        users.system,
        users.subsystem;
END;
$$;


ALTER FUNCTION "public"."update_user"("updates" "jsonb") OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."project" (
    "name" "text",
    "due_date" "date",
    "member_count" bigint,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."project" OWNER TO "postgres";


COMMENT ON TABLE "public"."project" IS 'Used to store all project objects and their data.';



CREATE TABLE IF NOT EXISTS "public"."project_task" (
    "project_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "task_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."project_task" OWNER TO "postgres";


COMMENT ON TABLE "public"."project_task" IS 'Used to tell what task is linked to what project';



CREATE TABLE IF NOT EXISTS "public"."task" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "assigner" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "completion_status" boolean DEFAULT false NOT NULL,
    "name" "text" DEFAULT ''::"text",
    "description" "text",
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "start_date" timestamp without time zone DEFAULT "now"() NOT NULL,
    "due_date" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."task" OWNER TO "postgres";


COMMENT ON TABLE "public"."task" IS 'task data';



CREATE TABLE IF NOT EXISTS "public"."user_project" (
    "user_id" "uuid" NOT NULL,
    "project_id" "uuid" NOT NULL
);


ALTER TABLE "public"."user_project" OWNER TO "postgres";


COMMENT ON TABLE "public"."user_project" IS 'Responsible for mapping users to projects';



CREATE TABLE IF NOT EXISTS "public"."user_role" (
    "assigned_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "role_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."user_role" OWNER TO "postgres";


COMMENT ON TABLE "public"."user_role" IS 'Connects user_id to role_ids';



CREATE TABLE IF NOT EXISTS "public"."user_task" (
    "user_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "task_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."user_task" OWNER TO "postgres";


COMMENT ON TABLE "public"."user_task" IS 'which users are assigned to which task';



ALTER TABLE ONLY "public"."project"
    ADD CONSTRAINT "project_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."project_task"
    ADD CONSTRAINT "project_task_pkey" PRIMARY KEY ("task_id", "project_id");



ALTER TABLE ONLY "public"."purchase_item"
    ADD CONSTRAINT "purchase_request_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."purchase_request"
    ADD CONSTRAINT "purchase_request_pkey1" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."role"
    ADD CONSTRAINT "role_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."task"
    ADD CONSTRAINT "task_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_project"
    ADD CONSTRAINT "user_project_pkey" PRIMARY KEY ("user_id", "project_id");



ALTER TABLE ONLY "public"."user_role"
    ADD CONSTRAINT "user_role_pkey" PRIMARY KEY ("role_id", "user_id");



ALTER TABLE ONLY "public"."user_task"
    ADD CONSTRAINT "user_task_pkey" PRIMARY KEY ("user_id", "task_id");



ALTER TABLE ONLY "public"."project_task"
    ADD CONSTRAINT "project_task_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id");



ALTER TABLE ONLY "public"."project_task"
    ADD CONSTRAINT "project_task_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "public"."task"("id");



ALTER TABLE ONLY "public"."purchase_item"
    ADD CONSTRAINT "purchase_request_requester_fkey" FOREIGN KEY ("requester") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."purchase_request"
    ADD CONSTRAINT "purchase_request_requester_fkey1" FOREIGN KEY ("requester") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."task"
    ADD CONSTRAINT "task_assigner_fkey" FOREIGN KEY ("assigner") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."user_project"
    ADD CONSTRAINT "user_project_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_project"
    ADD CONSTRAINT "user_project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_role"
    ADD CONSTRAINT "user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id");



ALTER TABLE ONLY "public"."user_role"
    ADD CONSTRAINT "user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."user_task"
    ADD CONSTRAINT "user_task_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "public"."task"("id");



ALTER TABLE ONLY "public"."user_task"
    ADD CONSTRAINT "user_task_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



CREATE POLICY "Allow all read access for testing" ON "public"."purchase_item" FOR SELECT USING (true);



ALTER TABLE "public"."project" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."project_task" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."purchase_item" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."purchase_request" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."role" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."task" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_project" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_role" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_task" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";






ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."purchase_item";



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."add_dummy_items"("n" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."add_dummy_items"("n" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_dummy_items"("n" integer) TO "service_role";



GRANT ALL ON TABLE "public"."purchase_item" TO "anon";
GRANT ALL ON TABLE "public"."purchase_item" TO "authenticated";
GRANT ALL ON TABLE "public"."purchase_item" TO "service_role";



GRANT ALL ON FUNCTION "public"."add_purchase_item"("p_requester" "uuid", "p_part_url" character varying, "p_part_name" "text", "p_manufacturer_pt_no" bigint, "p_unit_price" double precision, "p_quantity" bigint, "p_supplier" "text", "p_status" "public"."purchase_status", "p_notes" "text", "p_needed_by" "date", "p_order_date" "date", "p_order_received_date" "date", "p_order_active_status" "date", "p_request_id" "uuid", "p_po_number" numeric) TO "anon";
GRANT ALL ON FUNCTION "public"."add_purchase_item"("p_requester" "uuid", "p_part_url" character varying, "p_part_name" "text", "p_manufacturer_pt_no" bigint, "p_unit_price" double precision, "p_quantity" bigint, "p_supplier" "text", "p_status" "public"."purchase_status", "p_notes" "text", "p_needed_by" "date", "p_order_date" "date", "p_order_received_date" "date", "p_order_active_status" "date", "p_request_id" "uuid", "p_po_number" numeric) TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_purchase_item"("p_requester" "uuid", "p_part_url" character varying, "p_part_name" "text", "p_manufacturer_pt_no" bigint, "p_unit_price" double precision, "p_quantity" bigint, "p_supplier" "text", "p_status" "public"."purchase_status", "p_notes" "text", "p_needed_by" "date", "p_order_date" "date", "p_order_received_date" "date", "p_order_active_status" "date", "p_request_id" "uuid", "p_po_number" numeric) TO "service_role";



GRANT ALL ON FUNCTION "public"."check_supabase_connection"() TO "anon";
GRANT ALL ON FUNCTION "public"."check_supabase_connection"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_supabase_connection"() TO "service_role";



GRANT ALL ON TABLE "public"."role" TO "anon";
GRANT ALL ON TABLE "public"."role" TO "authenticated";
GRANT ALL ON TABLE "public"."role" TO "service_role";



GRANT ALL ON FUNCTION "public"."get_all_roles"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_all_roles"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_all_roles"() TO "service_role";



GRANT ALL ON TABLE "public"."purchase_request" TO "anon";
GRANT ALL ON TABLE "public"."purchase_request" TO "authenticated";
GRANT ALL ON TABLE "public"."purchase_request" TO "service_role";



GRANT ALL ON FUNCTION "public"."get_purchase_item_by_id"("p_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_purchase_item_by_id"("p_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_purchase_item_by_id"("p_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_purchase_item_by_status"("p_status" "public"."purchase_status") TO "anon";
GRANT ALL ON FUNCTION "public"."get_purchase_item_by_status"("p_status" "public"."purchase_status") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_purchase_item_by_status"("p_status" "public"."purchase_status") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_purchase_items"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_purchase_items"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_purchase_items"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_role_by_id"("role_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_role_by_id"("role_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_role_by_id"("role_id" "uuid") TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_by_id"("p_id" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_by_id"("p_id" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_by_id"("p_id" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_by_name"("p_name" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_by_name"("p_name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_by_name"("p_name" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."seed_purchase_items"("n" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."seed_purchase_items"("n" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."seed_purchase_items"("n" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."update_role_permissions"("role_id" "uuid", "permission_updates" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."update_role_permissions"("role_id" "uuid", "permission_updates" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_role_permissions"("role_id" "uuid", "permission_updates" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_user"("updates" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."update_user"("updates" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_user"("updates" "jsonb") TO "service_role";


















GRANT ALL ON TABLE "public"."project" TO "anon";
GRANT ALL ON TABLE "public"."project" TO "authenticated";
GRANT ALL ON TABLE "public"."project" TO "service_role";



GRANT ALL ON TABLE "public"."project_task" TO "anon";
GRANT ALL ON TABLE "public"."project_task" TO "authenticated";
GRANT ALL ON TABLE "public"."project_task" TO "service_role";



GRANT ALL ON TABLE "public"."task" TO "anon";
GRANT ALL ON TABLE "public"."task" TO "authenticated";
GRANT ALL ON TABLE "public"."task" TO "service_role";



GRANT ALL ON TABLE "public"."user_project" TO "anon";
GRANT ALL ON TABLE "public"."user_project" TO "authenticated";
GRANT ALL ON TABLE "public"."user_project" TO "service_role";



GRANT ALL ON TABLE "public"."user_role" TO "anon";
GRANT ALL ON TABLE "public"."user_role" TO "authenticated";
GRANT ALL ON TABLE "public"."user_role" TO "service_role";



GRANT ALL ON TABLE "public"."user_task" TO "anon";
GRANT ALL ON TABLE "public"."user_task" TO "authenticated";
GRANT ALL ON TABLE "public"."user_task" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























RESET ALL;

