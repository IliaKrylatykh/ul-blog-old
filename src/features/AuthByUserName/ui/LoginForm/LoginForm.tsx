import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch'
import { classNames } from 'shared/lib/classNames/classNames'
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import cls from './LoginForm.module.scss'

export interface LoginFormProps {
	className?: string
	onSuccess: () => void
}

const initialReducers: ReducersList = {
	loginForm: loginReducer,
}

const LoginForm: FC<LoginFormProps> = memo(({ className, onSuccess }) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const username = useSelector(getLoginUsername)
	const password = useSelector(getLoginPassword)
	const isLoading = useSelector(getLoginIsLoading)
	const error = useSelector(getLoginError)

	const onChangeUsername = useCallback(
		(value: string) => {
			dispatch(loginActions.setUsername(value))
		},
		[dispatch]
	)

	const onChangePassword = useCallback(
		(value: string) => {
			dispatch(loginActions.setPassword(value))
		},
		[dispatch]
	)

	const onLoginClick = useCallback(async () => {
		const result = await dispatch(loginByUsername({ username, password }))
		if (result.meta.requestStatus === 'fulfilled') {
			onSuccess()
		}
	}, [onSuccess, username, password, dispatch])

	return (
		<DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
			<div className={classNames(cls.LoginForm, {}, [className])}>
				<Text title={t('Auth form')} theme={TextTheme.NORMAL} />
				{error && (
					<Text
						text={t('Incorrect login or password')}
						theme={TextTheme.ERROR}
					/>
				)}
				<Input
					type='text'
					className={cls.input}
					placeholder={t('Username')}
					autoFocus
					onChange={onChangeUsername}
					value={username}
				/>
				<Input
					type='text'
					className={cls.input}
					placeholder={t('Password')}
					onChange={onChangePassword}
					value={password}
				/>
				<Button
					theme={ButtonTheme.OUTLINE}
					className={cls.loginBtn}
					onClick={onLoginClick}
					disabled={isLoading}
				>
					{t('Log in')}
				</Button>
			</div>
		</DynamicModuleLoader>
	)
})

export default LoginForm
