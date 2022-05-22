import axios from 'axios'
import qs from 'qs'

const getToken = () => {
  return localStorage.getItem('@token') ? localStorage.getItem('@token') : ''
}

axios.defaults.headers.common['Cache-Control'] = 'no-cache'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['Cache-Control'] = 'max-age=0'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

// eslint-disable-next-line require-jsdoc
export function getAxios(url: string, params: any, configs = {}) {
  axios.defaults.headers.common['AUTHORIZATION'] = `Bearer ${getToken()}`

  return new Promise((resolve, reject) => {
    axios
      .get(
        url,
        {
          params,
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
          },
          ...configs,
        },
        // configRequest
      )
      .then((response) => {
        if (response.data.code === 401 || (response.status !== 200 && response.data.code === 403)) {
          localStorage.removeItem('@user')
          localStorage.removeItem('@token')
        }
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// eslint-disable-next-line require-jsdoc
export function postAxios(url: string, body: any, config = {}, isAuth = true) {
  axios.defaults.headers.common['AUTHORIZATION'] = `Bearer ${getToken()}`

  if (!isAuth) {
    axios.defaults.headers.common['AUTHORIZATION'] = ''
    axios.defaults.headers.common['CLIENTAPIKEY'] = ''
  }

  return new Promise((resolve, reject) => {
    axios
      .post(url, body, config)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// eslint-disable-next-line require-jsdoc
export function deleteAxios(url: string, config = {}) {
  axios.defaults.headers.common['AUTHORIZATION'] = `Bearer ${getToken()}`

  return new Promise((resolve, reject) => {
    axios
      .delete(url, config)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// eslint-disable-next-line require-jsdoc
export function putAxios(url: string, body: any, config = {}) {
  axios.defaults.headers.common['AUTHORIZATION'] = `Bearer ${getToken()}`

  return new Promise((resolve, reject) => {
    axios
      .put(url, body, config)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
