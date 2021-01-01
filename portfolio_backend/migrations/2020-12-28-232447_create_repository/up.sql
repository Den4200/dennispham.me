CREATE TABLE repositories (
    name TEXT PRIMARY KEY NOT NULL,
    description TEXT,
    language TEXT,
    stargazers INTEGER,
    forks INTEGER,
    ordering INTEGER NOT NULL
);
