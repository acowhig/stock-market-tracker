const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter stock symbol: ", async (symbol) => {
    const API_KEY = "LBK0N3IFKQ9UI6KJ";
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;

    console.log("Requesting: ", url);

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    rl.close();
})