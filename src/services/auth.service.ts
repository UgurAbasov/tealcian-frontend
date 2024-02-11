import { AuthTokenService } from './auth-token.service'
import { axiosClassic } from '@/shared/api/interceptors'
import { IAuthForm, IAuthResponse } from '@/shared/types/auth.type'

export const AuthService = {
	async main(type: 'auth' | 'register', data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(type, data)

		if (response.data.token) AuthTokenService.saveTokenStorage(response.data.token)

		return response
	},

	async getNewToken() {
		const response = await axiosClassic.post<IAuthResponse>('/auth/login/access-token')

		if (response.data.token) AuthTokenService.saveTokenStorage(response.data.token)

		return response
	},

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		if (response.data) AuthTokenService.removeFromStorage()

		return response
	},
}
