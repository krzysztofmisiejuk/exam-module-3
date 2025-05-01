// app/api/auth/[...nextauth]/route.ts

import { authOptions } from '@/lib/authOptions' // Zaimportuj authOptions z lib/authOptions
import NextAuth from 'next-auth/next' // Użyj poprawnej wersji importu NextAuth

const handler = NextAuth(authOptions) // Przekaż authOptions do NextAuth

export { handler as GET, handler as POST } // Eksportuj handlera jako GET i POST
