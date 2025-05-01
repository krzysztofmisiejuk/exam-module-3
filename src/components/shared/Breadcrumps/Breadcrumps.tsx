import { Breadcrumb } from '@/components/ui/breadcrumb'
import BreadCrumpItems from './BreadCrumpsItem'


export default async function Breadcrumps() {
	return (
		<Breadcrumb className='flex gap-2 py-2.5'>
			<BreadCrumpItems />
		</Breadcrumb>
	)
}
