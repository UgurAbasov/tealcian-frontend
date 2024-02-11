'use client'

import QueryProvider from './QueryProvider'
import { FC, ReactNode } from 'react'

interface IMainProviderProps {
	children: ReactNode
}

const MainProvider: FC<IMainProviderProps> = ({ children }) => {
	return <QueryProvider>{children}</QueryProvider>
}

export default MainProvider
