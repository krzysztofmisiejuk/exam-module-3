'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/atoms'
import { FormHeading } from '@/components/shared'
import { User } from '@/types/types'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { AlertContext } from '@/contexts/AlertContext'
import EyeOpen from '@/components/icons/EyeOpen'
import EyeClosed from '@/components/icons/EyeClosed'
import CheckboxField from '@/components/atoms/CheckboxField'

const phoneRegex = new RegExp(
	/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)
const passwordRegex = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)

const registerSchema = z
	.object({
		email: z.string().email('Enter a valid email address'),
		mobileNumber: z
			.string()
			.regex(phoneRegex, 'Invalid phone number')
			.min(9, { message: 'Please enter your phone number' }),
		password: z.string().regex(passwordRegex, {
			message:
				'Create a password which has at least 8 characters and includes at least 1 upper case letter, 1 lower case letter and 1 number.',
		}),
		confirmPassword: z.string().min(8, {
			message: 'Please enter confirm password',
		}),
		country: z.string().min(2, {
			message: 'Country is required',
		}),
		agreeToTerms: z.boolean().refine((val) => val === true, {
			message: 'You must agree to the terms.',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [, setAlert] = useContext(AlertContext)

	const router = useRouter()

	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			mobileNumber: '',
			password: '',
			confirmPassword: '',
			country: '',
			agreeToTerms: true,
		},
		mode: 'onChange',
	})

	async function register(data: User) {
		try {
			const response = await fetch('http://localhost:3000/api/register', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ data }),
			})
			const newUser = await response.json()
			if (response.ok) {
				router.push('register/successfully')
				setAlert({ text: `${newUser.message}`, type: 'success' })
			} else {
				setAlert({ text: `${newUser.error}`, type: 'error' })
			}
		} catch (error) {
			console.error('Błąd:', error)
		}
	}

	async function onSubmit(data: RegisterFormData) {
		await register({
			name: data.email.split('@')[0],
			email: data.email,
			mobileNumber: +data.mobileNumber,
			password: data.password,
		})
	}

	return (
		<>
			<FormHeading>Create Account</FormHeading>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-6'
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type='email'
										placeholder='Your Email'
										{...field}
										onChange={(e) => {
											field.onChange(e)
											form.trigger('email')
										}}
									/>
								</FormControl>
								<FormMessage
									variant={form.formState.errors.email ? 'error' : 'success'}
								>
									{form.formState.errors.email
										? form.formState.errors.email.message
										: field.value && 'Email is valid!'}
								</FormMessage>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='mobileNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mobile Number</FormLabel>
								<FormControl>
									<Input
										type='text'
										placeholder='Mobile number'
										{...field}
										onChange={(e) => {
											field.onChange(e)
											form.trigger('mobileNumber')
										}}
									/>
								</FormControl>
								<FormMessage
									variant={
										form.formState.errors.mobileNumber ? 'error' : 'success'
									}
								>
									{form.formState.errors.mobileNumber
										? form.formState.errors.mobileNumber.message
										: field.value && 'Phone number is valid!'}
								</FormMessage>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<div className='relative'>
									<FormControl>
										<Input
											type={showPassword ? 'text' : 'password'}
											placeholder='Password'
											{...field}
											onChange={(e) => {
												field.onChange(e)
												form.trigger('password')
											}}
										/>
									</FormControl>
									<button
										type='button'
										className='absolute right-3 top-1/2 -translate-y-1/2'
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? <EyeOpen /> : <EyeClosed />}
									</button>
								</div>
								<FormMessage
									variant={form.formState.errors.password ? 'error' : 'success'}
								>
									{form.formState.errors.password
										? form.formState.errors.password.message
										: field.value && 'Password is valid!'}
								</FormMessage>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<div className='relative'>
									<FormControl>
										<Input
											type={showConfirmPassword ? 'text' : 'password'}
											placeholder='Confirm password'
											{...field}
											onChange={(e) => {
												field.onChange(e)
												form.trigger('confirmPassword')
											}}
										/>
									</FormControl>
									<button
										type='button'
										className='absolute right-3 top-1/2 -translate-y-1/2'
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									>
										{showPassword ? <EyeOpen /> : <EyeClosed />}
									</button>
								</div>
								<FormMessage
									variant={
										form.formState.errors.confirmPassword ? 'error' : 'success'
									}
								>
									{form.formState.errors.confirmPassword
										? form.formState.errors.confirmPassword.message
										: field.value && 'Passwords match!'}
								</FormMessage>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='country'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Country or region</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger size='lg'>
											<SelectValue placeholder='Select your country' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='indonesia'>Indonesia</SelectItem>
										<SelectItem value='poland'>Poland</SelectItem>
										<SelectItem value='germany'>Germany</SelectItem>
										<SelectItem value='france'>France</SelectItem>
										<SelectItem value='usa'>USA</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage
									variant={form.formState.errors.country ? 'error' : 'success'}
								></FormMessage>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='agreeToTerms'
						render={({ field }) => (
							<FormItem>
								<div className='flex items-center gap-4 pt-2'>
									<CheckboxField
										id='agreeTerms'
										onChange={field.onChange}
										defaultChecked={true}
										labelText={
											<span className='text-neutral-900 text-sm'>
												By creating an account and check, you agree to the
												<span className='text-primary-500'>
													{' '}
													Conditions of Use{' '}
												</span>
												and
												<span className='text-primary-500'>
													{' '}
													Privacy Notice
												</span>
												.
											</span>
										}
									/>
								</div>
								<FormMessage
									variant={
										form.formState.errors.agreeToTerms ? 'error' : 'success'
									}
								>
									{form.formState.errors.agreeToTerms
										? form.formState.errors.agreeToTerms.message
										: field.value && ''}
								</FormMessage>
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						size='xl'
						className='w-full'
					>
						Create Account
					</Button>
				</form>
			</Form>
		</>
	)
}
