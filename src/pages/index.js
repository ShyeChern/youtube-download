import { useState } from 'react';
import axios from 'axios';

export default function Home() {
	const [errorText, setErrorText] = useState('');
	const [url, setUrl] = useState('');

	const download = (e) => {
		e.preventDefault();
		if (!url) {
			setErrorText('Please enter url.');
			return;
		}
		axios(`api/download/check-validity?url=${url}`, {
			method: 'GET',
		})
			.then((res) => {
				if (res.data === 'OK') {
					window.open(`api/download?url=${url}`);
				}
			})
			.catch((err) => {
				setErrorText(err.response.data || err.message);
			});
			
		setUrl('');
	};
	return (
		<div className="container body">
			<main>
				<h1 className="fst-italic fw-bolder">Youtube Mp3 Downloader</h1>
				<p className="">Start download by pasting the youtube url below.</p>
				<form onSubmit={download}>
					<div>
						<p className="text-danger">{errorText}</p>
						<input
							type="text"
							className="form-control"
							onFocus={() => setErrorText('')}
							onChange={(e) => setUrl(e.target.value)}
							placeholder="Youtube url (example: https://www.youtube.com/watch?v=abc123)"
							value={url}
						/>
					</div>
					<div className="d-flex justify-content-end pt-2">
						<button className="btn btn-primary text-white">Convert</button>
					</div>
				</form>
			</main>
		</div>
	);
}
