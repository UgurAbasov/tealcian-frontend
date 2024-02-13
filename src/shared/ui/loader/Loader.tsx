import { FC } from 'react'

import styles from './Loader.module.scss'

const Loader: FC = () => {
	return (
		<div className="center">
			<div className={styles['lds-ellipsis']}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Loader
