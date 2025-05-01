import { Paragraph } from '@/components/atoms'
import BagIcon from '@/components/icons/BagIcon'

export default function Transaction() {
	return (
		<div className='flex gap-4 p-4 bg-base-dark border border-gray-200 rounded-md w-full'>
			<BagIcon />
			<div className='flex flex-col gap-4'>
				<Paragraph className='text-neutral-600'>
					Order date 2022-09-24 18:31
				</Paragraph>
				<div>
					<Paragraph weight='medium' size='lg'>
						Your order nr INV/208421205/TSR/3385-B54 - transaction number
					</Paragraph>
					<ul className='list-disc pl-5'>
						<li className='font-medium text-lg'>Model</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
