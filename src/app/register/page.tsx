import { FormWrapper, MainHeading, RegisterForm } from "@/components";


export default async function Register() {
	return (
		<div className='flex flex-col justify-center items-center gap-8 my-[67px]'>
			<MainHeading
				tag='h2'
				size='xxl'
				weight='bold'
			/>
			<FormWrapper>
				<RegisterForm />
			</FormWrapper>
		</div>
	)
}
