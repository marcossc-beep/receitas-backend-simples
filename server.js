
import Fastify from 'fastify';
import cors from '@fastify/cors';
import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: 'local',
  host: 'localhost',
  database: 'receitassimples',
  password: '12345',
  port: 5433,
});


const server = Fastify();
// Habilita CORS para todas as origens (ajuste origin se quiser restringir)
await server.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

// CRUD USUÁRIOS

//CRIAR USUARIO
server.post('/usuarios', async (req, reply) => {
  const { nome, senha, email, telefone } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nome, senha, email, telefone) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, senha, email, telefone]
    );
    reply.send(result.rows[0]);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
});

// LOGIN
server.post('/login', async (req, reply) => {
  const { email, senha } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1 AND senha = $2',
      [email, senha]
    );
    if (result.rows.length === 0) {
      return reply.status(401).send({ error: 'Email ou senha inválidos' });
    }
    reply.send({ message: 'Login realizado com sucesso', usuario: result.rows[0] });
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
});

server.get('/usuarios', async (req, reply) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    reply.send(result.rows);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
});

server.put('/usuarios/:id', async (req, reply) => {
  const { id } = req.params;
  const { nome, senha, email, telefone } = req.body;
  try {
    const result = await pool.query(
      'UPDATE usuarios SET nome=$1, senha=$2, email=$3, telefone=$4 WHERE id=$5 RETURNING *',
      [nome, senha, email, telefone, id]
    );
    reply.send(result.rows[0]);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
});

server.delete('/usuarios/:id', async (req, reply) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM usuarios WHERE id=$1', [id]);
    reply.send({ message: 'Usuário deletado' });
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
});

// CRUD CATEGORIAS
server.post('/categorias', async (req, reply) => {
  const { nome } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO categorias (nome) VALUES ($1) RETURNING *',
      [nome]
    );
    reply.send(result.rows[0]);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
});

server.get('/categorias', async (req, reply) => {
  try {
    const result = await pool.query('SELECT * FROM categorias');
    reply.send(result.rows);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
});

server.put('/categorias/:id', async (req, reply) => {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    const result = await pool.query(
      'UPDATE categorias SET nome=$1 WHERE id=$2 RETURNING *',
      [nome, id]
    );
    reply.send(result.rows[0]);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
});

server.delete('/categorias/:id', async (req, reply) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM categorias WHERE id=$1', [id]);
    reply.send({ message: 'Categoria deletada' });
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
});

// CRUD RECEITAS
server.post('/receitas', async (req, reply) => {
  const { nome, modo_preparo, ingredientes, usuario_id, categoria_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO receitas (nome, modo_preparo, ingredientes, usuario_id, categoria_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, modo_preparo, ingredientes, usuario_id, categoria_id]
    );
    reply.send(result.rows[0]);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
});

server.get('/receitas', async (req, reply) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // Colunas permitidas para ordenação
  const allowedOrder = ['id', 'nome', 'data_criacao', 'publicada', 'tempo_preparo_minutos', 'porcoes', 'usuario_id', 'categoria_id'];
  const sort = allowedOrder.includes(req.query.sort) ? req.query.sort : 'id';
  const order = req.query.order === 'desc' ? 'DESC' : 'ASC';

  try {
    const result = await pool.query(
      `SELECT * FROM receitas ORDER BY ${sort} ${order} LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    reply.send(result.rows);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
});

server.put('/receitas/:id', async (req, reply) => {
  const { id } = req.params;
  const { nome, modo_preparo, ingredientes, usuario_id, categoria_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE receitas SET nome=$1, modo_preparo=$2, ingredientes=$3, usuario_id=$4, categoria_id=$5 WHERE id=$6 RETURNING *',
      [nome, modo_preparo, ingredientes, usuario_id, categoria_id, id]
    );
    reply.send(result.rows[0]);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
});

server.delete('/receitas/:id', async (req, reply) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM receitas WHERE id=$1', [id]);
    reply.send({ message: 'Receita deletada' });
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
});

server.listen({ port: 3000, host: '0.0.0.0'});