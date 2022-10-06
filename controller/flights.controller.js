import { getFlightBetweenTwoCountry } from '../model/flights.model.js';

export const getCheapestFlightsForCountry = async (req, res) => {
	const { origin, destination, from, to } = req.query;
	const promise1 = new Promise((resolve, reject) => {
		setTimeout(resolve, 35000, []);
	});

	try {
		const flights = await Promise.race([
			promise1,
			getFlightBetweenTwoCountry(origin, destination, from, to),
		]);

		res.json(flights);
	} catch (err) {
		return res.json([]);
	}
};
