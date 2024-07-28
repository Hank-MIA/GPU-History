async function loadSVG2() {
    var height = svg2.node().clientHeight - 2 * margin
    var width = svg2.node().clientWidth - 2 * margin
    cagr = (Math.pow(daily_quotes[daily_quotes.length-1].close / daily_quotes[0].close, 1 / 24.5) - 1) * 100

    var drawing = svg2.append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")");

    drawing.append("text")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .attr("class", "svg2-title")
        .text("Compund Annual Growth Rate: " + cagr.toFixed(0) + "%");

    var dateAxis = d3.scaleTime()
        .domain(d3.extent(daily_quotes, function (d) { return d.date; }))
        .range([0, width]);
    drawing.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(dateAxis))
        .attr('class', 'axis');

    var growthAxis = d3.scaleLinear()
        .domain(d3.extent(annual_quotes, function (d) { return d.growth; }))
        .range([height, 0]);
    var growthAxisGroup = drawing.append("g")
        .attr("transform", "translate(" + width + ",0)")
        .call(d3.axisRight(growthAxis))
        .attr('class', 'axis');

    drawing.selectAll('.tick text').style("font-size", "13px");

    growthAxisGroup.append("text")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", 50)
    .attr("x", -height / 2)
    .attr('class', 'axis_label')
    .text("Annual Growth Rate (%)");

    var tooltip = drawing.append("text")
        .attr("transform", "translate(" + 0 + "," + 40 + ")")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .attr("class", "tooltip")
        .style("opacity", 0);

    drawing.selectAll('.stock_gain')
        .data(annual_quotes)
        .enter()
        .append('rect')
        .attr('x', function (d) { return dateAxis(d.begin); })
        .attr('y', function (d) { return growthAxis(Math.max(0, d.growth)); })
        .attr('width', 0)
        .attr('height', function (d) { return Math.abs(growthAxis(d.growth) - growthAxis(0)); })
        .attr('class', 'stock_gain')
        .attr('fill', d => d.growth >= 0 ? 'green' : '#a10d34')
        .on("mouseover", function (d, i) {
            drawing.selectAll('.stock_gain').filter(function(data, index) { return index === i; })
                .style('filter', 'brightness(200%)')
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.text("Year: " + d.end.getFullYear() + "  Growth: " + d.growth.toFixed(0) + "%")
                .attr("fill", d.growth >= 0 ? 'green' : '#a10d34')
        })
        .on("mouseout", function (d, i) {
            drawing.selectAll('.stock_gain').filter(function(data, index) { return index === i; })
                .style('filter', 'brightness(100%)')
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .transition()
        .duration(3000)
        .attr('width', function (d) { return dateAxis(d.end) - dateAxis(d.begin); });
}