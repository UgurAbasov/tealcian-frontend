import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import { SITE_NAME } from '@/shared/constants/seo.constants'
import MainProvider from '@/$app/providers/MainProvider'

import '@/$app/styles/index.scss'
import { onlyText } from '@/shared/utils/onlyText'
import { currentDescription } from '@/shared/config/currentDescription'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `${SITE_NAME} | %s`,
	},
	description: `${SITE_NAME} - the best social network for programmers and developers`,
	openGraph: {
		title: `${SITE_NAME} | %s`,
		locale: 'en',
		siteName: SITE_NAME,
		description: onlyText(
			currentDescription(`${SITE_NAME} - the best social network for programmers and developers`),
			197,
		),
	},
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
