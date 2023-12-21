CREATE OR REPLACE FUNCTION export_games_to_json(p_export_path text)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    json_text text;
BEGIN
    SELECT json_agg(row_to_json(games))::text INTO json_text FROM games;
    EXECUTE 'COPY (SELECT ' || quote_literal(json_text) || '::text) TO ''' || p_export_path || '''';
END;
$$;

SELECT export_games_to_json('D:/db_course_project/json/games.json');

drop procedure export_games_to_json();