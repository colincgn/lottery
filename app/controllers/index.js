const gameResultService = require('../game-results-service');
const payoutCalculator = require('../ticket-payout-calculator');

// Hello World on '/'
function root(req, res) {
  res.json({ message: 'To check ticket call ticket-scan' });
}

async function postTicketScan(req, res) {
  validateTicket(req.body.drawDate, req.body.picks);
  const drawResults = await gameResultService.getResultsForDrawDate(req.body.drawDate);

  if (drawResults === undefined) {
    const err = new Error(`No game data available for draw date ${req.body.drawDate}`);
    err.status = 404;
    throw err;
  } else {
    const payout = payoutCalculator.generatePayout(req.body.picks, drawResults);
    res.json(payout);
  }
}

/**
 * Validates the input parameters.  This could be more extensive but for the purpose of this coding challenge I left that out.
 * @param drawDate
 * @param picks
 */
function validateTicket(drawDate, picks) {
  const generateError = errorMessage => {
    const err = new Error(errorMessage);
    err.status = 400;
    throw err;
  };

  if (drawDate === undefined) {
    generateError('drawDate missing');
  }
  if (picks === undefined) {
    generateError('picks missing');
  }
}

// Simulate a Failure on '/fail'
function fail(req, res) {
  throw new Error('Hello Error');
}

// 404 Handler
function notFound(req, res) {
  const err = new Error('Not Found');
  err.status = 404;
  throw err;
}

module.exports = {
  root,
  fail,
  postTicketScan,
  notFound
};
