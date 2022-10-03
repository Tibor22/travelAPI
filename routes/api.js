import express from 'express';

import flightsRouter from './flights/flights.router.js';

const api = express.Router();

api.use('/flights', flightsRouter);

export default api;
