import Link from 'next/link';
import EventList from '@/components/eventList';
import AccessDenied from '@/components/accessDenied';

import { useSession } from 'next-auth/client';

export default function Dashboard() {
	const [session, loading] = useSession();

	if (loading) {
		return <div className='loader container'></div>;
	}
	return (
		<>
			{session ? (
				<div>
					<div className='fs-1 text text-center mt-4'>
						Welcome back {session?.user.name}!
					</div>

					<EventList days={7} amount={5} />
				</div>
			) : (
				<AccessDenied />
			)}
		</>
	);
}
