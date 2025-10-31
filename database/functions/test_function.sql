CREATE OR REPLACE FUNCTION "public"."get_test_int"() RETURNS SETOF "public"."test_table"
    LANGUAGE "sql"
    AS $$
    SELECT *
    FROM test_table;
$$;