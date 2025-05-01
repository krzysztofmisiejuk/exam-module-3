'use client'
import { useState } from 'react'
import clsx from 'clsx'
import { Button } from '@/components/atoms'
import { ProfileInfo, Transaction } from './'

interface ProfilePropsType {
	session: {
		user: {
			name: string
			email: string
			image?: string
			id: string
		}
	}
	orders: {}
}

export default function Profile({ session, orders }: ProfilePropsType) {
	console.log('ORDERS in profile', orders)

	const [showTransactions, setShowTransactions] = useState<boolean>(true)

	return (
		<section className='flex flex-col md:flex-row gap-12 py-10 text-neutral-900'>
			<ProfileInfo session={session} />
			<div className='flex flex-col flex-1 gap-8'>
				<Button
					variant='underline'
					className={clsx(
						'mx-auto md:mx-0',
						showTransactions && 'text-primary-500 border-b-2 border-primary-500'
					)}
					onClick={() => {
						setShowTransactions((prevState: boolean) => !prevState)
					}}
				>
					Transaction
				</Button>
				{showTransactions && <Transaction />}
			</div>
		</section>
	)
}
