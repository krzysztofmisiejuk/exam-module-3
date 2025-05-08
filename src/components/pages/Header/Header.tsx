


import { Nav,  } from '.'
import {  Logo } from '@/components'
import HeaderPanel from './HeaderPanel'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'

export default async function Header() {
	const session = await getServerSession(authOptions)
	// const router = useRouter()

	return (
		<header className='flex flex-col gap-10 px-10 py-8  text-neutral-900'>
			<div className='flex justify-between flex-col-reverse gap-y-3 xs:flex-row text-2xl sm:text-3xl rounded-md font-semibold'>
				<Logo />
			<HeaderPanel session={session}/>
			</div>
			{session && <Nav />}
			<div className='w-full h-[1px] bg-gray-200'></div>
		</header>
	)
}
