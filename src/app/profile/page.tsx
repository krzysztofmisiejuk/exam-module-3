import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Breadcrumps, Profile } from '@/components'
import { authOptions } from '@/lib/authOptions'
import { getOrdersByUserId } from '@/lib/db'

export default async function ProfilePage() {
	const session = await getServerSession(authOptions)
	const userId = session?.user.id
	const orders = await getOrdersByUserId(Number(userId))

	if (!session) redirect('/login')
	return (
		<>
			<Breadcrumps />
			<Profile session={session}  orders={orders}/>
		</>
	)
}
