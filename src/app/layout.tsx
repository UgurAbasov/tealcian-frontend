import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import { SITE_NAME } from '@/shared/constants/seo.constants'
import MainProvider from '@/$app/providers/MainProvider'

import '@/$app/styles/index.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `${SITE_NAME} | %s`,
	},
	description: `${SITE_NAME} - the best social network for programmers and developers`,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
