import { AddressType, ProductInCart, User } from '@/types/types'
import { PrismaClient } from '@prisma/client'
// import { generateOrderId } from './utils'

// Define a global type to store the PrismaClient instance
// This prevents multiple instances during hot reloading in development
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Export a singleton instance of PrismaClient
// Either use the existing instance from the global object or create a new one
export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: ['query'], // Enable logging of database queries for debugging
	})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getUsers() {
	return await prisma.user.findMany()
}
export async function getProducts() {
	return await prisma.product.findMany()
}
export async function getCategories() {
	return await prisma.category.findMany()
}
export async function getBrands() {
	return await prisma.brand.findMany()
}
export async function getOrders() {
	return await prisma.order.findMany()
}

export async function createUser(user: User) {
	return await prisma.user.create({
		data: {
			firstName: user.name,
			email: user.email,
			passwordHash: user.password,
			mobileNumber: user.mobileNumber,
		},
	})
}

export async function getUserById(userId: number) {
	return await prisma.user.findFirst({
		where: { id: userId },
	})
}
export async function getProductById(productId: number) {
	return await prisma.product.findFirst({
		where: { id: productId },
	})
}
export async function getCategoryById(categoryId: number) {
	return await prisma.category.findFirst({
		where: { id: categoryId },
	})
}
export async function getBrandById(brandId: number) {
	return await prisma.brand.findFirst({
		where: { id: brandId },
	})
}

export async function getUserByEmail(email: string) {
	return await prisma.user.findFirst({
		where: { email },
	})
}

export async function getUserByUsername(username: string) {
	return await prisma.user.findFirst({
		where: { firstName: username },
	})
}

export async function getProductsByCategory(categoryName: string) {
	return await prisma.product.findMany({
		where: {
			categoryName: {
				equals: categoryName,
				mode: 'insensitive',
			},
		},
	})
}

export async function getProductsByBrand(brandName: string) {
	return await prisma.product.findMany({
		where: {
			brandName: {
				equals: brandName,
				mode: 'insensitive',
			},
		},
	})
}

export async function getProductsWithMinPrice(minPrice: number) {
	return await prisma.product.findMany({
		where: {
			price: {
				gte: minPrice,
			},
		},
	})
}

export async function getProductsWithMaxPrice(maxPrice: number) {
	return await prisma.product.findMany({
		where: {
			price: {
				lte: maxPrice,
			},
		},
	})
}

export async function getAddresses() {
	return await prisma.address.findMany()
}

export async function getAddressByUserId(userId: number) {
	return await prisma.address.findUnique({
		where: { userId },
	})
}

export async function createAddress(userId: number, addressData: AddressType) {
	return await prisma.address.create({
		data: {
			street: addressData.street,
			city: addressData.city,
			zipCode: addressData.postalCode,
			country: addressData.country,
			province: addressData.province,
			userId: userId,
		},
	})
}

export async function updateAddress(userId: number, addressData: AddressType) {
	return await prisma.address.update({
		where: { userId },
		data: {
			street: addressData.street,
			city: addressData.city,
			zipCode: addressData.postalCode,
			country: addressData.country,
			province: addressData.province,
		},
	})
}

// export async function createOrder(userId: number, items: ProductInCart[]) {
// 	const address = await prisma.address.findUnique({
// 		where: { userId },
// 	})
// 	if (!address) {
// 		throw new Error('No address found for user')
// 	}

// 	const productTotal = items.reduce((acc, item) => {
// 		return acc + item.price * item.quantity
// 	}, 0)

// 	const protectionTotal = items.reduce((acc, item) => {
// 		return acc + (item.hasProtection ? 1 : 0)
// 	}, 0)

// 	const deliveryFee = 5
// 	const insuranceFee = 6
// 	const totalAmount =
// 		productTotal + protectionTotal + deliveryFee + insuranceFee

// 	const orderNumber = await generateOrderId()
// 	return prisma.order.create({
// 		data: {
// 			orderNumber,
// 			userId,
// 			status: 'SUCCESS',
// 			totalAmount,
// 			createdAt: new Date(),
// 			items: {
// 				create: items.map((item) => ({
// 					productId: item.id,
// 					quantity: item.quantity,
// 					priceAtPurchase: item.price + (item.hasProtection ? 1 : 0),
// 				})),
// 			},
// 		},
// 		include: {
// 			items: true,
// 		},
// 	})
// }

export async function createOrder(
	userId: number,
	items: ProductInCart[],
	orderNumber: string
) {
	const address = await prisma.address.findUnique({
		where: { userId },
	})
	if (!address) {
		throw new Error('No address found for user')
	}

	const productTotal = items.reduce((acc, item) => {
		return acc + item.price * item.quantity
	}, 0)

	const protectionTotal = items.reduce((acc, item) => {
		return acc + (item.hasProtection ? 1 : 0)
	}, 0)

	const deliveryFee = 5
	const insuranceFee = 6
	const totalAmount =
		productTotal + protectionTotal + deliveryFee + insuranceFee

	return prisma.order.create({
		data: {
			orderNumber, // Użyj przekazanego orderNumber
			userId,
			status: 'SUCCESS',
			totalAmount,
			createdAt: new Date(),
			items: {
				create: items.map((item) => ({
					productId: item.id,
					quantity: item.quantity,
					priceAtPurchase: item.price + (item.hasProtection ? 1 : 0),
				})),
			},
		},
		include: {
			items: true,
		},
	})
}

export async function getOrderLength() {
	return await prisma.order.count()
}

export function getOrderById(id: number) {
	return prisma.order.findFirst({
		where: { id },
	})
}

export async function getOrdersByUserId(userId: number) {
	return prisma.order.findMany({
		where: { userId },
		include: {
			items: {
				include: {
					product: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	})
}
