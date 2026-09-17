export const USERS = {
  validUser: {
    email: 'usuario.sucesso@qazero.com',
    password: 'Qa@123456',
  },
  blockedUser: {
    email: 'usuario.bloqueado@qazero.com',
    password: 'Qa@123456',
  },
  noPermissionUser: {
    email: 'usuario.sempermissao@qazero.com',
    password: 'Qa@123456',
  },
  suspendedUser: {
    email: 'usuario.suspenso@qazero.com',
    password: 'Qa@123456',
  },
  invalidUser: {
    email: 'usuario.invalido@qazero.com',
    password: 'Qa@123456',
  },
  ordersUser: {
    email: 'usuario.orders@qazero.com',
    password: 'Qa@123456',
  },
} as const

export const STORAGE_STATE = {
  validUser: 'playwright/.auth/user.json',
  ordersUser: 'playwright/.auth/orders-user.json',
} as const
