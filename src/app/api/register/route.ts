import bcrypt from 'bcrypt'
import { createUser, getUsers } from '@/lib/db'
import { User } from '@/types/types'

export async function POST(req: Request) {
	try {
		const users = await getUsers()
		const newUser: { data: User } = await req.json()

		const isUserExist = users.find((user) => user.email === newUser.data.email)
		if (!newUser.data.password || !newUser.data.email) {
			return new Response(
				JSON.stringify({ error: 'Email and password are required' }),
				{ status: 400 }
			)
		}

		if (isUserExist) {
			return new Response(
				JSON.stringify({
					error: 'An account with this e-mail address already exists',
				}),
				{ status: 409 }
			)
		}

		const hashedPassword = await bcrypt.hash(newUser.data.password, 10)

		await createUser({
			name: newUser.data.name,
			email: newUser.data.email,
			mobileNumber: newUser.data.mobileNumber,
			password: hashedPassword,
		})

		return new Response(
			JSON.stringify({ message: `The registration was successful` }),
			{ status: 201 }
		)
	} catch (error) {
		console.error('Error register: ', error)
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
		})
	}
}
