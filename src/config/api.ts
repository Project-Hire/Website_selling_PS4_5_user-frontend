export const API = process.env.NEXT_PUBLIC_API

export const API_LOGIN = `${API}/auth/login`
export const API_LOGOUT = `${API}/auth/logout`
export const API_REGISTER = `${API}/auth/register`
export const API_RE_REGISTER = `${API}/auth/re_register`
export const API_VERIFY_OTP = `${API}/auth/email/verify_OTP`
export const API_LOGOUT_VERIFY_OTP = `${API}/auth/email/logout_OTP`

export const API_ADVERTISEMENT = `${API}/advertise`
export const API_CD_GAME = `${API}/cd_games`
export const API_GAME_CONSOLE = `${API}/game_consoles`
export const API_GIFT_CARD = `${API}/gift_card`
export const API_ACCESSORY = `${API}/accessory`

export const API_GIFT_CARD_DETAIL = `${API_CD_GAME}/detail/:id`
export const API_CD_GAME_DETAIL = `${API_CD_GAME}/detail/:id`
export const API_GAME_CONSOLE_DETAIL = `${API_GAME_CONSOLE}/detail/:id`
export const API_ACCESSORY_DETAIL = `${API_ACCESSORY}/detail/:id`

export const API_PAYMENT_CD_GAME = `${API}/payment_cdGame/store`

export const API_GET_VOUCHER = `${API}/voucher/get-voucher`
