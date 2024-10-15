# app.py (Flask Backend)

from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests for your React frontend

# Database setup
DATABASE = 'emoji_mood.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    name = data.get('name')
    password = data.get('password')
    
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE name = ? AND password = ?', (name, password)).fetchone()
    conn.close()

    if user:
        return jsonify({'status': 'success', 'name': user['name'], 'emoji': user['emoji']}), 200
    else:
        return jsonify({'status': 'failure'}), 401

@app.route('/update_emoji', methods=['POST'])
def update_emoji():
    data = request.json
    name = data.get('name')
    emoji = data.get('emoji')

    conn = get_db_connection()
    conn.execute('UPDATE users SET emoji = ? WHERE name = ?', (emoji, name))
    conn.commit()
    conn.close()

    return jsonify({'status': 'emoji updated'}), 200

@app.route('/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    users = conn.execute('SELECT name, emoji FROM users').fetchall()
    conn.close()

    return jsonify([{'name': user['name'], 'emoji': user['emoji']} for user in users]), 200

if __name__ == '__main__':
    # Create the users table and add some sample users
    with get_db_connection() as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                password TEXT NOT NULL,
                emoji TEXT DEFAULT '🙂'
            )
        ''')
        conn.execute("INSERT INTO users (name, password) VALUES ('user1', 'password1')")
        conn.execute("INSERT INTO users (name, password) VALUES ('user2', 'password2')")
        conn.commit()

    app.run(host='0.0.0.0', port=5000)
