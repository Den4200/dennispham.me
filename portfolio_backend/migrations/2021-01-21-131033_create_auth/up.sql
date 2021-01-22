CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    login_session TEXT
);

CREATE TABLE login_history (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id),
    login_timestamp TIMESTAMP NOT NULL
);
