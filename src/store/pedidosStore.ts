import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ItemPedido {
  produtoId: string
  quantidade: number
  precoUnitario: number
}

export type StatusPedido = 'Processando' | 'Enviado' | 'Entregue'

export interface Pedido {
  id: string
  numeroPedido: string
  usuarioId: string
  itens: ItemPedido[]
  subtotal: number
  desconto: number
  total: number
  cupomUsado: string | null
  status: StatusPedido
  criadoEm: string
}

type DadosNovoPedido = Omit<Pedido, 'id' | 'numeroPedido' | 'criadoEm' | 'status'>

const statusPossiveis: StatusPedido[] = ['Processando', 'Enviado', 'Entregue']

const pedidosSeed: Pedido[] = [
  {
    id: 'seed-pedido-1',
    numeroPedido: 'PED-0001',
    usuarioId: 'seed-5',
    itens: [
      { produtoId: 'caneca-bug-hunter', quantidade: 1, precoUnitario: 39.9 },
      { produtoId: 'camiseta-qa-ninja', quantidade: 2, precoUnitario: 59.9 },
    ],
    subtotal: 159.7,
    desconto: 0,
    total: 159.7,
    cupomUsado: null,
    status: 'Entregue',
    criadoEm: '2026-01-10T10:00:00.000Z',
  },
  {
    id: 'seed-pedido-2',
    numeroPedido: 'PED-0002',
    usuarioId: 'seed-5',
    itens: [
      { produtoId: 'mousepad-qarena', quantidade: 1, precoUnitario: 89.9 },
    ],
    subtotal: 89.9,
    desconto: 0,
    total: 89.9,
    cupomUsado: null,
    status: 'Entregue',
    criadoEm: '2026-01-15T14:30:00.000Z',
  },
  {
    id: 'seed-pedido-3',
    numeroPedido: 'PED-0003',
    usuarioId: 'seed-5',
    itens: [
      { produtoId: 'adesivo-bug-zero', quantidade: 3, precoUnitario: 9.9 },
    ],
    subtotal: 29.7,
    desconto: 0,
    total: 29.7,
    cupomUsado: null,
    status: 'Enviado',
    criadoEm: '2026-02-01T09:15:00.000Z',
  },
  {
    id: 'seed-pedido-4',
    numeroPedido: 'PED-0004',
    usuarioId: 'seed-5',
    itens: [
      { produtoId: 'garrafa-hydration-qa', quantidade: 1, precoUnitario: 49.9 },
    ],
    subtotal: 49.9,
    desconto: 0,
    total: 49.9,
    cupomUsado: null,
    status: 'Enviado',
    criadoEm: '2026-02-10T16:45:00.000Z',
  },
  {
    id: 'seed-pedido-5',
    numeroPedido: 'PED-0005',
    usuarioId: 'seed-5',
    itens: [
      { produtoId: 'boné-tester-pro', quantidade: 1, precoUnitario: 45.0 },
    ],
    subtotal: 45.0,
    desconto: 0,
    total: 45.0,
    cupomUsado: null,
    status: 'Processando',
    criadoEm: '2026-03-01T11:20:00.000Z',
  },
  {
    id: 'seed-pedido-6',
    numeroPedido: 'PED-0006',
    usuarioId: 'seed-5',
    itens: [
      { produtoId: 'moletom-code-clean', quantidade: 1, precoUnitario: 129.9 },
    ],
    subtotal: 129.9,
    desconto: 0,
    total: 129.9,
    cupomUsado: null,
    status: 'Processando',
    criadoEm: '2026-03-05T08:00:00.000Z',
  },
]

interface PedidosState {
  pedidos: Pedido[]
  proximoNumero: number
  criarPedido: (dados: DadosNovoPedido) => Pedido
}

export const usePedidosStore = create<PedidosState>()(
  persist(
    (set, get) => ({
      pedidos: pedidosSeed,
      proximoNumero: 7,

      criarPedido: (dados) => {
        const estado = get()
        const numeroPedido = `PED-${String(estado.proximoNumero).padStart(4, '0')}`
        const status = statusPossiveis[Math.floor(Math.random() * statusPossiveis.length)]

        const pedido: Pedido = {
          ...dados,
          id: crypto.randomUUID(),
          numeroPedido,
          status,
          criadoEm: new Date().toISOString(),
        }

        set({ pedidos: [...estado.pedidos, pedido], proximoNumero: estado.proximoNumero + 1 })
        return pedido
      },
    }),
    { name: 'qarena-pedidos' },
  ),
)
