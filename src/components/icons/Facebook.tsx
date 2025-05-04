import { IconsProps } from '@/types/types'

export default function FacebookIcon({
	width = '24',
	height = '24',
	fill = '#fcfcfc',
}: IconsProps) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill="none"
			stroke={fill}
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
		</svg>
	)
}
