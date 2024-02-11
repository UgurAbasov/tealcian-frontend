'use client'

import Notification from '@/components/ui/notification/Notification'
import { AuthService } from '@/services/auth.service'
import { APPLICATION_PAGES } from '@/shared/config/pages-url.config'
import { IAuthForm } from '@/shared/types/auth.type'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import styles from './Auth.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import FormsContainer from '@/components/ui/formsContainer/FormsContainer'

const Auth: FC = () => {
	const [isLoginForm, setIsLoginForm] = useState<boolean>(false)

	const { push } = useRouter()

	const { mutate, isSuccess } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) => AuthService.main(isLoginForm ? 'auth' : 'register', data),
		onSuccess() {
			push(APPLICATION_PAGES.HOME)
		},
	})

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
			{true && <Notification text="Успешная авторизация!" />}
		</div>
	)
}

export default Auth
