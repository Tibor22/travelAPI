import puppeteer from 'puppeteer-extra';
import express from 'express';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const port = process.env.PORT || 8080;
puppeteer.use(StealthPlugin());
const app = express();
// const puppeteer = puppeteer();
const waitTillHTMLRendered = async (page, timeout = 30000) => {
	const checkDurationMsecs = 1000;
	const maxChecks = timeout / checkDurationMsecs;
	let lastHTMLSize = 0;
	let checkCounts = 1;
	let countStableSizeIterations = 0;
	const minStableSizeIterations = 3;

	while (checkCounts++ <= maxChecks) {
		let html = await page.content();
		let currentHTMLSize = html.length;

		let bodyHTMLSize = await page.evaluate(
			() => document.body.innerHTML.length
		);

		console.log(
			'last: ',
			lastHTMLSize,
			' <> curr: ',
			currentHTMLSize,
			' body html size: ',
			bodyHTMLSize
		);

		if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
			countStableSizeIterations++;
		else countStableSizeIterations = 0; //reset the counter

		if (countStableSizeIterations >= minStableSizeIterations) {
			console.log('Page rendered fully..');
			break;
		}

		lastHTMLSize = currentHTMLSize;
		await page.waitForTimeout(checkDurationMsecs);
	}
};

const start = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://kayak.co.uk');
	await waitTillHTMLRendered(page);
	await page.type('.zEiP-destination .k_my-input', 'Budapest');
	await page.click('.zEiP-formField.zEiP-submit');
	// const pause = setTimeout(() => 5000);
	// pause()
	console.log('taking image 1');
	await page.screenshot({ path: 'kayak1.png' });
	console.log('done');
	console.log('taking another image 2');
	await page.screenshot({ path: 'kayak2.png' });
	await page.click('.iInN-decline');
	console.log('taking another image 3');
	await page.screenshot({ path: 'kayak3.png' });
	await page.click('.iInN-decline');
	await page.click('.JyN0-pres-item-mcfly'),
		await page.screenshot({ path: 'kayak4.png' });
	console.log('done');
	console.log('last image');
	// await waitTillHTMLRendered(page);
	await page.click('.iInN-decline');
	await page.click('.zEiP-formField.zEiP-submit');
	// await page.waitForFunction('renderingCompleted === true');
	const wait = setTimeout(async () => {
		await page.screenshot({ path: 'kayak5.png' });
		console.log('done');
		await browser.close();
	}, 2000);

	// await page.screenshot({ path: 'kayak5.png' });
	// console.log('done');
};
start();

app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});
