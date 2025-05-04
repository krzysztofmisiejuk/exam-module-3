import { Heading } from '@/components'

export type HeadingTag =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'div'
	| 'span'
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'
export type Weight = 'regular' | 'medium' | 'semibold' | 'bold'

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
