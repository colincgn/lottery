const config = require('../config');
const axios = require('axios');
const dateFormat = require('dateformat');
const API_DATE_FORMAT = 'yyyy-mm-dd';

/*
 example of cache format
 [{
 drawDate: '2017-11-11',
 jackpot:100000000,
 winningNumbers: [2, 3, 33, 45, 46, 16]
 }, {
 drawDate: '2017-11-09',
 jackpot:200000000,
 winningNumbers: [12, 13, 33, 45, 46, 16]
 }]
 */
const cachedResults = [];

/**
 *
 * @param { string } drawDate in the format of yyyy-mm-dd
 * @return { array } results game results
 */
async function getResultsForDrawDate(drawDate) {
  return getFromCache(drawDate) || fetchGameResultsForDrawDate(drawDate);
}

async function fetchGameResultsForDrawDate(drawDate) {
  try {
    const apiResponse = await axios.get(config.LOTTERY_RESULT_URL);

    const gameResults = apiResponse.data.find(result => {
      const date = new Date(result.resultsAnnouncedAt);
      const resultsAnnouncedAt = dateFormat(date, API_DATE_FORMAT);
      return drawDate === resultsAnnouncedAt;
    });

    if (gameResults && gameResults.results) {

      const results = gameResults.results.values.map(drawnNumber => drawnNumber.value);
      const jackpot = gameResults.prizes.values.find(prize => prize.type === 'JACKPOT');

      const drawDateResult = {
        jackpot: jackpot.value,
        drawDate: drawDate,
        winningNumbers: results
      };
      cachedResults[drawDate] = drawDateResult;
      return drawDateResult;
    }
  } catch (err) {
    throw new Error('Unable to retrieve results.');
  }
}

/*
 Decided to create a local cache here due to the application only really needing to call out to the internet once as the result is static after that
 Downside is if the API call populates cache with incorrect data a restart will be required, upside is you wont flood the API you're calling,
 potentially hitting their rate limiting and your requests with respond a lot faster too.
 */
function getFromCache(drawDate) {
  return cachedResults[drawDate];
}

module.exports = {
  getResultsForDrawDate
};
