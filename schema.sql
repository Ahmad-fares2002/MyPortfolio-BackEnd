CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sections (
  id SERIAL PRIMARY KEY,
  title TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL
);
INSERT INTO users (username, email, password, role)
VALUES ('Ahmad', 'ahmad-fares37@hotmail.com', '12345678', 'admin');

INSERT INTO sections (title, content)
VALUES ('Hello I am Ahmad', 'passionate about blending cutting-edge technology with creative marketing solutions. I specialize in immersive AR experiences and digital storytelling to help brands connect with their audiences in fresh, impactful ways.');
