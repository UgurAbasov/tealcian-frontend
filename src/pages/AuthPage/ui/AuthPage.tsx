'use client'

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import FormsContainer from '@/widgets/formsContainer/FormsContainer'

import Notification from '@/shared/ui/notification/Notification'

import styles from './AuthPage.module.scss'

const Auth: FC = () => {
	const [isLoginForm, setIsLoginForm] = useState<boolean>(false)

	const { push } = useRouter()

	return (
		<div className={styles.auth}>
			<div className={styles.info}>
				<Image
					src="/logo.png"
					width={150}
					height={35}
					priority
					alt="logo"
				/>
				<div className={styles['info-content']}>
					<h2>Create an account</h2>
					<FormsContainer />
					<p className={styles.pick}>or</p>
					<p className={styles['info-content-auth']}>
						Already have a account? <Link href="/">Login</Link>
					</p>

					<p className={styles['info-content-text']}>
						By continuing, you agree to <span>privacy policy</span> and <span>terms of use.</span>
					</p>
				</div>
			</div>
			<div className={styles['background-image']}>
				<Image
					width={615}
					height={800}
					src="/auth.jpg"
					alt="bgImage"
				/>
			</div>
			{true && <Notification text="Authorization successful!" />}
		</div>
	)
}

export default Auth
