'use client'

import { FC, ReactNode } from 'react'

interface IMainProviderProps {
	children: ReactNode
}

const MainProvider: FC<IMainProviderProps> = ({ children }) => {
	return <>{children}</>
}

export default MainProvider
