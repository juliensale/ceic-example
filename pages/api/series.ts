// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../series.json';

type DataObject = typeof data[number];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let newData = [...data];

	if (typeof req.query.search === 'string' && req.query.search !== '') {
		newData = newData.filter(d => d.name.toLocaleLowerCase().includes((req.query.search as string).toLocaleLowerCase()));
	}

	if (
		typeof req.query.orderCol === 'string' &&
		Object.keys(data[0]).includes(req.query.orderCol) &&
		typeof req.query.orderDir === 'string' &&
		['asc', 'desc'].includes(req.query.orderDir)
	) {
		newData = newData.sort((a, b) => {
			const baseValue = req.query.orderDir === 'asc' ? -1 : 1;
			if (a[req.query.orderCol as keyof DataObject] < b[req.query.orderCol as keyof DataObject]) return 1 * baseValue;
			return -1 * baseValue;
		})
	}

	if (req.query.status) {
		let stringStatus = req.query.status
		if (typeof stringStatus === 'string') stringStatus = [stringStatus];
		const status = stringStatus.map(s => parseInt(s));

		newData = newData.filter(d => status.includes(d.status));
	}

	res.status(200).json(newData)
}