'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { AlertContext } from '@/contexts'
import { AddressType } from '@/types/types'
import { Button, CheckboxField } from '@/components'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

const newAdressFormSchema = z.object({
	country: z.string().min(1, 'Country is required'),
	province: z.string().min(1, 'Province is required'),
	city: z.string().min(1, 'City is required'),
	postalCode: z.string().min(1, 'Postal code is required'),
	street: z.string().min(1, 'Address is required'),
	isMainAddress: z.boolean(),
})

type NewAdressData = z.infer<typeof newAdressFormSchema>

export default function NewAddress() {
	const [, setAlert] = useContext(AlertContext)
	const router = useRouter()

	async function updateAddress(data: AddressType) {
		try {
			const response = await fetch('http://localhost:3000/api/address', {
				method: 'PUT',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({
					country: data.country,
					province: data.province,
					city: data.city,
					postalCode: data.postalCode,
					street: data.street,
					isMainAddress: data.isMainAddress,
				}),
			})
			const updatedAdress = await response.json()
			if (response.ok) {
				setAlert({ text: `${updatedAdress.message}`, type: 'success' })
			} else {
				setAlert({ text: `${updatedAdress.error}`, type: 'error' })
			}
		} catch (error) {
			console.error(error)
		}
	}

	function onSubmit(data: AddressType) {
		updateAddress(data)
		router.refresh()
	}

	const form = useForm<NewAdressData>({
		resolver: zodResolver(newAdressFormSchema),
		defaultValues: {
			country: '',
			province: '',
			city: '',
			postalCode: '',
			street: '',
			isMainAddress: true,
		},
	})
	return (
		<div className='flex flex-col gap-8'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8'
				>
					<div className='flex flex-col sm:flex-row  justify-between gap-10'>
						<FormField
							control={form.control}
							name='country'
							render={({ field }) => (
								<FormItem className=' w-full sm:max-w-[400px] mx-auto'>
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
										variant={
											form.formState.errors.country ? 'error' : 'success'
										}
									></FormMessage>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='province'
							render={({ field }) => (
								<FormItem className='w-full sm:max-w-[400px]  mx-auto '>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger size='lg'>
												<SelectValue placeholder='Province' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='jakarta'>Jakarta</SelectItem>
											<SelectItem value='masovian'>Masovian</SelectItem>
											<SelectItem value='bayern'>Bayern</SelectItem>
											<SelectItem value='alsace'>Alsace</SelectItem>
											<SelectItem value='california'>California</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage
										variant={
											form.formState.errors.province ? 'error' : 'success'
										}
									></FormMessage>
								</FormItem>
							)}
						/>
					</div>
					<div className='flex flex-col sm:flex-row justify-between gap-10'>
						<FormField
							control={form.control}
							name='city'
							render={({ field }) => (
								<FormItem className=' w-full sm:max-w-[400px]  mx-auto'>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger size='lg'>
												<SelectValue placeholder='City' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='jakarta'>Jakarta</SelectItem>
											<SelectItem value='warsaw'>Warsaw</SelectItem>
											<SelectItem value='munich'>Munich</SelectItem>
											<SelectItem value='strasbourg'>Strasbourg</SelectItem>
											<SelectItem value='los_angeles'>Los Angeles</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage
										variant={form.formState.errors.city ? 'error' : 'success'}
									></FormMessage>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='postalCode'
							render={({ field }) => (
								<FormItem className='w-full sm:max-w-[400px]  mx-auto'>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger size='lg'>
												<SelectValue placeholder='Postal code' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='00-001'>00-001</SelectItem>
											<SelectItem value='00-002'>00-002</SelectItem>
											<SelectItem value='00-003'>00-003</SelectItem>
											<SelectItem value='00-004'>00-004</SelectItem>
											<SelectItem value='00-005'>00-005</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage
										variant={
											form.formState.errors.postalCode ? 'error' : 'success'
										}
									></FormMessage>
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='street'
						render={({ field }) => (
							<FormItem className=''>
								<FormControl>
									<Textarea
										placeholder='Input Complete Adress (e.g Pulawska 1/3)'
										{...field}
										onChange={(e) => {
											field.onChange(e)
											form.trigger('street')
										}}
										className='h-[130px]'
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='isMainAddress'
						render={({ field }) => (
							<FormItem>
								<div className='flex'>
									<CheckboxField
										id='isMainAddress'
										onChange={field.onChange}
										checked={field.value}
										labelText={'Make it the main address'}
									/>
								</div>
							</FormItem>
						)}
					/>
					<Button type='submit'>Save Address</Button>
				</form>
			</Form>
		</div>
	)
}
