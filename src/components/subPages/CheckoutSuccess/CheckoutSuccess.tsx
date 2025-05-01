'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	CheckCircle,
	CheckoutSuccessInfo,
	Heading,
	OrderedProduct,
	Paragraph,
	PriceSummary,
} from '@/components'
import { clearCart } from '@/lib/cartUtils'
import { ProductInCart } from '@/types/types'

interface OrderData {
	orderNumber: string
	products: ProductInCart[]
	createdAt: string
}

type OrdersType = {
	id: number
	orderNumber: string
	userId: number
	createdAt: Date
	status: string
	totalAmount: number
	items: OrderItems[]
}

type OrderItems = {
	id: number
	orderId: number
	productId: number
	quantity: number
	priceAtPurchase: number
	product: ProductInCart
}

export default function CheckoutSuccess({
	lastOrder,
}: {
	lastOrder: OrdersType
}) {
	const [orderData, setOrderData] = useState<OrderData | null>(null)
	const router = useRouter()

	console.log('LASTORDER checkout success:', lastOrder)
	useEffect(() => {
		const lastOrder = localStorage.getItem('lastOrder')
		if (lastOrder) {
			const parsedOrder: OrderData = JSON.parse(lastOrder)
			setOrderData(parsedOrder)
		}
	}, [])

	useEffect(() => {
		const timeout = setTimeout(() => {
			handleClearCart()
		}, 3000)

		return () => clearTimeout(timeout)
	}, [])

	function handleClearCart() {
		clearCart()
		localStorage.removeItem('lastOrder')
		router.push('/')
	}

	if (!orderData) {
		return <Paragraph>Loading order details...</Paragraph>
	}

	return (
		<section className='flex items-center justify-center pt-10 pb-20 xl:px-10 text-neutral-900'>
			<div className='flex flex-col items-center gap-6 p-6 border border-gray-200 bg-base-dark rounded-md max-w-[640px] w-full'>
				<div className='flex flex-col gap-6 items-center'>
					<CheckCircle
						width='80'
						height='80'
					/>
					<Heading
						Tag='h5'
						weight='medium'
						size='md'
					>
						Thanks for Your Order!
					</Heading>
				</div>
				<Paragraph className='neutral-600'>
					Order number: {lastOrder.orderNumber}
				</Paragraph>
				<div className='flex flex-col gap-4 w-full'>
					<CheckoutSuccessInfo
						first='Transaction Date'
						second={new Date(lastOrder.createdAt).toLocaleDateString()}
					/>
					<CheckoutSuccessInfo
						first='Payment method'
						second='ApplePay'
					/>
					<CheckoutSuccessInfo
						first='Shipping method'
						second='DevstockHub Courier'
					/>
				</div>
				<div className='flex flex-col gap-4 w-full'>
					<Paragraph size='lg'>Your Order</Paragraph>
					{orderData.products.length === 0 ? (
						<Paragraph>No products in order</Paragraph>
					) : (
						lastOrder.items.map((item) => (
							<OrderedProduct
								key={item.id}
								product={item}
							/>
						))
					)}
					<div>
						<PriceSummary
							productList={orderData.products}
							checkout={true}
							success={true}
							onClickHandle={handleClearCart}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
