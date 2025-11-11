CREATE TABLE usuario(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50),
    email VARCHAR(30),
    cidade VARCHAR(30),
    dataNascimento DATE,
    sexo VARCHAR(30)
);

CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    usuario_id BIGINT REFERENCES usuario(id),
    atendimento INTEGER NOT NULL,
    acessibilidade INTEGER NOT NULL,
    infra INTEGER NOT NULL,
    seguranca INTEGER NOT NULL,
    limpeza INTEGER NOT NULL,
    comentario VARCHAR(250)
);

CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha_hash VARCHAR(100)
);

