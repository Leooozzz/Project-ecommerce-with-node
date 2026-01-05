# 🛒 E-commerce API + Frontend

Projeto completo de **e-commerce full stack**, com **backend em Node.js (API REST)** e **frontend em Next.js**, incluindo autenticação, carrinho de compras, pedidos,  gerenciamento de usuários.

Ideal para **portfólio**, **estudos** ou como base para um e-commerce real.

---

## 🧠 Visão Geral

- **Backend** responsável por:
  - Produtos
  - Categorias
  - Banners
  - Carrinho
  - Pedidos
  - Usuários
  - Endereços
- **Frontend** moderno utilizando Next.js e shadcn/ui
- Autenticação baseada em **JWT**
- Validações com **Zod**
- Estado global no frontend com **Zustand**
- Arquitetura escalável e organizada

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT (Autenticação)
- Bcrypt (Criptografia de senha)
- Zod (Validação)
- UUID
- Helmet (Segurança)
- Cors
- Dotenv

---

### 🎨 Frontend

- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Zustand (Estado global)
- Zod (Validação de formulários)

---

## 🌐 Rotas da API

### 🖼️ Banners

| Método | Rota      | Descrição      |
|------|-----------|----------------|
| GET  | /banners  | Lista banners  |

---

### 📦 Produtos

| Método | Rota                    | Descrição             |
|------|-------------------------|-----------------------|
| GET  | /products               | Lista produtos        |
| GET  | /product/:id            | Detalhe do produto    |
| GET  | /products/:id/related   | Produtos relacionados|

---

### 🗂️ Categorias

| Método | Rota                        | Descrição              |
|------|-----------------------------|------------------------|
| GET  | /category/:slug/metadata    | Metadados da categoria |

---

### 🛒 Carrinho

| Método | Rota           | Descrição                         |
|------|----------------|-----------------------------------|
| POST | /cart/mount    | Monta o carrinho                  |
| GET  | /cart/shipping | Calcula frete                     |
| POST | /cart/finish  | Finaliza compra (autenticado)     |

---

### 👤 Usuário

| Método | Rota             | Descrição           |
|------|------------------|---------------------|
| POST | /user/register   | Cadastro            |
| POST | /user/login      | Login               |
| POST | /user/addresses | Adiciona endereço   |
| GET  | /user/addresses | Lista endereços     |

📌 Rotas de endereço exigem autenticação.

---

### 📑 Pedidos

| Método | Rota        | Descrição                |
|------|-------------|--------------------------|
| GET  | /orders     | Lista pedidos do usuário |
| GET  | /orders/:id | Detalhe do pedido        |

🔐 Todas as rotas de pedidos são protegidas.

---

## 🔐 Autenticação

- Autenticação baseada em **JWT**
- Middleware para proteger rotas privadas
- Senhas criptografadas com **bcrypt**

---

## ⚙️ Variáveis de Ambiente (Backend)

Crie um arquivo `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/db"
PORT=4444
```

## 🧬 Prisma

Gerar o client
npx prisma generate

Rodar migrations
npx prisma migrate dev

---

##  ▶️ Executando o Projeto
Backend
npm install
npm run dev

Frontend
cd ecommerce-front-end
npm install
npm run dev

---

✅ Funcionalidades

Listagem de produtos e categorias

Carrinho de compras

Cálculo de frete

Autenticação de usuários

Gerenciamento de endereços

Histórico de pedidos

Frontend moderno e responsivo

📌 Observações

Arquitetura escalável

Separação clara entre frontend e backend

Código organizado e fácil de manter

Ideal para e-commerce real ou projeto de portfólio
