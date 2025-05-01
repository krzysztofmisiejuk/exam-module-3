'use client'

import { useMemo, useState, useEffect } from 'react'
import { Accordion } from '@/components/ui/accordion'
import {
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/components/ui/accordion'
import CheckboxField from '@/components/atoms/CheckboxField'
import { Input } from '@/components/ui/input'
import { Product } from '@/types/types'

type FilterAccordionProps = {
	setBrand: React.Dispatch<React.SetStateAction<string[]>>
	setCategory: React.Dispatch<React.SetStateAction<string[]>>
	setMinPrice: React.Dispatch<React.SetStateAction<number | ''>>
	setMaxPrice: React.Dispatch<React.SetStateAction<number | ''>>
	allProducts: Product[]
	setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function FilterAccordion({
	setBrand,
	setCategory,
	setMinPrice,
	setMaxPrice,
	allProducts,
	setPage,
}: FilterAccordionProps) {
	const allBrands = useMemo(
		() =>
			['Rexus', 'AOC', 'Logitech', 'Rog', 'Razer', 'JBL'].filter((brand) =>
				allProducts.some((p) => p.brandName === brand)
			),
		[allProducts]
	)

	const allCategories = useMemo(
		() =>
			['Webcam', 'Keyboard', 'Headphone', 'Monitor', 'Mouse'].filter((cat) =>
				allProducts.some((p) => p.categoryName === cat)
			),
		[allProducts]
	)

	const [selectedBrands, setSelectedBrands] = useState<string[]>(['ALL'])
	const [selectedCategories, setSelectedCategories] = useState<string[]>([
		'ALL',
	])

	useEffect(() => {
		if (selectedBrands.includes('ALL')) {
			setSelectedBrands([])
		}
		if (selectedCategories.includes('ALL')) {
			setSelectedCategories([])
		}
	}, [selectedBrands, selectedCategories])

	useEffect(() => {
		setBrand(selectedBrands)
		setCategory(selectedCategories)
	}, [selectedBrands, selectedCategories, setBrand, setCategory])

	const handleBrandChange = (value: string) => {
		if (value === 'ALL') {
			setSelectedBrands(['ALL'])
		} else {
			setSelectedBrands((prev) =>
				prev.includes(value)
					? prev.filter((b) => b !== value)
					: [...prev.filter((b) => b !== 'ALL'), value]
			)
		}
		setPage(1)
	}

	const handleCategoryChange = (value: string) => {
		if (value === 'ALL') {
			setSelectedCategories(['ALL'])
		} else {
			setSelectedCategories((prev) =>
				prev.includes(value)
					? prev.filter((c) => c !== value)
					: [...prev.filter((c) => c !== 'ALL'), value]
			)
		}
		setPage(1)
	}

	const handleAllBrand = () => {
		setSelectedBrands(['ALL'])
		setPage(1)
	}

	const handleAllCategory = () => {
		setSelectedCategories(['ALL'])
		setPage(1)
	}

	return (
		<Accordion
			type='multiple'
			className='flex flex-col gap-13'
		>
			<div>
				{/* Category Accordion */}
				<AccordionItem value='category'>
					<AccordionTrigger className='pt-2 pb-5'>
						<h5 className='text-sm font-semibold'>Category</h5>
					</AccordionTrigger>
					<AccordionContent className='px-2'>
						<CheckboxField
							id='all-category'
							checked={
								selectedCategories.length === 0 ||
								selectedCategories.includes('ALL')
							}
							onChange={handleAllCategory}
							labelText='All'
						/>
						{allCategories.map((cat) => (
							<CheckboxField
								key={cat}
								id={cat}
								checked={selectedCategories.includes(cat)}
								onChange={() => handleCategoryChange(cat)}
								labelText={cat}
							/>
						))}
					</AccordionContent>
				</AccordionItem>

				{/* Brand Accordion */}
				<AccordionItem value='brand'>
					<AccordionTrigger className='pt-2 pb-5'>
						<h5 className='text-sm font-semibold'>Brand</h5>
					</AccordionTrigger>
					<AccordionContent className='px-2'>
						<CheckboxField
							id='all-brand'
							checked={
								selectedBrands.length === 0 || selectedBrands.includes('ALL')
							}
							onChange={handleAllBrand}
							labelText='All'
						/>
						{allBrands.map((brand) => (
							<CheckboxField
								key={brand}
								id={brand}
								checked={selectedBrands.includes(brand)}
								onChange={() => handleBrandChange(brand)}
								labelText={brand}
							/>
						))}
					</AccordionContent>
				</AccordionItem>

				{/* Price Accordion */}
				<AccordionItem value='price'>
					<AccordionTrigger className='pt-2 pb-5'>
						<h5 className='text-sm font-semibold'>Price</h5>
					</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-5 pt-2 py-3'>
						<Input
							placeholder='min price'
							type='number'
							onChange={(e) =>
								setMinPrice(e.target.value ? Number(e.target.value) : '')
							}
						/>
						<Input
							placeholder='max price'
							type='number'
							onChange={(e) =>
								setMaxPrice(e.target.value ? Number(e.target.value) : '')
							}
						/>
					</AccordionContent>
				</AccordionItem>
			</div>
		</Accordion>
	)
}
