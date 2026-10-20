const API_KEY = "LBK0N3IFKQ9UI6KJ";

let chart;

async function loadStock() {
    const symbol = document.getElementById("symbol").value.toUpperCase();

    const url =
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    const prices = data["Time Series (Daily)"];

    const dates = Object.keys(prices).slice(0, 30).reverse();

    const closingPrices = dates.map(
        date => Number(prices[date]["4. close"])
    );

    drawChart(symbol, dates, closingPrices);
}

function drawChart(symbol, dates, prices) {

    const ctx = document.getElementById("stockChart");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [{
                label: `${symbol} Closing Price`,
                data: prices,
                borderColor: "blue",
                fill: false
            }]
        },
        options: {
            responsive: true
        }
    });
}