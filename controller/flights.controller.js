import { getFlightBetweenTwoCountry } from '../model/flights.model.js';

export const getCheapestFlightsForCountry = async (req, res) => {
	const { origin, destination, from, to } = req.query;

	const flights = await getFlightBetweenTwoCountry(
		origin,
		destination,
		from,
		to
	);

	console.log('FLIGHTS:', flights);

	res.json(flights);
};
