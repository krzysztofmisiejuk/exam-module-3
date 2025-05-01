import { Breadcrumps, ProductDetailCard } from '@/components'
import { getEstimatedArrival } from '@/lib/utils'
import { Product } from '@/types/types'

interface ProductDetailParamProps {
	params: Promise<{ id: string }>
}

const randomDate: string = getEstimatedArrival()

export default async function ProductDetails({
	params,
}: ProductDetailParamProps) {
	const { id } = await params
	const response = await fetch(`http://localhost:3000/api/product/${id}`)
	const product: Product = await response.json()

	return (
		<section className='flex flex-col'>
			<Breadcrumps />
			<ProductDetailCard
				product={product}
				randomDate={randomDate}
			/>
		</section>
	)
}
