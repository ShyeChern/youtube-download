const ytdl = require('ytdl-core');

export default async function handler(req, res) {
	try {
		if (req.method === 'GET') {
      // get title and download mp3
			const url = req.query.url;
			const info = await ytdl.getBasicInfo(url);
			res.writeHead(200, {
				'Content-Disposition': `attachment; filename="${encodeURIComponent(
					info.videoDetails.title
				)}.mp3"`,
			});
			ytdl(url, {
				filter: 'audioonly',
				format: 'mp3',
			}).pipe(res);
		} else {
			res.status(404).send();
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
}
