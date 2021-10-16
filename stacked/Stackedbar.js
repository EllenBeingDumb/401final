// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 50, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const svg2 = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height",50+ margin.top + margin.bottom)
.append("g")
  .attr("transform",`translate(${margin.left},${margin.top})`);
// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

// Parse the Data
d3.csv("https://raw.githubusercontent.com/EllenBeingDumb/401final/main/stackbar_plot_v2.csv").then( function(data) {
  // add selected group

    const allGroup = ["Large", "Medium", "Small"]
        // add the options to the button

    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(d => d) // text showed in the menu
      .attr("value", d => d); // corresponding value returned by the button


    const large = 300000000;
    const scale = d3.scaleOrdinal()
      .domain(allGroup)
      .range([300000000,15000000,885000])

    // List of subgroups = header of the csv files = soil condition here
    const subgroups = data.columns.slice(1,-2)
    const dataFilter = data.filter(function(d){ return d.Scale == "Large" })
    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups = dataFilter.map(d => d.Portfolio)

    // Add X axis
    x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])

    x_axis = svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .attr('font-family','Georgia')
      .style('font-size','10px')
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");
      // .attr("transform","rotate(-90)");

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 500])
      .range([ height, 0 ]);

    svg.append("g")
      .call(d3.axisLeft(y))
      .attr('font-family','Georgia')
      .append("text")
      .attr("transform","rotate(-90)")
      // .attr('stroke','black')
      .attr('font-size',15)
      .attr("dy", ".75em")
      .attr("y", -40)
      .style('fill','black')
      .style("text-anchor", "end")
      .attr('font-family','Georgia')
      .text('Total asset');

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(["#1b4965","#126782","#62b6cb"])

    // stack the data? --> stack per subgroup
    const stackedData = d3.stack()
      .keys(subgroups)
      (dataFilter )
    // ----------------
    // Create a tooltip
    // ----------------
    const tooltip = d3.select("#my_dataviz")
      .append("div")
      .style("opacity", 0.8)
      .attr("class", "tooltip")
      .style("background-color", "grey")
      // .style("border", "solid")
      .style("position", "absolute")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function(event, d) {
      const subgroupName = d3.select(this.parentNode).datum().key;
      const subgroupValue = d.data[subgroupName]/d.data["Total Assets_num"];
      tooltip
        .style('font-size','10px')
        .style('color','white')
          .html("Industry: " + subgroupName + "<br>" + "Share: " + d3.format(".0%")(subgroupValue))
          .style("opacity", 0.7)
    }
    const mousemove = function(event, d) {
      tooltip.style("transform","translateY(-55%)")
             .style("left",(event.pageX)+"px")
             .style("top",(event.pageY)-30+"px")
    }
    const mouseleave = function(event, d) {
      tooltip
        .style("opacity", 0)
    }

    // Show the bars
    chart = svg.append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .join("g")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(d => d)
        .join("rect")
          .attr("x", d => x(d.data.Portfolio))
          .attr("y", d => y(d[1]/large))
          .attr("height", d => y(d[0]/large) - y(d[1]/large))
          .attr("width",x.bandwidth())
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)


    svg2.append('text')
       .attr('x',width/2)
       .attr('y','30')
       .attr('font-size',25)
       .attr('text-anchor','middle')
       .attr('text-align', 'cente')
       .attr('font-family','Georgia')
       .attr('dominant-baseline', 'middle')
       .text('Portfolio Industry Composition');

    const size = 20
    svg.selectAll("myrect")
      .data(subgroups)
      .join("rect")
        .attr("x", 800)
        .attr("y", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d){ return color(d)})

    // Add one dot in the legend for each name.
    svg.selectAll("mylabels")
      .data(subgroups)
      .join("text")
        .attr('font-family','Georgia')
        .attr("x", 800 + size*1.2)
        .attr('font-size',13)
        .attr("y", function(d,i){ return 10 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")









    function update(selectedGroup){
        const subgroups = data.columns.slice(1,-2)
        const new_dataFilter = data.filter(function(d){ return d.Scale == selectedGroup})

        const new_groups = new_dataFilter.map(d => d.Portfolio)

        x.domain(new_groups)
          .range([0, width])
          .padding([0.2])

        x_axis.remove();
        svg.selectAll('g.tick').remove()

        x_axis = svg.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x).tickSizeOuter(0))
          .attr('font-family','Georgia')
          .style('font-size','10px')
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-65)");

        // y = d3.scaleLinear()
        //   .domain([0, 500])
        //   .range([ height, 0 ]);

        svg.append("g")
          .call(d3.axisLeft(y))
          .attr('font-family','Georgia');


        const new_stackedData = d3.stack().keys(subgroups)
            (new_dataFilter )


         chart.remove();

         chart = svg.append('g')
          .selectAll("g")
          // Enter in the stack data = loop key per key = group per group
            .data(new_stackedData)
            .join("g")
              .attr("fill", d => color(d.key))
              .selectAll("rect")
              // enter a second time = loop subgroup per subgroup to add all rectangles
              .data(d => d)
              .join("rect")
                .attr("x", d => x(d.data.Portfolio))
                .attr("y", d => y(d[1]/scale(selectedGroup)))
                .attr("height", d => y(d[0]/scale(selectedGroup)) - y(d[1]/scale(selectedGroup)))
                .attr("width",x.bandwidth())
              .on("mouseover", mouseover)
              .on("mousemove", mousemove)
              .on("mouseleave", mouseleave)
          }

      d3.select("#selectButton").on("change", function(event, d) {
            // recover the option that has been chosen
            let selectedOption = d3.select(this).property("value")
            // run the updateChart function with this selected option
            update(selectedOption)
        })
      // select.on("change", function(event, d) {
      //       // recover the option that has been chosen
      //       let selectedOption = d3.select("select").property("value")
      //       // run the updateChart function with this selected option
      //       update(selectedOption)
      //   })

  })
