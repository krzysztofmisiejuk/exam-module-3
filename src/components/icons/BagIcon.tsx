import { IconsProps } from '@/types/types'

export default function BagIcon({
	width = '26',
	height = '26',
	fill = '#F29145',
}: IconsProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 26 26'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M8.66927 11.9167V7.58333C8.66927 5.1901 10.6094 3.25 13.0026 3.25C15.3958 3.25 17.3359 5.1901 17.3359 7.58333V11.9167M8.66927 8.66667H17.3359C20.5859 8.66667 21.6693 12.8808 21.6693 14.625C21.6693 21.1531 19.9322 22.2083 13.0026 22.2083C6.07294 22.2083 4.33594 21.1531 4.33594 14.625C4.33594 12.8808 5.41927 8.66667 8.66927 8.66667Z'
				stroke={fill}
				strokeWidth='1.625'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
