const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

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

			// get stream
			const stream = ytdl(url, {
				filter: 'audioonly',
				format: 'mp3',
			});
			// ouput stream as mp3 file
			ffmpeg(stream).format('mp3').output(res).run();

		} else {
			res.status(404).send();
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
}
