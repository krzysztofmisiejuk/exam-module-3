import { getUserByEmail, getUserByUsername } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const data = await req.json()

		const emailMatches = await getUserByEmail(data.identifier)
		const usernameMatches = await getUserByUsername(data.identifier)

		if (emailMatches || usernameMatches) {
			return NextResponse.json({ message: 'User exists!' }, { status: 200 })
		} else {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}
	} catch (error) {
		console.error('Error checking user: ', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
