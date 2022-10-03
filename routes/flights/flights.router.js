import { Router } from 'express';
import { getCheapestFlightsForCountry } from '../../controller/flights.controller.js';

const flightsRouter = new Router();

flightsRouter.get('/flight', getCheapestFlightsForCountry);

export default flightsRouter;
