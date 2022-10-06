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

	results = results.map((result, i, arr) => {
		let provider;
		if (result.split(/\r?\n/).includes('1 stop')) {
			if (
				result.split(/\r?\n/)[14].length < 5 ||
				/[0-9]/.test(result.split(/\r?\n/)[14])
			) {
				provider = 'Multiple Airlines';
			} else {
				provider = result.split(/\r?\n/)[14];
			}
		} else {
			if (
				result.split(/\r?\n/)[12].length < 5 ||
				/[0-9]/.test(result.split(/\r?\n/)[12])
			) {
				provider = 'Multiple Airlines';
			} else {
				provider = result.split(/\r?\n/)[12];
			}
		}

		const price = result.match(/\£[0-9]+/)[0]?.slice(1, 4) || 'See Link';

		return { provider: provider, price: +price };
	});

	return results;
};
