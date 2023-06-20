import { FC, Suspense } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Loader } from 'shared/ui/Loader/Loader'
import { Modal } from 'shared/ui/Modal/Modal'
import { LoginFormAsync } from '../LoginForm/LoginForm.async'

interface LoginModalProps {
	className?: string
	isOpen: boolean
	onClose: () => void
}

export const LoginModal: FC<LoginModalProps> = ({
	className,
	isOpen,
	onClose,
}) => {
	return (
		<Modal
			className={classNames('', {}, [className])}
			isOpen={isOpen}
			onClose={onClose}
			lazy
		>
			<Suspense fallback={<Loader />}>
				<LoginFormAsync />
			</Suspense>
		</Modal>
	)
}