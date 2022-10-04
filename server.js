import * as dotenv from 'dotenv';
dotenv.config();
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

app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});
