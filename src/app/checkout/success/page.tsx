import CheckoutSuccess from '@/components/subPages/CheckoutSuccess/CheckoutSuccess'
import { authOptions } from '@/lib/authOptions'
import { getOrdersByUserId } from '@/lib/db'
import { getServerSession } from 'next-auth'

export default async function CheckoutSuccessPage() {
	const session = await getServerSession(authOptions)
	const userId = session?.user.id
	const orders = await getOrdersByUserId(Number(userId))
	console.log('LAST ORDER', orders[0].items)
	const lastOrder = {} 

	return <CheckoutSuccess lastOrder={orders[0]} />
}

// LAST ORDER {
// 	id: 46,
// 	orderNumber: '01052025/014',
// 	userId: 1,
// 	createdAt: 2025-05-01T16:11:52.536Z, -- co to za typ?
// 	status: 'SUCCESS',
// 	totalAmount: 113.99,
// 	items: [
// 	  {
// 		id: 50,
// 		orderId: 46,
// 		productId: 23,
// 		quantity: 1,
// 		priceAtPurchase: 102.99,
// 		product: [Object]
// 	  }
// 	]
//   }

//  type OrdersType ={
// 	id: number
// 	orderNumber: string
// 	userId: 1
// 	createdAt: string
// 	status: string
// totalAmount: number
// items: OrderItems[]
//   }

// type OrderItems ={
// 	id: number
// 	orderId: number
// 	productId: number
// 	quantity: number
// 	priceAtPurchase: number
// 	product: Product
// }
// export interface Product {
// 	id: number
// 	name: string
// 	description: string
// 	price: number
// 	discount?: number | null
// 	stock: number
// 	imageUrl?: string | null
// 	categoryId: number
// 	brandId: number
// 	createdAt: string | Date
// 	updatedAt: string | Date
// 	categoryName: string
// 	brandName: string
// }

// to jest  orders[0].items [
// 	{
// 	  id: 52,
// 	  orderId: 48,
// 	  productId: 24,
// 	  quantity: 1,
// 	  priceAtPurchase: 103.99,
// 	  product: {
// 		id: 24,
// 		name: 'Webcam 4',
// 		description: 'Combining a sleek, modern look with cutting-edge functionality, this product is ideal for those who value both performance and presentation. Expect fast, fluid responsiveness paired with premium build quality.',
// 		price: 102.99,
// 		discount: null,
// 		stock: 50,
// 		imageUrl: 'https://i.ibb.co/wNrFxf18/camera-1219748-640.png',
// 		categoryId: 5,
// 		brandId: 4,
// 		categoryName: 'Webcam',
// 	  }
// 	}
//   ]
