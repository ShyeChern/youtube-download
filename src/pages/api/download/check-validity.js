const ytdl = require('ytdl-core');

export default async function handler(req, res) {
	try {
		if (req.method === 'GET') {
			//  check url validity
			const url = req.query.url;
			if (!ytdl.validateURL(url)) {
				return res.status(400).send('Invalid url. Please make sure you paste a valid url.');
			}
			res.status(200).send('OK');
		} else {
			res.status(404).send();
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
}
