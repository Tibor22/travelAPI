import puppeteer from 'puppeteer-extra';
import express from 'express';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import cors from 'cors';
import api from './routes/api.js';

const port = process.env.PORT || 8080;
puppeteer.use(StealthPlugin());
const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1', api);
// const start = async () => {
// 	const browser = await puppeteer.launch();
// 	const page = await browser.newPage();
// 	await page.goto(
// 		'https://www.kayak.co.uk/flights/LON-BUD/2022-11-01/2022-11-08?sort=price_a'
// 	);

// 	let results = await page.$$eval('.col-info.result-column', (result) => {
// 		return result.slice(1, 11).map((result) => result.innerText);
// 	});

// 	results = results.map((result) => {
// 		const provider = result.split(/\r?\n/)[12];
// 		const price = result.match(/\£[0-9]+/)[0].slice(1, 3);
// 		return { provider: provider, price: +price };
// 	});
// 	console.log(results);
// };

// start();

app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});
