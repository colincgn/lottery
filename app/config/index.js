module.exports = Object.freeze({
  PAYOUT_MATRIX: {
    WITH_POWERBALL: {
      0: 4,
      1: 4,
      2: 7,
      3: 100,
      4: 50000,
      5: 'JACKPOT'
    },
    WITHOUT_POWERBALL: {
      3: 7,
      4: 100,
      5: 1000000
    }
  },
  LOTTERY_RESULT_URL: 'https://games.api.lottery.com/api/v2.0/results?game=59bc2b6031947b9daf338d32'
});