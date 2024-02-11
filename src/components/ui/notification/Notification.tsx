import { FC } from 'react'

import styles from './Notification.module.scss'

export const enum NotificationType {
	SUCCESS = 'success',
	ERROR = 'error',
	WARNING = 'warning',
}

interface INotificationProps {
	type?: NotificationType
	text: string
}

const Notification: FC<INotificationProps> = ({ type = NotificationType.WARNING, text }) => {
	return <div className={`${styles.alert} ${styles[type]}`}>{text}</div>
}

export default Notification
