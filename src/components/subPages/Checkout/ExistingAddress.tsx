import { Paragraph } from '@/components/atoms'
import { Badge } from '@/components/ui/badge'
import { capitalize } from '@/lib/utils'
import { AddressType } from '@/types/types'

export default function ExistingAddress({ address }: { address: AddressType }) {
	return (
		<div className='flex flex-col gap-10'>
			<div className='flex flex-col gap-3'>
				<div className='flex items-center gap-4'>
					<Paragraph className='text-neutral-600'>Address</Paragraph>
					<Badge>Main Address</Badge>
				</div>
				<Paragraph size='lg'>{capitalize(address?.street)}</Paragraph>
			</div>
			<div className='flex gap-y-4 justify-between flex-wrap'>
				<div className='flex flex-col gap-2'>
					<Paragraph>Country</Paragraph>
					<Paragraph size='lg'>{capitalize(address?.country)}</Paragraph>
				</div>
				<div className='flex flex-col gap-2'>
					<Paragraph>Province</Paragraph>
					<Paragraph size='lg'>{capitalize(address?.province)}</Paragraph>
				</div>
				<div className='flex flex-col gap-2'>
					<Paragraph>City</Paragraph>
					<Paragraph size='lg'>{capitalize(address?.city)}</Paragraph>
				</div>
				<div className='flex flex-col gap-2'>
					<Paragraph>Postal Code</Paragraph>
					<Paragraph size='lg'>{address?.postalCode}</Paragraph>
				</div>
			</div>
		</div>
	)
}
