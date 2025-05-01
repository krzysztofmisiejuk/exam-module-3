import { HeadingTag, Size, Weight } from '@/types/types'
import { Heading } from '../atoms'


export default function MainHeading({
	tag,
	size = 'md',
	weight = 'regular',
}: {
	tag: HeadingTag
	size?: Size
	weight?: Weight
}) {
	return (
		<Heading
			Tag={tag}
			size={size}
			weight={weight}
			className='text-neutral-900'
		>
			<span className='text-primary-400'>Devstock</span>Hub
		</Heading>
	)
}
