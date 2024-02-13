'use client'

import { FC } from 'react'

import styles from './NotFoundPage.module.scss'
import { useRouter } from 'next/navigation'

const NotFoundPage: FC = () => {
	const { push } = useRouter()

	return (
		<div className={styles['not-found']}>
			<span>404 | Not Found Page</span>
			<button onClick={() => push('/')}>Home page</button>
		</div>
	)
}

export default NotFoundPage
