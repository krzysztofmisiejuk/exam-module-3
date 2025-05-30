'use client'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { Nav, HeaderIconList } from '.'
import { Button, Logo } from '@/components'

export default function Header({ session }: { session: Session | null }) {
	const router = useRouter()

	return (
		<header className='flex flex-col gap-10 px-10 py-8  text-neutral-900'>
			<div className='flex justify-between flex-col gap-y-3 xs:flex-row text-2xl sm:text-3xl rounded-md font-semibold'>
				<Logo />
				{session ? (
					<HeaderIconList session={session} />
				) : (
					<Button
						size='xl'
						className='md:w-[121px]'
						onClick={() => router.push('/login')}
					>
						Sing In
					</Button>
				)}
			</div>
			{session && <Nav />}
			<div className='w-full h-[1px] bg-gray-200'></div>
		</header>
	)
}
