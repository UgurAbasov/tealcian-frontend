type FetchConfig = Omit<RequestInit, 'body'> & { body?: any }

class FetchWrapper {
	constructor(private baseURL: string) {}

	async get<T = any>(url: string, config?: FetchConfig): Promise<T> {
		const response = await fetch(this.baseURL + url, {
			method: 'GET',
			...config,
		})
		return this.handleResponse<T>(response)
	}

	async post<T = any>(url: string, data?: any, config?: FetchConfig): Promise<T> {
		const response = await fetch(this.baseURL + url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
			...config,
		})
		return this.handleResponse<T>(response)
	}

	async put<T = any>(url: string, data?: any, config?: FetchConfig): Promise<T> {
		const response = await fetch(this.baseURL + url, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
			...config,
		})
		return this.handleResponse<T>(response)
	}

	async delete<T = any>(url: string, config?: FetchConfig): Promise<T> {
		const response = await fetch(this.baseURL + url, {
			method: 'DELETE',
			...config,
		})
		return this.handleResponse<T>(response)
	}

	private async handleResponse<T>(response: Response): Promise<T> {
		const data = await response.json()
		if (response.ok) {
			return data
		} else {
			throw new Error(data.message || 'Something went wrong')
		}
	}
}

const api = new FetchWrapper('https://api.example.com')

const $fetch = {
	get: <T = any>(url: string, config?: FetchConfig): Promise<T> => api.get<T>(url, config),
	post: <T = any>(url: string, data?: any, config?: FetchConfig): Promise<T> => api.post<T>(url, data, config),
	put: <T = any>(url: string, data?: any, config?: FetchConfig): Promise<T> => api.put<T>(url, data, config),
	delete: <T = any>(url: string, config?: FetchConfig): Promise<T> => api.delete<T>(url, config),
}

export default $fetch
