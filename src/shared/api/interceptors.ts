import axios, { CreateAxiosDefaults } from 'axios'

import { AuthTokenService } from '@/services/auth-token.service'
import { errorCatch } from '@/shared/api/error'
import { AuthService } from '@/services/auth.service'

export const ENDPOINT = process.env.API_URL

const options: CreateAxiosDefaults = {
	baseURL: ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
	},
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use((config) => {
	const accessToken = AuthTokenService.getAccessToken()

	if (config?.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

axiosWithAuth.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originRequest = error.config

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originRequest._isRetry = true
			try {
				await AuthService.getNewToken()
				return axiosWithAuth.request(originRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') AuthTokenService.removeFromStorage()
			}
		}
		throw error
	},
)

export { axiosClassic, axiosWithAuth }
