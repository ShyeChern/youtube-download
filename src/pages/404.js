import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Custom404() {
	const [timer, setTimer] = useState(5);
	const router = useRouter();

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (timer > 0) {
				setTimer(timer - 1);
			} else {
				router.replace('/');
			}
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	});

	return (
		<div className="body">
			<h1>404 Not Found</h1>
			<p>You will be redirect to main page in {timer}</p>
			<Link href="/">
				<a>Redirect Now</a>
			</Link>
		</div>
	);
}
