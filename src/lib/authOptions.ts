// lib/authOptions.ts

import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmail, getUserByUsername } from '@/lib/db'
import { compare } from 'bcrypt'

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email lub Username', type: 'text' },
				password: { label: 'Hasło', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials) return null

				const { email, password } = credentials as {
					email: string
					password: string
				}

				const userByEmail = await getUserByEmail(email)
				const userByUsername = userByEmail
					? null
					: await getUserByUsername(email)
				const user = userByEmail || userByUsername

				if (!user) {
					return null
				}

				const isPasswordValid = await compare(password, user.passwordHash)
				if (!isPasswordValid) {
					return null
				}

				return {
					id: user.id.toString(),
					name: user.firstName,
					email: user.email,
					image: user.image,
				}
			},
		}),
	],

	pages: {
		signIn: '/login',
	},

	session: {
		strategy: 'jwt',
	},

	secret: process.env.NEXTAUTH_SECRET,

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.email = user.email
				token.name = user.name
				token.image = user.image
			}
			return token
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string
				session.user.name = token.name as string
				session.user.email = token.email as string
				session.user.image = token.image as string
			}
			return session
		},
	},
}
