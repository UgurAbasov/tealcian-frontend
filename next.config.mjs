/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	optimizeFonts: false,
	env: {
		API_URL: process.env.NEXT_API_URL,
	},
}

export default nextConfig
