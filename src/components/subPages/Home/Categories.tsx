import Link from 'next/link'
import Heading from '../../atoms/Heading'
import TileCard from '../../shared/Cards/TileCard'
import { CategoriesProps } from '@/types/types'


export default async function Categories({
	categories,
}: {
	categories: CategoriesProps[]
}) {
	return (
		<div className='flex flex-col gap-8'>
			<Heading
				size='md'
				weight='medium'
				Tag='h4'
				className='text-neutral-900'
			>
				Category
			</Heading>
			<div className='flex justify-center md:justify-between flex-wrap gap-2'>
				{categories.map((category) => {
					return (
						<Link
							key={category.name}
							href={`/product?category=${category.name}&page=1&limit=9`}
							prefetch={false}
						>
							<TileCard item={category} />
						</Link>
					)
				})}
			</div>
		</div>
	)
}
