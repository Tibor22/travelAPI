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
	// await page.goto(
	// 	'https://www.kayak.co.uk/flights/LON-BUD/2022-11-01/2022-11-08?sort=price_a'
	// );
	await page.goto(
		`https://www.kayak.co.uk/flights/${origin}-${destination}/${from}/${to}?sort=price_a&fs=stops=0`,
		{
			waitUntil: 'networkidle0',
		}
	),
		await Promise.all([waitForDOMToSettle(page)]);

	let results = [];
	results = await page.$$eval('.inner-grid.keel-grid', (result) => {
		return result.slice(0, 10).map((result) => result.innerText);
	});

	console.log('RESULTS: ', results);

	results = results.map((result) => {
		const provider = result.split(/\r?\n/)[12];
		const price = result.match(/\£[0-9]+/)[0].slice(1, 4);
		return { provider: provider, price: +price };
	});

	return results;
};

const waitForDOMToSettle = (page, timeoutMs = 60000, debounceMs = 1000) =>
	page.evaluate(
		(timeoutMs, debounceMs) => {
			let debounce = (func, ms = 1000) => {
				let timeout;
				return (...args) => {
					console.log('in debounce, clearing timeout again');
					clearTimeout(timeout);
					timeout = setTimeout(() => {
						func.apply(this, args);
					}, ms);
				};
			};
			return new Promise((resolve, reject) => {
				let mainTimeout = setTimeout(() => {
					observer.disconnect();
					reject(new Error('Timed out whilst waiting for DOM to settle'));
				}, timeoutMs);

				let debouncedResolve = debounce(async () => {
					observer.disconnect();
					clearTimeout(mainTimeout);
					resolve();
				}, debounceMs);

				const observer = new MutationObserver(() => {
					debouncedResolve();
				});
				const config = {
					attributes: true,
					childList: true,
					subtree: true,
				};
				observer.observe(document.body, config);
			});
		},
		timeoutMs,
		debounceMs
	);
