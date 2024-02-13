import Cookies from 'js-cookie'

export const enum EnumTokens {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken',
}

export const AuthTokenService = {
	getAccessToken() {
		const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)

		return accessToken || null
	},

	saveTokenStorage(accessToken: string) {
		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken)
	},

	removeFromStorage() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN)
	},
}
