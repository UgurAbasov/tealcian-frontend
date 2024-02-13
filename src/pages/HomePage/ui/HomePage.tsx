'use client'

import { FC, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import styles from './HomePage.module.scss'

const HomePage: FC = () => {
	const { push } = useRouter()

	useEffect(() => {
		push('/auth')
	})

	return <main>HomePage</main>
}

export default HomePage
