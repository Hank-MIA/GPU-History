margin = 70


daily_quotes = []
annual_quotes = []
async function init() {

    daily_quotes = await d3.csv("https://hank-mia.github.io/GPU-History/NVDA.csv",
        function (d) {
            return { date: d3.timeParse("%Y-%m-%d")(d.Date), close: parseFloat(d['Adj Close']) }
        }
    )


    annual_quotes = [{ end: daily_quotes[0].date, close: daily_quotes[0].close }]
    for (let i = 1; i < daily_quotes.length; i++) {
        if (daily_quotes[i].date.getFullYear() - 1 == daily_quotes[i - 1].date.getFullYear()) {
            let last_quote = annual_quotes[annual_quotes.length - 1];
            annual_quotes.push({
                begin: last_quote.end,
                end: daily_quotes[i - 1].date,
                close: daily_quotes[i - 1].close,
                growth: (daily_quotes[i - 1].close - last_quote.close) / last_quote.close * 100
            })
        }
    }
    annual_quotes = annual_quotes.slice(1)

    intro_container = d3.select('#intro-container')
    await loadIntro()

    svg2 = d3.select('#svg2')
    await loadSVG2()

    svg3 = d3.select('#svg3')
    loadSVG3()

    
}


