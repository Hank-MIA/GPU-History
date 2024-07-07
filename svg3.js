async function loadSVG3() {
    var height = svg3.node().clientHeight - 2 * margin
    var width = svg3.node().clientWidth - 2 * margin

    var drawing = svg3.append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")");

    var dateAxis = d3.scaleTime()
        .domain(d3.extent(daily_quotes, function (d) { return d.date; }))
        .range([0, width]);
    drawing.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(dateAxis));

    var growthAxis = d3.scaleLinear()
        .domain(d3.extent(annual_quotes, function (d) { return d.growth; }))
        .range([height, 0]);
    drawing.append("g")
        .attr("transform", "translate(" + width + ",0)")
        .call(d3.axisRight(growthAxis))

    drawing.selectAll('.stock_gain')
        .data(annual_quotes)
        .enter()
        .append('rect')
        .attr('x', function (d) { return dateAxis(d.begin); })
        .attr('y', function (d) { return growthAxis(Math.max(0, d.growth)); })
        .attr('width', 0)
        .attr('height', function (d) { return Math.abs(growthAxis(d.growth) - growthAxis(0)); })
        .attr('class', 'stock_gain')
        .attr('fill', d => d.growth >= 0 ? 'green' : 'red')
        .transition()
        .duration(3000)
        .attr('width', function (d) { return dateAxis(d.end) - dateAxis(d.begin); });
}