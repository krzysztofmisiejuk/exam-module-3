import { Breadcrumb } from '@/components'
import BreadCrumpItems from './BreadCrumpsItem'

export default async function Breadcrumps() {
	return (
		<Breadcrumb className='flex gap-2 py-2.5'>
			<BreadCrumpItems />
		</Breadcrumb>
	)
}
