import { ThemeSwitcher } from 'features/ThemeSwitcher'
import { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './Navbar.module.scss'

interface NavbarProps {
	className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
	return (
		<div className={classNames(cls.Navbar, {}, [className])}>
			<ThemeSwitcher />
			<div className={cls.links}>
				<AppLink theme={AppLinkTheme.SECONDARY} className={cls.link} to={'/'}>
					Главная
				</AppLink>
				<AppLink
					theme={AppLinkTheme.SECONDARY}
					className={cls.link}
					to={'/about'}
				>
					О сайте
				</AppLink>
			</div>
		</div>
	)
}