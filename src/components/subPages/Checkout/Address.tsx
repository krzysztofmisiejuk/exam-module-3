'use client'
import clsx from 'clsx'
import { useState } from 'react'
import { Button, Heading, Paragraph } from '@/components/atoms'
import NewAddress from './NewAddress'
import ExistingAddress from './ExistingAddress'
import { AddressType } from '@/types/types'

export default function Address({address}: {address: AddressType}) {
	const [showNewAdress, setShowNewAdress] = useState<boolean>(false)

	return (
		<div className='flex flex-col gap-4'>
			<Heading
				Tag='h6'
				size='sm'
				weight='medium'
			>
				Address
			</Heading>
			<div className='flex flex-col gap-8 p-6 bg-base-dark border border-gray-200 rounded-md flex-1'>
				<div className='flex w-full'>
					<Button
						variant='underline'
						className={clsx(
							!showNewAdress && 'text-primary-500 border-b-2 border-primary-500'
						)}
						onClick={() => {
							setShowNewAdress(false)
						}}
					>
						<Paragraph size='lg'>Existing Address</Paragraph>
					</Button>
					<Button
						variant='underline'
						className={clsx(
							showNewAdress && 'text-primary-500 border-b-2 border-primary-500'
						)}
						onClick={() => {
							setShowNewAdress(true)
						}}
					>
						<Paragraph size='lg'>New Address</Paragraph>
					</Button>
				</div>
				{showNewAdress ? <NewAddress /> : <ExistingAddress address={address}/>}
			</div>
		</div>
	)
}
