import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
export const getFlightBetweenTwoCountry = async (
	origin,
	destination,
	from,
	to
) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	console.log(
		'origin: ',
		origin,
		'destination: ',
		destination,
		'from:',
		from,
		'to:',
		to
	);

	await page.goto(
		`https://www.kayak.co.uk/flights/${origin}-${destination}/${from}/${to}?sort=price_a&fs=stops=1`,
		{
			waitUntil: 'networkidle0',
		}
	);
	await page.waitForSelector('.price-text');

	let results = [];

	results = await page.$$eval('.inner-grid.keel-grid', (result) => {
		return result.slice(0, 5).map((result) => result.innerText);
	});

	console.log('RESULTS: ', results);

	results = results.map((result, i, arr) => {
		let provider;
		if (result.split(/\r?\n/).includes('1 stop')) {
			provider = result.split(/\r?\n/)[14];
		} else {
			provider = result.split(/\r?\n/)[12];
		}

		const price = result.match(/\£[0-9]+/)[0]?.slice(1, 4) || 'see link';

		if (provider == '1 stop') provider = 'Multiple Airlines';
		return { provider: provider, price: +price };
	});

	return results;
};
