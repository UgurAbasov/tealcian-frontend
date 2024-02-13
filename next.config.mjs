/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	optimizeFonts: false,
	env: {
		APP_URL: process.env.NEXT_APP_URL,
		API_URL: process.env.NEXT_API_URL,
	},
}

export default nextConfig
