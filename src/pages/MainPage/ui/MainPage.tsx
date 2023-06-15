import { BugButton } from 'app/providers/ErrorBoundary'
import { Counter } from 'entities/Counter'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const MainPage: FC = () => {
	const { t } = useTranslation('main')

	return (
		<div>
			<BugButton />

			<p>{t('MainPage')}</p>

			<Counter />
		</div>
	)
}

export default MainPage
