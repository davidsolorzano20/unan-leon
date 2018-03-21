import { DEV, PROD } from './environment'

export const DEV_API = 'http://127.0.0.1:8000'
export const PROD_API = 'https://desktop-app-unan.herokuapp.com/'
export const VERSION_API = 'v1'
export const API_TEST = false
export let SERVER_URL

if (DEV === true) {
	SERVER_URL = DEV_API
}
else if (PROD === true) {
	SERVER_URL = PROD_API
}
