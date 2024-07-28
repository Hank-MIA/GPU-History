margin = 70

let clickCount = 0; 
let skipAnimation = false;

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

    document.body.addEventListener('click', function () {
        clickCount++;
        if (clickCount % 2 === 0) {
            skipAnimation = true;
        } else {
            skipAnimation = false;
            handleLoad(clickCount);
        }
    });
}

async function handleLoad(clickCount) {
    switch (clickCount) {
        case 1:
            intro_container = d3.select('#intro-container');
            await loadIntro();
            break;
        case 2:
            break;
        case 3:
            svg2 = d3.select('#svg2');
            await loadSVG2();
            break;
        case 4:
            svg2.selectAll('.stock_gain').interrupt();
            break;
        case 5:
            svg3 = d3.select('#svg3');
            await loadSVG3();
            break;
        case 7:
            let div4 = d3.select('#outtro-container'); // Assuming 'outtro-container' is your div4
            div4.html(''); // Clear previous content if necessary
            div4.append('a')
                .attr('href', 'https://www.nvidia.com')
                .attr('target', '_blank') // Opens link in a new tab
                .text('Visit NVIDIA’s Official Site')
                .style('font-size', '20px')
                .style('color', '#0078D4');
            break;
    }
}


