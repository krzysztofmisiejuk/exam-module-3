'use client'
import { useContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ProductContext } from '@/contexts'
import {
	Heading,
	CheckboxField,
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Input,
} from '@/components'

export default function Sidebar() {
	const products = useContext(ProductContext)
	const router = useRouter()
	const searchParams = useSearchParams()

	const allBrands = Array.from(
		new Set(products.map((product) => product.brandName))
	).sort()
	const allCategories = Array.from(
		new Set(products.map((product) => product.categoryName))
	).sort()

	const selectedBrands = searchParams.getAll('brand')
	const selectedCategories = searchParams.getAll('category')
	const minPrice = searchParams.get('minPrice') || ''
	const maxPrice = searchParams.get('maxPrice') || ''

	const updateFilters = (
		updatedBrands = selectedBrands,
		updatedCategories = selectedCategories,
		updatedMinPrice = minPrice,
		updatedMaxPrice = maxPrice
	) => {
		const params = new URLSearchParams()

		updatedBrands.forEach((brand) => params.append('brand', brand))
		updatedCategories.forEach((category) => params.append('category', category))
		if (updatedMinPrice) params.set('minPrice', updatedMinPrice)
		if (updatedMaxPrice) params.set('maxPrice', updatedMaxPrice)

		const currentOrder = searchParams.get('order') || 'lat'
		const currentPage = searchParams.get('page') || '1'
		const currentLimit = searchParams.get('limit') || '9'

		params.set('order', currentOrder)
		params.set('page', currentPage)
		params.set('limit', currentLimit)

		router.push(`/product?${params.toString()}`)
	}

	return (
		<div className='flex flex-col mx-auto gap-13 py-10 pr-10 min-w-[260px] max-w-[360px] w-1/4   border-gray-200 '>
			<Accordion
				type='multiple'
				className='flex flex-col gap-13'
			>
				<div>
					<AccordionItem value='brand'>
						<AccordionTrigger className='pt-2 pb-5'>
							<Heading
								Tag='h5'
								size='xs'
								weight='semibold'
							>
								Brand
							</Heading>
						</AccordionTrigger>
						<AccordionContent className='px-2'>
							{allBrands.map((brand) => (
								<CheckboxField
									key={brand}
									id={brand}
									checked={selectedBrands.includes(brand)}
									onChange={() => {
										const updatedBrand = selectedBrands.includes(brand)
											? selectedBrands.filter((b) => b !== brand)
											: [...selectedBrands, brand]
										updateFilters(updatedBrand, selectedCategories)
									}}
									labelText={brand}
								/>
							))}
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='category'>
						<AccordionTrigger className='pt-2 pb-5'>
							<Heading
								Tag='h5'
								size='xs'
								weight='semibold'
							>
								Category
							</Heading>
						</AccordionTrigger>
						<AccordionContent className='px-2'>
							{allCategories.map((cat) => (
								<CheckboxField
									key={cat}
									id={cat}
									checked={selectedCategories.includes(cat)}
									onChange={() => {
										const updatedCat = selectedCategories.includes(cat)
											? selectedCategories.filter((c) => c !== cat)
											: [...selectedCategories, cat]
										updateFilters(selectedBrands, updatedCat)
									}}
									labelText={cat}
								/>
							))}
						</AccordionContent>
					</AccordionItem>
				</div>

				<AccordionItem value='price'>
					<AccordionTrigger className='pt-2 pb-5'>
						<Heading
							Tag='h5'
							size='xs'
							weight='semibold'
						>
							Price
						</Heading>
					</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-5 pt-2 py-3'>
						<Input
							placeholder='min price'
							type='number'
							value={minPrice}
							onChange={(e) => {
								const value = e.target.value
								updateFilters(
									selectedBrands,
									selectedCategories,
									value,
									maxPrice
								)
							}}
						/>
						<Input
							placeholder='max price'
							type='number'
							value={maxPrice}
							onChange={(e) => {
								const value = e.target.value
								updateFilters(
									selectedBrands,
									selectedCategories,
									minPrice,
									value
								)
							}}
						/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}
