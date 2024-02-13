import { FC } from 'react'

import styles from './FormsContainer.module.scss'
import { formsData } from './forms.data'
import FormItem from './formItem/FormItem'

const FormsContainer: FC = () => {
	return (
		<div className={styles.forms}>
			{formsData.map((form) => (
				<FormItem
					key={form.text}
					{...form}
				/>
			))}
		</div>
	)
}

export default FormsContainer
