async function loadSVG3() {
    var height = svg3.node().clientHeight - 2 * margin
    var width = svg3.node().clientWidth - 2 * margin

    var drawing = svg3.append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")");

    // init scales and axis positions
    var dateScale = d3.scaleTime()
        .range([0, width]);
    var dateAxis = drawing.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr('class', 'axis');

    var quoteScale = d3.scaleLinear()
        .range([height, 0]);
    var quoteAxis = drawing.append("g")
        .attr("transform", "translate(" + width + ",0)")
        .attr('class', 'axis');
    
    quoteAxis.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", 60)
        .attr("x", -height / 2)
        .attr('class', 'axis_label')
        .text("Adjusted Stock Price (%)");

    // init path with no data
    var area = d3.area()
        .x(d => dateScale(d.date))
        .y0(height)
        .y1(d => quoteScale(d.close));
    var path = drawing.append("path")
        .attr("class", "stock_quote")
        .attr("d", area([]))

    for (let i = 100; i <= daily_quotes.length; i++) {
        let currentData = daily_quotes.slice(i - 1260 > 0 ? i - 1260 : 0, i);

        dateScale.domain(d3.extent(currentData, d => d.date));
        quoteScale.domain(d3.extent(currentData, d => d.close));

        // Update the path with the current data
        path.datum(currentData)
            .transition()  // Start a transition to animate the area drawing
            .duration(1)  // Duration of each segment's animation
            .attr("d", area);

        // Update the axis
        dateAxis.transition()
            .duration(1)
            .call(d3.axisBottom(dateScale));

        quoteAxis.transition()
            .duration(1)
            .call(d3.axisRight(quoteScale));

        drawing.selectAll('.tick text').style("font-size", "13px");
    
        // Wait for the animation to complete before continuing
        await new Promise(resolve => setTimeout(resolve, 1));
    }
}