import { FormHeading, FormWrapper, MainHeading } from '@/components'

export default function RootLogin({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col justify-center items-center gap-8 my-[67px]'>
			<MainHeading
				tag='h2'
				size='xxl'
				weight='bold'
			/>
			<FormWrapper>
				<FormHeading>Sing In</FormHeading>
				{children}
			</FormWrapper>
		</div>
	)
}
