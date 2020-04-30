from psycopg2.extras import RealDictCursor
import util


@util.connection_handler
def add_question_to_db(cursor, question):
    query = f"""
    INSERT INTO questions (question)
    VALUES (%(question)s);
"""
    cursor.execute(query, {'question': question})


@util.connection_handler
def get_questions(cursor):
    query = f"""
    SELECT question FROM questions ;
    """
    cursor.execute(query)
    return cursor.fetchall()