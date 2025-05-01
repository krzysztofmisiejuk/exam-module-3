import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
import { authOptions } from '@/lib/authOptions'
import { getAddresses, updateAddress } from '@/lib/db'

export async function GET() {
	try {
		const adresses = await getAddresses()
		if (!adresses) {
			return Response.json({ error: 'Adresses not found' }, { status: 404 })
		}
		return Response.json({ adresses }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}

export async function PUT(req: NextRequest) {
	const session = await getServerSession(authOptions)
	const userId = Number(session?.user.id)
	const newAdress = await req.json()

	try {
		if (!newAdress) {
			return Response.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			)
		}

		await updateAddress(userId, newAdress)
		revalidatePath('/checkout')
		return Response.json(
			{ newAdress, message: 'Address updated successfully' },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error:', error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
