import {
	FacebookIcon,
	HomeIcon,
	InstagramIcon,
	LinkedInIcon,
	MailIcon,
	Paragraph,
	PhoneIcon,
} from '@/components'

export default function ContactInfo() {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-5 text-neutral-600 w-full'>
			<div className='h-full flex flex-col justify-between items-center text-center gap-2 p-4 rounded-md border border-gray-400 bg-gray-50'>
				<div className='flex  items-center justify-center gap-4 h-full'>
					<HomeIcon fill=' #ee701d' />
					<div className='text-center'>
						<Paragraph size='lg'>Puławska 33</Paragraph>
						<Paragraph size='lg'>00-000 Warsaw</Paragraph>
						<Paragraph size='lg'>Poland</Paragraph>
					</div>
				</div>
				<div className='flex gap-4 flex-col justify-center items-center md:flex-row md:justify-around border-t border-gray-400 w-full h-full pt-4'>
					<div className='flex gap-4 h-full'>
						<PhoneIcon fill=' #ee701d' />
						<Paragraph
							size='lg'
							weight='medium'
						>
							333 444 555
						</Paragraph>
					</div>

					<div className='flex  gap-4 h-full '>
						<MailIcon fill=' #ee701d' />
						<Paragraph
							size='lg'
							weight='medium'
						>
							devstockhub@shop.com
						</Paragraph>
					</div>
				</div>
			</div>

			<div className='flex flex-col items-center justify-center gap-4 p-4 rounded-md border border-gray-400 bg-gray-50 self-center h-full'>
				<Paragraph
					size='lg'
					weight='medium'
					className=''
				>
					Find us on Social Media
				</Paragraph>
				<div className='flex gap-10 '>
					<FacebookIcon />
					<LinkedInIcon />
					<InstagramIcon />
				</div>
			</div>
		</div>
	)
}
