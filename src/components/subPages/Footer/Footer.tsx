import { MainHeading } from '@/components/shared'
import { PaymentsList, FooterList } from './index'
import { Paragraph } from '@/components/atoms'

export default function Footer() {
	return (
		<footer className='flex flex-col mb-0 md:flex-row py-36 px-16 bg-gray-50 text-neutral-600 '>
			<div className='flex flex-col gap-6 md:w-2/5 md:min-w-xs'>
				<MainHeading
					tag='h2'
					size='xl'
					weight='semibold'
				/>
				<Paragraph className='max-w-52'>
					© {new Date().getFullYear()} DevstockHub. All rights reserved.
				</Paragraph>
				<PaymentsList />
			</div>
			<FooterList />
		</footer>
	)
}
