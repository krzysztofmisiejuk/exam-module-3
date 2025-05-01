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

export interface JWT {
	id: string
	email: string
	name: string
	image: string
}

export interface Session {
	user: {
		id: string
		email: string
		name: string
		image: string
	}
}

export interface IconsProps {
	width?: string
	height?: string
	fill?: string
	className?: string
}

export interface User {
	id?: number
	name: string
	email: string
	password: string
	mobileNumber: number
	image?: string
	address?: string
}

export type Category = {
	id: number
	name: string
	description?: string | null
	image?: string | null
	imgCarousel?: string | null
	exploreInfo?: string | null
}

export interface BrandsProps {
	id: number
	name: string
	image: string | null
}

export interface Product {
	id: number
	name: string
	description: string
	price: number
	discount?: number | null
	stock: number
	imageUrl?: string | null
	categoryId: number
	brandId: number
	createdAt: string | Date
	updatedAt: string | Date
	categoryName: string
	brandName: string
}

export interface ProductInCart extends Product {
	quantity: number
	hasProtection: boolean
	isSelected: boolean
	color: 'default' | 'white' | 'black'
}

export type CheckboxFieldProps = {
	id: string
	defaultChecked?: boolean
	checked?: boolean
	onChange: (checked: boolean) => void
	labelText: React.ReactNode | string
}

export interface CategoriesProps {
	id: number
	name: string
	description: string | null
	image: string | null
	imgCarousel: string | null
	exploreInfo: string | null
}

export interface AddressType {
	street: string
	city: string
	postalCode: string
	province: string
	country: string
	isMainAddress?: boolean
}


export interface OrderProduct {
	id: number
	name: string
	price: number
	quantity: number
	imageUrl: string | null
	hasProtection: boolean
	isSelected: boolean
	color: 'default' | 'white' | 'black'
}

export interface OrderType {
	id: number
	orderNumber: string
	userId: number
	createdAt: string
	status: string
	totalAmount: number
	products: OrderProduct[]
}
