import { useSession, getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SignInForm from '@/components/signinForm';

export default function SignIn({ csrfToken, test }) {
	const { data: session, status } = useSession();
	const router = useRouter();

	function signinFormCallback() {}

	function autoRedirect() {
		setTimeout(() => router.push('/dashboard'), 5000);
	}

	useEffect(() => {
		console.log(test);
	}, []);

	if (status === 'loading') {
		return <div className='loader container'></div>;
	}
	return (
		<>
			{session ? (
				<div>
					<div className='text text-center mt-4 container'>
						<h1>You are already logged in!</h1>
						<p>
							You will be automatically redirected in 5 seconds or
							<Link href='/dashboard' passHref>
								Click here
							</Link>
							!
						</p>
						{autoRedirect()}
					</div>
				</div>
			) : (
				<div className='container'>
					{console.log('CsrfToken:' + test)}
					<SignInForm
						callback={signinFormCallback}
						csrfToken={csrfToken}
						error={router.query.error}
					/>
				</div>
			)}
		</>
	);
}

export async function getServerSideProps(context) {
	const csfrToken = await fetch('http://localhost:3000/api/auth/csrf').then(
		(res) => res.json()
	);
	console.log('CsrfToken:' + csfrToken.csrfToken);
	return {
		props: {
			csrfToken: csfrToken.csrfToken,
			test: 'test',
		},
	};
}
