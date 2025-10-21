# DSMeventos Auth Service

Microserviço de autenticação para o sistema DSMeventos com registro, login e gerenciamento de usuários usando JWT.

## Tecnologias

- Node.js + Express
- Prisma ORM + MongoDB
- JWT + bcryptjs
- Swagger (documentação)

## Pré-requisitos

- Node.js (v14+)
- MongoDB Atlas ou MongoDB local

## Instalação

```bash
# Clone o repositório
git clone https://github.com/LeoSudario/-DSMeventos-auth-service.git
cd -DSMeventos-auth-service

# Instale as dependências
npm install

# Configure o .env
cp ".env.ex copy" .env
# Edite o .env com suas credenciais

# Configure o Prisma
npm run prisma:generate
npm run prisma:push
```

## Variáveis de Ambiente (.env)

```env
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/dsmeventos"
PORT=3001
JWT_SECRET="sua_chave_secreta_min_32_caracteres"
```

## Executando

```bash
# Desenvolvimento (com hot-reload)
npm run dev

# Produção
npm start
```

Servidor disponível em: `http://localhost:3001`

## Endpoints

**Documentação Swagger:** `http://localhost:3001/api-docs`


| Método | Endpoint         | Descrição             | Auth |
| ------- | ---------------- | ----------------------- | ---- |
| POST    | `/auth/register` | Registrar novo usuário | Não |
| POST    | `/auth/login`    | Login (retorna JWT)     | Não |
| GET     | `/users/me`      | Ver perfil do usuário  | Sim  |
| PUT     | `/users/me`      | Atualizar perfil        | Sim  |

## 💡 Exemplos de Uso

### 1. Registrar um novo usuário

**Request:**

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@dsm.com",
    "senha": "123456"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Usuário registrado com sucesso",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "nome": "João Silva",
    "email": "joao@dsm.com",
    "createdAt": "2025-10-21T10:30:00.000Z"
  }
}
```

### 2. Fazer login

**Request:**

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@dsm.com",
    "senha": "123456"
  }'
```

**Response:**

```json
{
  "message": "Login bem-sucedido!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Obter perfil do usuário (requer token)

**Request:**

```bash
curl -X GET http://localhost:3001/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "nome": "João Silva",
    "email": "joao@dsm.com",
    "createdAt": "2025-10-21T10:30:00.000Z"
  }
}
```

### 4. Atualizar perfil do usuário (requer token)

**Request:**

```bash
curl -X PUT http://localhost:3001/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva Santos"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Perfil atualizado com sucesso",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "nome": "João Silva Santos",
    "email": "joao@dsm.com",
    "createdAt": "2025-10-21T10:30:00.000Z"
  }
}
```

## 🔐 Variáveis de Ambiente


| Variável    | Descrição                              | Exemplo                                          |
| ------------ | ---------------------------------------- | ------------------------------------------------ |
| DATABASE_URL | String de conexão do MongoDB            | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| PORT         | Porta onde o servidor irá executar      | `3001`                                           |
| JWT_SECRET   | Chave secreta para assinar os tokens JWT | `sua_chave_secreta_min_32_caracteres`            |

**⚠️ Importante:** O `JWT_SECRET` deve ser uma string longa e aleatória. Nunca compartilhe ou exponha suas credenciais!

## 🔒 Segurança

- Senhas são criptografadas usando bcryptjs com salt de 10 rounds
- Tokens JWT expiram em 1 hora (configurável)
- Middleware de autenticação valida tokens em rotas protegidas
- Validação de formato de email e força de senha
- Senhas nunca são retornadas nas respostas da API

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor em modo produção
- `npm run dev` - Inicia o servidor em modo desenvolvimento com hot-reload
- `npm run prisma:generate` - Gera o Prisma Client
- `npm run prisma:push` - Sincroniza o schema com o banco de dados

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto faz parte da atividade Web III - DSMeventos.

## 👥 Equipe 1

- Daniel
- Gabriel Cintra
- Iago
- Kaio
- Leonardo
- Pedro Xavier
- Roberta

---

⚡ Desenvolvido com Node.js e ❤️
