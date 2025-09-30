CREATE TABLE feedback (
    id INTEGER PRIMARY KEY,
    atendimento INTEGER NOT NULL,
    acessibilidade INTEGER NOT NULL,
    infra INTEGER NOT NULL,
    seguranca INTEGER NOT NULL,
    limpeza INTEGER NOT NULL,
    comentario VARCHAR(250)
);