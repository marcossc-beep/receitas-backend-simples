CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    data_criacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    data_criacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE receitas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    modo_preparo TEXT NOT NULL,
    ingredientes TEXT NOT NULL,
    tempo_preparo_minutos INT,
    porcoes INT,
    publicada BOOLEAN NOT NULL DEFAULT FALSE,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE SET NULL,
    categoria_id INT REFERENCES categorias(id) ON DELETE SET NULL,
    data_criacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -- Criação da tabela de usuários
-- CREATE TABLE usuarios (
--     id SERIAL PRIMARY KEY,
--     nome VARCHAR(100) NOT NULL,
--     senha VARCHAR(100) NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     telefone VARCHAR(20)
-- );

-- -- Criação da tabela de categorias
-- CREATE TABLE categorias (
--     id SERIAL PRIMARY KEY,
--     nome VARCHAR(100) NOT NULL


-- -- Criação da tabela de receitas
-- CREATE TABLE receitas (
--     id SERIAL PRIMARY KEY,
--     nome VARCHAR(100) NOT NULL,
--     modo_preparo TEXT NOT NULL,
--     ingredientes TEXT NOT NULL,
--     usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
--     categoria_id INTEGER REFERENCES categorias(id) ON DELETE CASCADE
-- );
