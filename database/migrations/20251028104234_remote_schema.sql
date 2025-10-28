set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_dummy_items(n integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$    --Returns # Of Dummy Rows Generated
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
$function$
;

CREATE OR REPLACE FUNCTION public.add_purchase_item(p_requester uuid DEFAULT NULL::uuid, p_part_url character varying DEFAULT NULL::character varying, p_part_name text DEFAULT NULL::text, p_manufacturer_pt_no bigint DEFAULT NULL::bigint, p_unit_price double precision DEFAULT NULL::double precision, p_quantity bigint DEFAULT NULL::bigint, p_supplier text DEFAULT NULL::text, p_status purchase_status DEFAULT NULL::purchase_status, p_notes text DEFAULT NULL::text, p_needed_by date DEFAULT NULL::date, p_order_date date DEFAULT NULL::date, p_order_received_date date DEFAULT NULL::date, p_order_active_status date DEFAULT NULL::date, p_request_id uuid DEFAULT NULL::uuid, p_po_number numeric DEFAULT NULL::numeric)
 RETURNS SETOF purchase_item
 LANGUAGE sql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.check_supabase_connection()
 RETURNS text
 LANGUAGE plpgsql
AS $function$BEGIN
  RETURN 'OK'::TEXT;
END;$function$
;

CREATE OR REPLACE FUNCTION public.get_all_roles()
 RETURNS SETOF role
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.role;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_purchase_item_by_id(p_id uuid)
 RETURNS SETOF purchase_request
 LANGUAGE sql
AS $function$
    SELECT *
    FROM purchase_request
    WHERE id = p_id;
$function$
;

CREATE OR REPLACE FUNCTION public.get_purchase_item_by_status(p_status purchase_status)
 RETURNS SETOF purchase_item
 LANGUAGE sql
AS $function$
    SELECT *
    FROM purchase_item
    WHERE purchase_item.status = p_status;
$function$
;

CREATE OR REPLACE FUNCTION public.get_purchase_items()
 RETURNS SETOF purchase_item
 LANGUAGE sql
AS $function$
    SELECT *
    FROM purchase_item;
$function$
;

CREATE OR REPLACE FUNCTION public.get_role_by_id(role_id uuid)
 RETURNS SETOF role
 LANGUAGE sql
AS $function$
  SELECT *
  FROM public.role
  WHERE id = role_id;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_by_id(p_id integer)
 RETURNS SETOF users
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY 
  SELECT *
  FROM public.user
  WHERE id = p_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_by_name(p_name text)
 RETURNS SETOF users
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.user
  WHERE name = p_name;
  END;
$function$
;

CREATE OR REPLACE FUNCTION public.seed_purchase_items(n integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$    --Returns # Of Dummy Rows Generated
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
$function$
;

CREATE OR REPLACE FUNCTION public.update_role_permissions(role_id uuid, permission_updates jsonb)
 RETURNS SETOF role
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN QUERY
  UPDATE "role"
  SET permissions = permissions::JSONB || permission_updates
  WHERE id = role_id
  RETURNING *;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_user(updates jsonb)
 RETURNS TABLE(id uuid, name text, email text, lsu_email text, eight_nine bigint, hazing_status boolean, fee_status boolean, grad_date date, shirt_size text, system text, subsystem text)
 LANGUAGE plpgsql
AS $function$
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
$function$
;



