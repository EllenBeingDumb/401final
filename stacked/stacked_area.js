// set the dimensions and margins of the graph
const margin = {top: 60, right: 400, bottom: 50, left: 50},
    width = 1300 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg2 = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", 100)
  .append("g")
    .attr("transform",
          `translate(${margin.left}, ${margin.top})`);

const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left}, ${margin.top})`);

svg2.append('text')
       .attr('x',width/2)
       .attr('y','20')
       .attr('font-size',25)
       .attr('text-anchor','middle')
       .attr('text-align', 'cente')
       .attr('font-family','Georgia')
       .attr('dominant-baseline', 'middle')
       .text('Stock Closing Price Trend');

// Parse the Data
d3.csv("https://raw.githubusercontent.com/EllenBeingDumb/401final/main/stock_close_2_year_data.csv",function(d){
    return { Date : d3.timeParse("%Y-%m-%d")(d.Date),
    GOOGL: +d.GOOGL,
    AAPL: +d.AAPL,
    LLY: +d.LLY,
    MSFT: +d.MSFT,
    AMZN: +d.AMZN,
    FB: +d.FB,
    BRK_B: +d.BRK_B,
    FCX: +d.FCX,
    GS: +d.GS,
    MSCI: +d.MSCI}
  }).then(function(data) {
  //////////
  // GENERAL //
  //////////
  // List of groups = header of the csv files
  const keys = data.columns.slice(1)

  // color palette
  const color = d3.scaleOrdinal()
    .domain(keys)
    // .range(d3.schemeTableau10);
    .range(["#1e6091","#168aad","#95cabc","#b5d8c5","#d9e3a5","#cbe3b1","#a7d49b","#8dccaa","#566b65","#4b4f59"])
    // .range(["#1b4965","#126782","#219ebc","#8ecae6","#62b6cb","#35596c","#83c5be","#2ec4b6","#0a9396","#006d77"])


  //stack the data?
  const stackedData = d3.stack()
    .keys(keys)
    (data)
// console.log(stackedData)


  //////////
  // AXIS //
  //////////
  // Add X axis
  const x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.Date; }))
    .range([ 0, width ]);

  const xAxis = svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).ticks(5))
    .attr('font-family','Georgia')

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width/2)
      .attr("y", height+35 )
      .text("Time (Year/Month/Day)")
      .attr('font-family','Georgia');

  // Add Y axis label:
  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform","rotate(-90)")
      .attr("x", -80)
      .attr("y", 20)
      .text("Closing Price")
      .attr("text-anchor", "start")
      .attr('font-family','Georgia')

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 8000])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y).ticks(5))
    .attr('font-family','Georgia')



  //////////
  // BRUSHING AND CHART //
  //////////

  // Add a clipPath: everything out of this area won't be drawn.
  const clip = svg.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width )
      .attr("height", height )
      .attr("x", 0)
      .attr("y", 0);

  // Add brushing
  const brush = d3.brushX()                 // Add the brush feature using the d3.brush function
      .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

  // Create the scatter variable: where both the circles and the brush take place
  const areaChart = svg.append('g')
    .attr("clip-path", "url(#clip)")

  // Area generator
  const area = d3.area()
    .x(function(d) { return x(d.data.Date); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); })

  // Show the areas
  areaChart
    .selectAll("mylayers")
    .data(stackedData)
    .join("path")
      .attr("class", function(d) { return "myArea " + d.key })
      .style("fill", function(d) { return color(d.key); })
      .style('opacity',1)
      .attr("d", area)

  // Add the brushing
  areaChart
    .append("g")
      .attr("class", "brush")
      .call(brush);

  let idleTimeout
  function idled() { idleTimeout = null; }

  // A function that update the chart for given boundaries
  function updateChart(event,d) {

    extent = event.selection

    // If no selection, back to initial coordinate. Otherwise, update X axis domain
    if(!extent){
      if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
      x.domain(d3.extent(data, function(d) { return d.Date; }))
    }else{
      x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
      areaChart.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
    }

    // Update axis and area position
    xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5))
    areaChart
      .selectAll("path")
      .transition().duration(1000)
      .attr("d", area)
    }



    //////////
    // HIGHLIGHT GROUP //
    //////////

    // What to do when one group is hovered
    const highlight = function(event,d){
      d3.selectAll(".mybox").style("opacity", .1)
      d3.select(".mybox."+d).style("opacity", 1)

      // reduce opacity of all groups
      // rect.attr('stroke',"black");
      d3.selectAll(".myArea").style("opacity", .1)
      // expect the one that is hovered
      d3.select("."+d).style("opacity", 1)
    }

    // And when it is not hovered anymore
    const noHighlight = function(event,d){
      // rect.attr('stroke','white');
      d3.selectAll(".mybox").style("opacity", 1)
      d3.selectAll(".myArea").style("opacity", 1)
    }



    //////////
    // LEGEND //
    //////////

    // Add one dot in the legend for each name.
    const size = 20
    const rect = svg.selectAll("myrect")
      .data(keys)
      .join("rect")
        .attr("class", function(d) { return "mybox " + d })
        .attr("x", 1.04*width)
        .attr("y", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d){ return color(d)})
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

    // Add one dot in the legend for each name.
    svg.selectAll("mylabels")
      .data(keys)
      .join("text")
        .attr("x", 1.04*width + size*1.2)
        .attr('font-size',13)
        .attr("y", function(d,i){ return 10 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

})
