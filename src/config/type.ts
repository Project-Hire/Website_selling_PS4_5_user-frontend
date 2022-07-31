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
