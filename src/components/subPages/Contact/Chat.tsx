'use client'
import { useContext, useState } from 'react'
import { Button, Heading } from '@/components'
import { getCompletion } from '@/server-action/getCompletion'
import { ProductContext } from '@/contexts'
import { Input } from '@/components/ui/input'

interface Message {
	role: 'user' | 'assistant'
	content: string
}

export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([])
	const [message, setMessage] = useState<string>('')
	// const chatId = useRef<number | null>(null)
	const productsList = useContext(ProductContext)

	async function onClick() {
		// v1
		const completions = await getCompletion(
			[...messages, { role: 'user', content: message }],
			productsList
		)

		// const completions = await getCompletion(chatId.current, [
		// 	...messages,
		// 	{ role: 'user', content: message },
		// ])
		// chatId.current = completions.id
		setMessage('')
		setMessages(completions.messages)
	}

	return (
		<div className='flex flex-col gap-4 w-full flex-1 py-5'>
			<Heading
				Tag='h3'
				className='text-neutral-900'
				weight='medium'
			>
				{' '}
				AI Shop Advisor
			</Heading>
			<div className='flex flex-col items-center w-full flex-1 border-t border-b border-gray-200'>
				<div className='flex flex-col w-full  min-h-[calc(60vh)] overflow-y-auto px-4'>
					{messages.map((msg, i) => (
						<div
							key={i}
							className={`my-2.5 flex flex-col  ${
								msg.role === 'user' ? 'items-end' : 'items-start'
							}`}
						>
							<div
								className={`${
									msg.role === 'user'
										? 'bg-custom-light-blue text-neutral-900'
										: 'bg-custom-dark-gray text-primary-300'
								} rounded-md py-2 px-8`}
							>
								{msg.content}
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='flex flex-col gap-4 md:flex-row w-full'>
				<div className='w-full min-w-10/12'>
					<Input
						id='new_message'
						placeholder='Ask a question...'
						value={message}
						onChange={(e) => setMessage(e.currentTarget.value)}
						onKeyUp={(e) => {
							if (e.key === 'Enter') onClick()
						}}
					/>
				</div>

				<Button
					onClick={onClick}
					className='text-base bg-custom-dark-gray max-w-'
				>
					Send
				</Button>
			</div>
		</div>
	)
}
