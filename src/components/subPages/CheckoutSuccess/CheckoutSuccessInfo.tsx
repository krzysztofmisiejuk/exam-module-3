import { Paragraph } from '@/components/atoms'

export default function CheckoutSuccessInfo({
	first,
	second,
}: {
	first: string
	second: string
}) {
	return (
		<div className='flex flex-col gap-4 border-b border-gray-200 pb-4'>
			<Paragraph size='lg'>{first}</Paragraph>
			<Paragraph className='text-neutral-600'>{second}</Paragraph>
		</div>
	)
}
