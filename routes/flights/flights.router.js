import express from 'express';
import { getCheapestFlightsForCountry } from '../../controller/flights.controller.js';

const flightsRouter = express.Router();

flightsRouter.use('/', getCheapestFlightsForCountry);

export default flightsRouter;
