# Future Implementation Guide: Mock REST API & API Testing

This guide documents how to implement local REST API endpoints in **QArena** for API testing in the future without adding external backend servers or extra ports.

---

## 1. Architectural Concept

Currently, `QArena` manages user authentication and application data purely on the client-side via React and Zustand stores.

To prepare for API testing:
* A Connect/Express-style middleware function is integrated into Vite's dev server.
* When Vite runs (`yarn dev`), requests sent to `http://localhost:5173/api/*` are intercepted and handled by an in-memory API server.
* Playwright API tests (and tools like Postman or cURL) can interact directly with `http://localhost:5173/api/...`.

---

## 2. Step-by-Step Implementation

### Step 1: Create `src/api/mockApiServer.ts`

Create a new file at `src/api/mockApiServer.ts` with the following content:

```typescript
import type { Connect } from 'vite'

export interface Usuario {
  id: string
  nome: string
  email: string
  cpf: string
  telefone: string
  senha: string
  numeroConta: string
  creditos: number
  bloqueado: boolean
  permissao: boolean
  contaSuspensa: boolean
  criadoEm: string
}

// In-memory data store initialized with seed users
const usuariosStore: Usuario[] = [
  {
    id: 'seed-1',
    nome: 'Usuário Sucesso',
    email: 'usuario.sucesso@qazero.com',
    cpf: '123.456.789-09',
    telefone: '(11) 91234-5678',
    senha: 'Qa@123456',
    numeroConta: 'QA-0001',
    creditos: 1000,
    bloqueado: false,
    permissao: true,
    contaSuspensa: false,
    criadoEm: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-2',
    nome: 'Usuário Bloqueado',
    email: 'usuario.bloqueado@qazero.com',
    cpf: '234.567.890-10',
    telefone: '(11) 92345-6789',
    senha: 'Qa@123456',
    numeroConta: 'QA-0002',
    creditos: 500,
    bloqueado: true,
    permissao: true,
    contaSuspensa: false,
    criadoEm: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-3',
    nome: 'Usuário Sem Permissão',
    email: 'usuario.sempermissao@qazero.com',
    cpf: '345.678.901-21',
    telefone: '(11) 93456-7890',
    senha: 'Qa@123456',
    numeroConta: 'QA-0003',
    creditos: 500,
    bloqueado: false,
    permissao: false,
    contaSuspensa: false,
    criadoEm: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-4',
    nome: 'Usuário Suspenso',
    email: 'usuario.suspenso@qazero.com',
    cpf: '456.789.012-32',
    telefone: '(11) 94567-8901',
    senha: 'Qa@123456',
    numeroConta: 'QA-0004',
    creditos: 500,
    bloqueado: false,
    permissao: true,
    contaSuspensa: true,
    criadoEm: '2026-01-01T00:00:00.000Z',
  },
]

let proximoNumeroConta = 5

export const mockApiMiddleware: Connect.NextHandleFunction = (req, res, next) => {
  const url = req.url || ''
  const method = req.method || 'GET'

  // Pass non-API requests to Vite static assets/routes
  if (!url.startsWith('/api')) {
    return next()
  }

  let body = ''
  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', () => {
    res.setHeader('Content-Type', 'application/json')
    const parsedBody = body ? JSON.parse(body) : {}

    // POST /api/auth/login
    if (url === '/api/auth/login' && method === 'POST') {
      const { email, senha } = parsedBody
      const usuario = usuariosStore.find((u) => u.email === email)

      if (!usuario) {
        res.statusCode = 404
        return res.end(JSON.stringify({ sucesso: false, erro: 'Usuário não encontrado' }))
      }
      if (usuario.senha !== senha) {
        res.statusCode = 401
        return res.end(JSON.stringify({ sucesso: false, erro: 'Senha incorreta' }))
      }
      if (usuario.contaSuspensa) {
        res.statusCode = 403
        return res.end(JSON.stringify({ sucesso: false, erro: 'Esta conta está suspensa e sem acesso ao sistema.' }))
      }

      res.statusCode = 200
      return res.end(JSON.stringify({ sucesso: true, usuario }))
    }

    // POST /api/auth/cadastro
    if (url === '/api/auth/cadastro' && method === 'POST') {
      const { nome, email, cpf, telefone, senha } = parsedBody
      if (!nome || !email || !cpf || !senha) {
        res.statusCode = 400
        return res.end(JSON.stringify({ sucesso: false, erro: 'Campos obrigatórios ausentes' }))
      }

      const emailExiste = usuariosStore.some((u) => u.email === email)
      if (emailExiste) {
        res.statusCode = 400
        return res.end(JSON.stringify({ sucesso: false, erro: 'E-mail já cadastrado' }))
      }

      const novoUsuario: Usuario = {
        id: `user-${Date.now()}`,
        nome,
        email,
        cpf,
        telefone: telefone || '',
        senha,
        numeroConta: `QA-${String(proximoNumeroConta++).padStart(4, '0')}`,
        creditos: 1000,
        bloqueado: false,
        permissao: true,
        contaSuspensa: false,
        criadoEm: new Date().toISOString(),
      }

      usuariosStore.push(novoUsuario)
      res.statusCode = 201
      return res.end(JSON.stringify({ sucesso: true, usuario: novoUsuario }))
    }

    // GET /api/usuarios
    if (url === '/api/usuarios' && method === 'GET') {
      res.statusCode = 200
      return res.end(JSON.stringify({ sucesso: true, total: usuariosStore.length, usuarios: usuariosStore }))
    }

    // GET /api/cursos
    if (url === '/api/cursos' && method === 'GET') {
      res.statusCode = 200
      return res.end(
        JSON.stringify({
          sucesso: true,
          cursos: [
            { id: '1', titulo: 'Playwright Completo', nivel: 'Avançado' },
            { id: '2', titulo: 'Cypress para Iniciantes', nivel: 'Iniciante' },
          ],
        }),
      )
    }

    // Fallback 404
    res.statusCode = 404
    return res.end(JSON.stringify({ erro: 'Endpoint não encontrado' }))
  })
}
```

---

### Step 2: Register Middleware in `vite.config.ts`

Update `vite.config.ts` to import and register `mockApiMiddleware`:

```typescript
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mockApiMiddleware } from './src/api/mockApiServer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'vite-plugin-mock-api',
      configureServer(server) {
        server.middlewares.use(mockApiMiddleware)
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
```

---

## 3. Example Playwright API Tests

When implemented, create a new test file `tests/api/auth.api.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test.describe('API Testing - Auth Endpoints', () => {
  test('User registration and login lifecycle', async ({ request }) => {
    const newUser = {
      nome: 'QA Tester',
      email: `api.test.${Date.now()}@qazero.com`,
      cpf: '999.888.777-66',
      telefone: '(11) 99999-8888',
      senha: 'Qa@123456',
    }

    // 1. Create User via POST /api/auth/cadastro
    const cadastroRes = await request.post('/api/auth/cadastro', {
      data: newUser,
    })
    expect(cadastroRes.status()).toBe(201)
    const cadastroBody = await cadastroRes.json()
    expect(cadastroBody.sucesso).toBe(true)

    // 2. Login with newly created user via POST /api/auth/login
    const loginRes = await request.post('/api/auth/login', {
      data: {
        email: newUser.email,
        senha: newUser.senha,
      },
    })
    expect(loginRes.status()).toBe(200)
    const loginBody = await loginRes.json()
    expect(loginBody.sucesso).toBe(true)
    expect(loginBody.usuario.email).toBe(newUser.email)
  })
})
```
