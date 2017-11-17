const test = require('ava');
const config = require('../../../app/config');

const { generatePayout } = require('../../../app/ticket-payout-calculator');

test('will return the correct payout structure', t => {

  const picksStub = [['1', '2', '3', '4', '5', '6']];
  const drawResultsStub = { drawDate: '2017-10-10', jackpot: 500, winningNumbers: ['1', '2', '3', '4', '5', '6'] };

  const payout = generatePayout(picksStub, drawResultsStub);
  t.true('results' in payout);
  t.true('totalWinningAmount' in payout);
  t.true('isWinner' in payout.results[0]);
  t.true('pick' in payout.results[0]);
  t.true('amount' in payout.results[0]);

});

test('will calculate the correct totalWiningAmount', t => {

  const picksStub = [['1', '2', '3', '4', '5', '6'], ['1', '2', '13', '14', '22', '6']];
  const drawResultsStub = { drawDate: '2017-10-10', jackpot: 500, winningNumbers: ['1', '2', '3', '4', '5', '6'] };

  const payout = generatePayout(picksStub, drawResultsStub);
  // 3 numbers with powerball = 100 payout + 500 for the jackpot on the first pick
  t.is(payout.totalWinningAmount, 600);
});

test('will return the correct payout if no numbers matched', t => {

  const picksStub = ['20', '22', '23', '24', '25', '26'];
  const drawResultsStub = { drawDate: '2017-10-10', jackpot: 500, winningNumbers: ['1', '2', '3', '4', '5', '6'] };

  const payout = generatePayout([picksStub], drawResultsStub);

  t.false(payout.results[0].isWinner);
  t.is(picksStub, payout.results[0].pick);
  t.is(0, payout.results[0].amount);
});