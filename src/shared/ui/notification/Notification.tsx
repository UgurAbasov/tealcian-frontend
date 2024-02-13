import { FC } from 'react'

import styles from './Notification.module.scss'

import { classNames } from '@/shared/lib/classNames/classNames'

export const enum NotificationType {
	SUCCESS = 'success',
	ERROR = 'error',
	WARNING = 'warning',
}

interface INotificationProps {
	type?: NotificationType
	text: string
}

const Notification: FC<INotificationProps> = ({ type = NotificationType.SUCCESS, text }) => {
	return <div className={classNames(styles.alert, {}, [styles[type]])}>{text}</div>
}

export default Notification

