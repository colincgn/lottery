const test = require('ava');
const axios = require('axios');
const config = require('../../../app/config');
const axiosMockAdapter = require('axios-mock-adapter');

const { getResultsForDrawDate } = require('../../../app/game-results-service');
let mockAdapter;

test.beforeEach(() => {
  mockAdapter = new axiosMockAdapter(axios);
});

test.afterEach(() => {
  mockAdapter.restore();
});

test('Will return the correct object definition', async t => {
  mockAdapter.onGet(config.LOTTERY_RESULT_URL).reply(200, [
    {
      "_id": "5a079d10f6f293e2bff3773e",
      "game": "59bc2b6031947b9daf338d32",
      "resultsAnnouncedAt": "2017-11-16T03:59:00.000Z",
      "updatedAt": "2017-11-12T05:40:01.436Z",
      "createdAt": "2017-11-12T01:00:00.829Z",
      "prizes": {
        "values": [
          {
            "name": "Jackpot",
            "type": "JACKPOT",
            "value": 103000000
          }
        ],
        "asOfDate": "2017-11-12T05:40:01.390Z"
      }
    },
    {
      "_id": "5a03eee2f6f293e2bf74d111",
      "game": "59bc2b6031947b9daf338d32",
      "resultsAnnouncedAt": "2017-11-12T03:59:00.000Z",
      "updatedAt": "2017-11-12T04:10:01.738Z",
      "createdAt": "2017-11-09T06:00:02.745Z",
      "prizes": {
        "values": [
          {
            "name": "Jackpot",
            "type": "JACKPOT",
            "value": 90000000
          }
        ],
        "asOfDate": "2017-11-08T06:38:48.991Z"
      },
      "results": {
        "values": [
          {
            "type": "NUMBER",
            "value": "4"
          },
          {
            "type": "NUMBER",
            "value": "6"
          },
          {
            "type": "NUMBER",
            "value": "16"
          },
          {
            "type": "NUMBER",
            "value": "30"
          },
          {
            "type": "NUMBER",
            "value": "56"
          },
          {
            "category": "EXTRA",
            "name": "Powerball",
            "type": "NUMBER",
            "value": "18"
          },
          {
            "category": "BONUS",
            "name": "Power Play",
            "type": "NUMBER",
            "value": "2"
          }
        ],
        "asOfDate": "2017-11-12T04:10:01.688Z"
      }
    }]
  );

  const result = await getResultsForDrawDate('2017-11-11');

  t.true('winningNumbers' in result);
  t.true('jackpot' in result);
  t.true('drawDate' in result);

});

test('Will return the array of results if found', async t => {
  mockAdapter.onGet(config.LOTTERY_RESULT_URL).reply(200, [
    {
      "_id": "5a079d10f6f293e2bff3773e",
      "game": "59bc2b6031947b9daf338d32",
      "resultsAnnouncedAt": "2017-11-16T03:59:00.000Z",
      "updatedAt": "2017-11-12T05:40:01.436Z",
      "createdAt": "2017-11-12T01:00:00.829Z",
      "prizes": {
        "values": [
          {
            "name": "Jackpot",
            "type": "JACKPOT",
            "value": 103000000
          }
        ],
        "asOfDate": "2017-11-12T05:40:01.390Z"
      }
    },
    {
      "_id": "5a03eee2f6f293e2bf74d111",
      "game": "59bc2b6031947b9daf338d32",
      "resultsAnnouncedAt": "2017-11-12T03:59:00.000Z",
      "updatedAt": "2017-11-12T04:10:01.738Z",
      "createdAt": "2017-11-09T06:00:02.745Z",
      "prizes": {
        "values": [
          {
            "name": "Jackpot",
            "type": "JACKPOT",
            "value": 90000000
          }
        ],
        "asOfDate": "2017-11-08T06:38:48.991Z"
      },
      "results": {
        "values": [
          {
            "type": "NUMBER",
            "value": "4"
          },
          {
            "type": "NUMBER",
            "value": "6"
          },
          {
            "type": "NUMBER",
            "value": "16"
          },
          {
            "type": "NUMBER",
            "value": "30"
          },
          {
            "type": "NUMBER",
            "value": "56"
          },
          {
            "category": "EXTRA",
            "name": "Powerball",
            "type": "NUMBER",
            "value": "18"
          },
          {
            "category": "BONUS",
            "name": "Power Play",
            "type": "NUMBER",
            "value": "2"
          }
        ],
        "asOfDate": "2017-11-12T04:10:01.688Z"
      }
    }]
  );

  const result = await getResultsForDrawDate('2017-11-11');

  t.true(result.winningNumbers.includes('4'));
  t.true(result.winningNumbers.includes('6'));
  t.true(result.winningNumbers.includes('16'));
  t.true(result.winningNumbers.includes('30'));
  t.true(result.winningNumbers.includes('56'));
  t.true(result.winningNumbers.includes('18'));
  t.true(result.winningNumbers.includes('2'));

});

test('Will return undefined if no results are found', async t => {
  mockAdapter.onGet(config.LOTTERY_RESULT_URL).reply(200, [
    {
      "_id": "5a079d10f6f293e2bff3773e",
      "game": "59bc2b6031947b9daf338d32",
      "resultsAnnouncedAt": "2017-11-16T03:59:00.000Z",
      "updatedAt": "2017-11-12T05:40:01.436Z",
      "createdAt": "2017-11-12T01:00:00.829Z",
      "prizes": {
        "values": [
          {
            "name": "Jackpot",
            "type": "JACKPOT",
            "value": 103000000
          }
        ],
        "asOfDate": "2017-11-12T05:40:01.390Z"
      }
    },
    {
      "_id": "5a03eee2f6f293e2bf74d111",
      "game": "59bc2b6031947b9daf338d32",
      "resultsAnnouncedAt": "2017-11-12T03:59:00.000Z",
      "updatedAt": "2017-11-12T04:10:01.738Z",
      "createdAt": "2017-11-09T06:00:02.745Z",
      "prizes": {
        "values": [
          {
            "name": "Jackpot",
            "type": "JACKPOT",
            "value": 90000000
          }
        ],
        "asOfDate": "2017-11-08T06:38:48.991Z"
      },
      "results": {
        "values": [
          {
            "type": "NUMBER",
            "value": "4"
          },
          {
            "type": "NUMBER",
            "value": "6"
          },
          {
            "type": "NUMBER",
            "value": "16"
          },
          {
            "type": "NUMBER",
            "value": "30"
          },
          {
            "type": "NUMBER",
            "value": "56"
          },
          {
            "category": "EXTRA",
            "name": "Powerball",
            "type": "NUMBER",
            "value": "18"
          },
          {
            "category": "BONUS",
            "name": "Power Play",
            "type": "NUMBER",
            "value": "2"
          }
        ],
        "asOfDate": "2017-11-12T04:10:01.688Z"
      }
    }]
  );


  const result = await getResultsForDrawDate('2017-11-12');

  t.is(result, undefined);
});

test('Will throw error if api call fails', async t => {

  mockAdapter.onGet(config.LOTTERY_RESULT_URL).reply(500, undefined);

  const error = await t.throws(getResultsForDrawDate('2017-11-12'));

  t.is(error.message, 'Unable to retrieve results.');
});