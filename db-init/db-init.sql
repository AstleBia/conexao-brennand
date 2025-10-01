CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    atendimento INTEGER NOT NULL,
    acessibilidade INTEGER NOT NULL,
    infra INTEGER NOT NULL,
    seguranca INTEGER NOT NULL,
    limpeza INTEGER NOT NULL,
    comentario VARCHAR(250)
);

CREATE TABLE usuario(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50),
    email VARCHAR(30),
    cidade VARCHAR(30)
);

