import { Breadcrumps, Checkout } from '@/components'
import { authOptions } from '@/lib/authOptions'
import { getAddressByUserId, getOrderLength } from '@/lib/db'
import { AddressType } from '@/types/types'
import { getServerSession } from 'next-auth'

export default async function CheckoutPage() {
	const session = await getServerSession(authOptions)
	const orderLength = await getOrderLength()
	const dataAdress = await getAddressByUserId(Number(session?.user.id))

	const address: AddressType = {
		street: dataAdress?.street ?? '',
		city: dataAdress?.city ?? '',
		postalCode: dataAdress?.zipCode ?? '',
		province: dataAdress?.province ?? '',
		country: dataAdress?.country ?? '',
	}

	return (
		<>
			<Breadcrumps />
			<Checkout
				address={address}
				orderLength={orderLength}
			/>
		</>
	)
}
