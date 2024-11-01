CREATE TABLE IF NOT EXISTS Ingredientes (
    id_ingrediente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco NUMERIC(10, 2),
    descricao TEXT
);


CREATE TABLE IF NOT EXISTS Pratos (
    id_prato SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    ingredientes TEXT[],
    preco DECIMAL(10,2) NOT NULL
);


CREATE TABLE IF NOT EXISTS Pedidos (
    id_pedido BIGSERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    telefone VARCHAR(13) NOT NULL,
    observacoes VARCHAR(255),
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pratos TEXT[] NOT NULL,
    ingredientes_extras TEXT[],
    total DECIMAL(10,2) NOT NULL,
    status_pedido VARCHAR(50) NOT NULL,
    pagamento VARCHAR(10) NOT NULL
);