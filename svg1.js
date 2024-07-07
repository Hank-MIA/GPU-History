async function loadSVG1() {
    var height = svg1.node().clientHeight - 2 * margin
    var width = svg1.node().clientWidth - 2 * margin

    var drawing = svg1.append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")");

    // init scales and axis positions
    var dateScale = d3.scaleTime()
        .range([0, width]);
    var dateAxis = drawing.append("g")
        .attr("transform", "translate(0," + height + ")")

    var quoteScale = d3.scaleLinear()
        .range([height, 0]);
    var quoteAxis = drawing.append("g")
        .attr("transform", "translate(" + width + ",0)")

    // init path with no data
    var line = d3.line()
        .x(d => dateScale(d.date))
        .y(d => quoteScale(d.close));
    var path = drawing.append("path")
        .attr("class", "stock_quote")
        .attr("d", line([]))

    for (let i = 100; i <= daily_quotes.length; i++) {

        let currentData = daily_quotes.slice(i - 2520 > 0 ? i - 2520 : 0, i);

        dateScale.domain(d3.extent(currentData, d => d.date));
        quoteScale.domain(d3.extent(currentData, d => d.close));

        // Update the path with the current data
        path.datum(currentData)
            .transition()  // Start a transition to animate the line drawing
            .duration(1)  // Duration of each segment's animation
            .attr("d", line);

        // Update the axis
        dateAxis.transition()
            .duration(1)
            .call(d3.axisBottom(dateScale));

        quoteAxis.transition()
            .duration(1)
            .call(d3.axisRight(quoteScale));

        // Wait for the animation to complete before continuing
        await new Promise(resolve => setTimeout(resolve, 1));
    }
}