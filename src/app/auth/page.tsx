import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '../../shared/constants/seo.constants'
import Auth from '../../pages/AuthPage/ui/AuthPage'

export const metadata: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE,
}

export default function AuthPage() {
	return <Auth />
}
