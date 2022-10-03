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
		`https://www.kayak.co.uk/flights/${origin}-${destination}/${from}/${to}?sort=price_a`
	);

	let results = await page.$$eval('.col-info.result-column', (result) => {
		return result.slice(1, 11).map((result) => result.innerText);
	});

	results = results.map((result) => {
		const provider = result.split(/\r?\n/)[12];
		const price = result.match(/\£[0-9]+/)[0].slice(1, 3);
		return { provider: provider, price: +price };
	});
};
