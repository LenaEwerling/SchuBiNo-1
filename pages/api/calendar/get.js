import CalEvent from '@/models/CalEvent';
import { dbConnect } from '@/helper/database/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		await dbConnect();

		const { userId, dates } = req.body;
		let datesArr = convertToArray(dates);
		let results = await CalEvent.find({
			userId: userId,
			date: { $in: datesArr },
		}).catch((err) => {
			console.log('Unexpected Database error!', err);
			res.status(500).send('Unexpected Database error!');
		});

		res.status(200).json(results);
	} else {
		console.log('Invalid request type!❌');
		res.status(400).send('Invalid request type!❌');
	}
}

function convertToArray(a) {
	a.constructor.name !== 'Array' ? (a = [a]) : (a = a);
	return a;
}
