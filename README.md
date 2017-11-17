# Lottery Ticket Scanning API

A lottery ticket scanning API to solve the challenge found [here](https://github.com/autolotto/DeveloperCandidatesWhatDoTheyKnowDoTheyKnowThingsLetsFindOut)
## Download

To checkout the source, you can run: 

`git clone https://github.com/colincgn/lottery.git`

## Installation

This app requires: 

- A Linux or MacOS Environment *(Windows Untested)*
- Node.js 8.9+

If you do not have node.js installed: 

1. [Install NVM](https://github.com/creationix/nvm#installation)
2. [Install Node 8.9](https://github.com/creationix/nvm#usage) `nvm install 8.9`
3. [Switch to Node 8.9](https://github.com/creationix/nvm#usage) `nvm use 8.9`

## Starting the App

From the checked-out application folder, run: 

`npm start`

You should see output like this: 

```
node index.js
App listening on port 3000
```

You can then hit the default endpoint: 

`http://localhost:3000/`

You should see something like this: 

```json
{
  "message":"To use this API please refer to https://github.com/colincgn/lottery for further documentation"
}
```

To scan a ticket you would POST to `http://localhost:3000/scan-ticket`

eg.

```json
curl -X "POST" "http://localhost:3000/ticket-scan" \
     -H 'Content-Type: application/json' \
     -d $'{
  "picks": [
    ["4","6","16","30","56","18"],
    ["4","5","7","12","44","20"]
  ],
  "drawDate": "2017-11-11"
}'
```

The expected result should be

```json
{
  "results":[
    { "isWinner":true,"pick":["4","6","16","30","56","18"],"amount":90000000 },
    { "isWinner":false,"pick":["4","5","7","12","44","20"],"amount":0 }],
  "totalWinningAmount":90000000
}
```

To shutdown the server simply send a `^C`.

## Testing

To run the existing tests simply use: 

`npm test`

You should see output like this: 

```
  
  ✔ app › App Environment
  ✔ app › App Base Path
  ✔ app › App Includes Error Handler Middleware
  ✔ game-results-service › index › Will return the correct object definition
  ✔ game-results-service › index › Will return the array of results if found
  ✔ game-results-service › index › Will return undefined if no results are found
  ✔ game-results-service › index › Will throw error if api call fails
  ✔ ticket-payout-calculator › index › will return the correct payout structure
  ✔ ticket-payout-calculator › index › will calculate the correct totalWiningAmount
  ✔ ticket-payout-calculator › index › will calculate the correct totalWiningAmount
  ✔ middleware › errors › Error Handler Middleware
  ✔ middleware › errors › Error Handler for NotFound Case
  ✔ controllers › index › Root message Controller
  ✔ controllers › index › Fail Controller
  ✔ controllers › index › Not Found Controller
  ✔ controllers › index › postTicketScan Controller, responds with what is returned from generatePayout call.
  ✔ routes › routes › Router Setup
  
    17 tests passed
```



 
