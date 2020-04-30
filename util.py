from datetime import datetime
import os
import psycopg2
import psycopg2.extras
import bcrypt

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


# Creates a decorator to handle the database connection/cursor opening/closing.
# Creates the cursor with RealDictCursor, thus it returns real dictionaries, where the column names are the keys.


def get_connection_string():
    # setup connection string
    # to do this, please define these environment variables first

    user_name = os.environ.get('PSQL_USER_NAME')
    password = os.environ.get('PSQL_PASSWORD')
    host = os.environ.get('PSQL_HOST')
    database_name = os.environ.get('PSQL_DB_NAME')

    # user_name = 'gsus'
    # password = 'admin'
    # host = '127.0.0.1'
    # database_name = 'application_process'

    env_variables_defined = user_name and password and host and database_name

    if env_variables_defined:
        # this string describes all info for psycopg2 to connect to the database
        return 'postgresql://{user_name}:{password}@{host}/{database_name}'.format(
            user_name=user_name,
            password=password,
            host=host,
            database_name=database_name
        )
    else:
        raise KeyError('Some necessary environment variable(s) are not defined')


def open_database():
    try:
        connection_string = get_connection_string()
        connection = psycopg2.connect(connection_string)
        connection.autocommit = True
    except psycopg2.DatabaseError as exception:
        print('Database connection problem')
        raise exception
    return connection


def connection_handler(function):
    def wrapper(*args, **kwargs):
        connection = open_database()
        # we set the cursor_factory parameter to return with a RealDictCursor cursor (cursor which provide dictionaries)
        dict_cur = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        ret_value = function(dict_cur, *args, **kwargs)
        dict_cur.close()
        connection.close()
        return ret_value

    return wrapper


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def timestamp_to_datetime(timestamp):
    timestamp = int(timestamp)
    display_time = datetime.fromtimestamp(timestamp)
    return display_time


def get_current_timestamp():
    now = datetime.now()
    timestamp = str(int(datetime.timestamp(now)))
    return timestamp


def convert_timestamps_to_display(list_of_dict):
    for item in list_of_dict:
        item["submission_time"] = timestamp_to_datetime(item["submission_time"])
    return list_of_dict


def hash_password(text):
    hashed_pass = bcrypt.hashpw(text.encode('utf-8'), bcrypt.gensalt())
    return hashed_pass.decode('utf-8')


def verify_password(text, hashed_password):
    hashed_bytes_pass = hashed_password.encode('utf-8')
    return bcrypt.checkpw(text.encode('utf-8'), hashed_bytes_pass)
