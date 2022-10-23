export interface TRADEMARK {
  id: number
  name: string
  image: string
  create_at: string
  update_at: string
}

export interface CD_GAME {
  create_at: string
  discount: number
  id: number
  image: string
  name: string
  price: number
  quantity: number
  trademark: TRADEMARK
  update_at: string
  viewer: number
}

export interface VoucherCodeResponse {
  status: number
  data: VoucherCode[]
  message: string
}

export interface VoucherCode {
  id: number
  name: string
  discount: number
  expired_at: string
  updated_at: string
  created_at: string
}
