import { IFormsData } from '@/components/ui/formsContainer/forms.data'
import Image from 'next/image'
import { FC } from 'react'

import styles from './FormItem.module.scss'
import Link from 'next/link'

const FormItem: FC<IFormsData> = ({ img, text }) => {
	return (
		<Link
			href={'/'}
			className={styles['form-item']}
		>
			<Image
				width={24}
				height={24}
				src={img}
				alt="formImage"
			/>
			<span>{text}</span>
		</Link>
	)
}

export default FormItem
