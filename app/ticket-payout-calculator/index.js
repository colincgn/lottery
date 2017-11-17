const config = require('../config');

/**
 *
 * @param { array } totalPicks is an array of arrays. eg [['1','3','4','5','7','12'],['12','44','45','46','50','13']]
 * @param { object } drawResults
 * @param { array } drawResults.winningNumbers an array of the winning numbers.
 * @param { number } drawResults.jackpot the jackpot amount for the draw
 * @param { string } drawResults.drawDate the draw date for the jackpot
 * @return winning summary
 */
function generatePayout(totalPicks, drawResults) {

  const payout = totalPicks.map(getPickResults(drawResults));
  const total = payout.reduce((sum, value) => sum + value.amount, 0);
  return {
    results: payout,
    totalWinningAmount: total
  };
}

function getPickResults(drawResults) {
  return function (pick) {

    const intersection = pick.filter((ballNumber) => drawResults.winningNumbers.includes(ballNumber));
    const powerballMatch = pick[5] === drawResults.winningNumbers[5];

    const matrixPayoutValue = getPayout(intersection.slice(0, 5), powerballMatch);
    const payout = matrixPayoutValue === 'JACKPOT' ? drawResults.jackpot : matrixPayoutValue;

    return {
      isWinner: payout > 0,
      pick,
      amount: payout
    };
  };
}

/**
 *
 * @param { array } matchingNumbers
 * @param { boolean }powerballMatch
 */
function getPayout(matchingNumbers, powerballMatch) {
  if (powerballMatch) {
    return config.PAYOUT_MATRIX.WITH_POWERBALL[matchingNumbers.length];
  } else {
    return config.PAYOUT_MATRIX.WITHOUT_POWERBALL[matchingNumbers.length] || 0;
  }
}

module.exports = {
  generatePayout
};