const test = require('ava');
const td = require('testdouble');

const gameResultService = td.replace('../../../app/game-results-service');
const payoutCalculator = td.replace('../../../app/ticket-payout-calculator');

const { root, fail, postTicketScan, notFound } = require('../../../app/controllers');

test('Root message Controller', t => {
  const res = { json: td.function() };
  root({}, res);
  t.notThrows(() =>
    td.verify(res.json({ message: 'To use this API please refer to https://github.com/colincgn/lottery for further documentation' }))
  );
});

test('postTicketScan Controller, responds with what is returned from generatePayout call.', async t => {

  const res = { json: td.function() };
  const picks = [['1', '2', '3', '4', '5', '6']];
  const req = { body: { drawDate: '2017-10-10', picks: picks } };

  const drawResults = {
    jackpot: 1000,
    drawDate: '2017-10-10',
    winningNumbers: ['1', '2', '3', '4', '5', '6']
  };

  td.when(gameResultService.getResultsForDrawDate('2017-10-10')).thenResolve(drawResults);
  td.when(payoutCalculator.generatePayout(picks, drawResults)).thenReturn("calculated correctly");


  await postTicketScan(req, res);

  t.notThrows(() =>
    td.verify(res.json("calculated correctly"))
  );
});

test('Fail Controller', t => {
  t.throws(() => fail(), 'Hello Error');
});


test('Not Found Controller', t => {
  t.throws(() => notFound(), 'Not Found');
});