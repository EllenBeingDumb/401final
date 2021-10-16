var width = height = 100, // % of the parent element

	x = d3.scaleLinear().domain([0, width]).range([0, width]),
  y = d3.scaleLinear().domain([0, height]).range([0, height]),

	color = d3.scaleOrdinal()
		.range(["#0a9396","#35596c","#006d77", "#0a9396", "#1b4965", "#126782","#219ebc","#8ecae6","#83c5be","#2ec4b6",]
			.map(function(c) {
				c = d3.rgb(c);
				//c.opacity = 0.5;
				return c;
			})
		),

	treemap = d3.treemap()
    	.size([width, height])
		  // .tile(d3.treemapResquarify) // doesn't work - height & width is 100%
    	.paddingInner(0)
    	.round(false), //true

data = {
	"name": "Portfolio",
	"children": [
		{
			"name": "Large Portfolio",
			"children": [
				{
					"name": "5-Star Portfolio",
					"children": [
						{"name":"Fidelity® 500 Index Fund","value":"Total Asset: 350.3 Billion"},
						{"name":"Vanguard Institutional Index Fund","value":"Total Asset: 281.3 Billion"},
						{"name":"Parnassus Core Equity Fund","value":"Total Asset: 29.6 Billion"},
						{"name":"JPMorgan US Equity Fund","value":"Total Asset: 20.6 Billion"},
						{"name":"Vanguard Tax-Managed Capital App Fund","value":"Total Asset: 16.7 Billion"},
						{"name":"Vanguard FTSE Social Index Fund","value":"Total Asset: 14.6 Billion"},
						{"name":"Hartford Core Equity Fund","value":"Total Asset: 12.2 Billion"},
						{"name":"Jensen Quality Growth Fund","value":"Total Asset: 10.1 Billion"}
					]
				},
				{
					"name": "4-Star Portfolio",
					"children": [
						{"name":"Vanguard Total Stock Market Index Fund","value":"Total Asset: 268.5 Billion"},
						{"name":"Vanguard 500 Index Fund","value":"Total Asset: 252.9 Billion"},
						{"name":"Vanguard PrimeCap Fund","value":"Total Asset: 73.9 Billion"},
						{"name":"Fidelity® Total Market Index Fund","value":"Total Asset: 70.6 Billion"},
						{"name":"Schwab® S&P 500 Index Fund","value":"Total Asset: 63.5 Billion"},
						{"name":"Strategic Advisers® Large Cap","value":"Total Asset: 59.4 Billion"},
						{"name":"Vanguard Instl Total Stock Market Idx Fd","value":"Total Asset: 34.8 Billion"},
						{"name":"TIAA-CREF Equity Index Fund","value":"Total Asset: 33.6 Billion"},
						{"name":"T. Rowe Price Equity Index 500 Fund","value":"Total Asset: 33.1 Billion"},
						{"name":"iShares S&P 500 Index Fund","value":"Total Asset: 31.3 Billion"},
						{"name":"Schwab Total Stock Market Index Fund®","value":"Total Asset: 17.3 Billion"},
						{"name":"Fidelity® SAI US Large Cap Index Fund","value":"Total Asset: 15.5 Billion"},
						{"name":"Schwab 1000 Index® Fund","value":"Total Asset: 13.6 Billion"},
						{"name":"Northern Stock Index Fund","value":"Total Asset: 12.0 Billion"},
						{"name":"DFA US Large Company Portfolio","value":"Total Asset: 11.7 Billion"},
						{"name":"USAA 500 Index Fund","value":"Total Asset: 10.3 Billion"}
					]
				}
			]
		},
		{
			"name": "Medium Portfolio",
			"children": [
				{
					"name": "5-Star Portfolio",
					"children": [
						{"name":"GMO Quality Fund","value":"Total Asset: 8.9 Billion"},
						{"name":"T. Rowe Price U.S. Equity Research Fund","value":"Total Asset: 8 Billion"},
						{"name":"State Street US Core Equity Fund","value":"Total Asset: 6.9 Billion"},
						{"name":"Calvert US Large Cap Core Rspnb Idx Fd","value":"Total Asset: 4.7 Billion"},
						{"name":"Putnam Multi-Cap Core Fund","value":"Total Asset: 3.5 Billion"},
						{"name":"Hartford Disciplined Equity HLS Fund","value":"Total Asset: 3.3 Billion"},
						{"name":"Touchstone Large Cap Focused Fund","value":"Total Asset: 3.2 Billion"},
						{"name":"SEI Large Cap Index (SIIT) Fund","value":"Total Asset: 2.3 Billion"},
						{"name":"CIBC Atlas Disciplined Equity Fund","value":"Total Asset: 1.7 Billion"},
						{"name":"Nationwide Mellon Dynamic U.S. Core Fund","value":"Total Asset: 1.4 Billion"},
						{"name":"Goldman Sachs Capital Growth Fund","value":"Total Asset: 1.2 Billion"},
						{"name":"Voya Russell Large Cap Index Port","value":"Total Asset: 1.2 Billion"},
						{"name":"HCM Tactical Growth Fund","value":"Total Asset: 1.1 Billion"},
						{"name":"Natixis US Equity Opportunities Fund","value":"Total Asset: 1.1 Billion"}
					]
				},
				{
					"name": "4-Star Portfolio",
					"children": [
						{"name":"TIAA-CREF S&P 500 Index Fund","value":"Total Asset: 8.1 Billion"},
						{"name":"Voya US Stock Index Port","value":"Total Asset: 7.9 Billion"},
						{"name":"Pioneer Fd","value":"Total Asset: 7.8 Billion"},
						{"name":"JPMorgan Equity Index Fund","value":"Total Asset: 7.8 Billion"},
						{"name":"TIAA-CREF Social Choice Eq Fund","value":"Total Asset: 7.2 Billion"},
						{"name":"MFS Core Equity Fund","value":"Total Asset: 5.9 Billion"},
						{"name":"SEI S&P 500 Index(SIIT) Fund","value":"Total Asset: 5.7 Billion"},
						{"name":"DFA US Sustainability Core 1 Portfolio","value":"Total Asset: 5.4 Billion"},
						{"name":"JPMorgan US Research Enhanced Equity Fd","value":"Total Asset: 5.4 Billion"},
						{"name":"Mutual of America Equity Index Fund","value":"Total Asset: 4.6 Billion"},
						{"name":"Fidelity® Series All-Sector Equity Fund","value":"Total Asset: 3.8 Billion"},
						{"name":"Columbia Large Cap Index Fund","value":"Total Asset: 3.7 Billion"},
						{"name":"American Century Sustainable Equity Fund","value":"Total Asset: 3.6 Billion"},
						{"name":"GuideStone Funds Equity Index Fund","value":"Total Asset: 3.1 Billion"},
						{"name":"BNY Mellon Instl S&P 500 Stk Idx Fd","value":"Total Asset: 3.1 Billion"},
						{"name":"JPMorgan US Large Cap Core Plus Fund","value":"Total Asset: 2.6 Billion"},
						{"name":"BNY Mellon Appreciation Fund","value":"Total Asset: 2.5 Billion"},
						{"name":"PIMCO StocksPLUS® Absolute Return Fund","value":"Total Asset: 2.4 Billion"},
						{"name":"State Street S&P 500 Index Fund","value":"Total Asset: 1.6 Billion"},
						{"name":"Fidelity® Large Cap Core Enhanced Idx Fd","value":"Total Asset: 1.4 Billion"},
						{"name":"Columbia Select Large Cap Equity Fund","value":"Total Asset: 1.4 Billion"},
						{"name":"Nationwide Fund","value":"Total Asset: 1.3 Billion"}
					]
				},
				{
					"name": "3-Star Portfolio",
					"children": [
						{"name":"JHancock Fundamental Large Cap Core Fund","value":"Total Asset: 6.0 Billion"},
						{"name":"BlackRock Advantage Large Cap Core Fund","value":"Total Asset: 3.4 Billion"},
						{"name":"Pioneer Core Equity Fund","value":"Total Asset: 2.1 Billion"},
						{"name":"Vulcan Value Partners Fund","value":"Total Asset: 2.0 Billion"},
						{"name":"Mercer US Large Cap Equity Fund","value":"Total Asset: 1.6 Billion"}
					]
				}
			]
		},
		{
			"name": "Small Portfolio",
			"children": [
				{
					"name": "5-Star Portfolio",
					"children": [
						{"name":"State Street Instl US Equity Fund","value":"Total Asset: 582.1 Million"},
						{"name":"YCG Enhanced Fund","value":"Total Asset: 529.3 Million"},
						{"name":"BlackRock Advantage ESG US Equity Fd","value":"Total Asset: 507.8 Million"},
						{"name":"Putnam Research Fund","value":"Total Asset: 476.4 Million"},
						{"name":"Johnson Enhanced Return Fund","value":"Total Asset: 315.5 Million"},
						{"name":"Pear Tree Quality Fund","value":"Total Asset: 215.3 Million"},
						{"name":"JPMorgan U.S. Sustainable Leaders Fd","value":"Total Asset: 143.7 Million"},
						{"name":"Sarofim Equity Fund","value":"Total Asset: 124.9 Million"},
						{"name":"Christopher Weil & Co Core Investment Fd","value":"Total Asset: 73.8 Million"},
						{"name":"ClearBridge Sustainability Leaders Fund","value":"Total Asset: 68.8 Million"}
					]
				},
				{
					"name": "4-Star Portfolio",
					"children": [
						{"name":"TIAA-CREF Social Choice LwCrbn Eq Fd","value":"Total Asset: 984.8 Million"},
						{"name":"PGIM QMA Stock Index Fund","value":"Total Asset: 884.9 Million"},
						{"name":"iShares Russell 1000 Large-Cap Index Fd","value":"Total Asset: 751.9 Million"},
						{"name":"VALIC Company I Systematic Core Fund","value":"Total Asset: 689.3 Million"},
						{"name":"Wilmington Large-Cap Strategy Fund","value":"Total Asset: 638.7 Million"},
						{"name":"DWS Equity 500 Index Fund","value":"Total Asset: 617.0 Million"},
						{"name":"BNY Mellon Sustainable US Equity Fd","value":"Total Asset: 547.9 Million"},
						{"name":"Federated Hermes MDT All Cap Core Fund","value":"Total Asset: 446 Million"},
						{"name":"DFA Enhanced US Large Company Port","value":"Total Asset: 410.1 Million"},
						{"name":"Natixis Vaughan Nelson Select Fund","value":"Total Asset: 227.4 Million"},
						{"name":"JHancock ESG Large Cap Core Fd","value":"Total Asset: 181.1 Million"},
						{"name":"JHancock Fundamental All Cap Core Fund","value":"Total Asset: 164.3 Million"},
						{"name":"BNY Mellon Tax Managed Growth Fd","value":"Total Asset: 150.9 Million"},
						{"name":"Meehan Focus Fund","value":"Total Asset: 102.8 Million"},
						{"name":"Morgan Stanley Instl US Core Portfolio","value":"Total Asset: 82 Million"},
						{"name":"Goldman Sachs U.S. Equity ESG Fund","value":"Total Asset: 21 Million"}
					]
				},
				{
					"name": "3-Star Portfolio",
					"children": [
						{"name":"BNY Mellon Tx-Snstv Lg Cp Mlt-Strat Fd","value":"Total Asset: 480.7 Million"},
						{"name":"Payson Total Return Fund","value":"Total Asset: 211 Million"},
						{"name":"Permanent Portfolio Aggressive Gr Port","value":"Total Asset: 39.3 Million"}
					]
				},
				{
					"name": "2-Star Portfolio",
					"children": [
						{ "name": "Matthew 25 Fund", "value": "Total Asset: 364.9 Million" }
					]
				}
			]
		}
	]
},

	nodes = d3.hierarchy(data)
		.sum(function(d) { return d.value ? 1 : 0; }),
		//.sort(function(a, b) { return b.height - a.height || b.value - a.value });

	currentDepth;

treemap(nodes);

// var svg2 = d3.select("#chart")
// 					// .append("g")
// 					.attr("width", width)
// 					.attr("height", 20);
var svg = d3.select("#chart")
						// .append("g")
						.attr("width", width)
						.attr("height", height);

//
// svg.append('text')
//        .attr('x', width/2)
//        .attr('y', 0)
//        .attr('font-size', 25)
//        .attr('text-anchor','middle')
//        .attr('text-align', 'cente')
//        .attr('font-family','Georgia')
// 			 .attr("stroke", 'black')
//        .attr('dominant-baseline', 'middle')
//        .text('Portfolio Industry Composition');


// var chart = d3.select("#chart");
var chart = svg.append('g');

// svg2.append('text')
//        .attr('x', width/2)
//        .attr('y', 0)
//        .attr('font-size', 25)
//        .attr('text-anchor','middle')
//        .attr('text-align', 'center')
//        .attr('font-family','Georgia')
// 			 .attr("stroke", 'black')
//        .attr('dominant-baseline', 'middle')
//        .text('Portfolio Industry Composition');

var cells = chart
	.selectAll(".node")
	.data(nodes.descendants())
	.enter()
	.append("div")
	.attr("class", function(d) { return "node level-" + d.depth; })
	.attr("title", function(d) { return d.data.value ? d.data.value : d.data.name; });

cells
	.style("left", function(d) { return x(d.x0) + "%"; })
	.style("top", function(d) { return y(d.y0) + "%"; })
	.style("width", function(d) { return x(d.x1) - x(d.x0) + "%"; })
	.style("height", function(d) { return y(d.y1) - y(d.y0) + "%"; })
	//.style("background-image", function(d) { return d.value ? imgUrl + d.value : ""; })
	//.style("background-image", function(d) { return d.value ? "url(http://placekitten.com/g/300/300)" : "none"; })
	.style("background-color", function(d) { while (d.depth > 3) d = d.parent; return color(d.data.name); })
	.on("click", zoom)
	.append("p")
	.attr("class", "label")
	.text(function(d) { return d.data.name ? d.data.name : "---"; });
	//.style("font-size", "")
	//.style("opacity", function(d) { return isOverflowed( d.parent ) ? 1 : 0; });

var parent = d3.select(".up")
	.datum(nodes)
	.on("click", zoom);

function zoom(d) { // http://jsfiddle.net/ramnathv/amszcymq/

	console.log('clicked: ' + d.data.name + ', depth: ' + d.depth);

	currentDepth = d.depth;
	parent.datum(d.parent || nodes);

	x.domain([d.x0, d.x1]);
	y.domain([d.y0, d.y1]);

	var t = d3.transition()
    	.duration(800)
    	.ease(d3.easeCubicOut);

	cells
		.transition(t)
		.style("left", function(d) { return x(d.x0) + "%"; })
		.style("top", function(d) { return y(d.y0) + "%"; })
		.style("width", function(d) { return x(d.x1) - x(d.x0) + "%"; })
		.style("height", function(d) { return y(d.y1) - y(d.y0) + "%"; });

	cells // hide this depth and above
		.filter(function(d) { return d.ancestors(); })
		.classed("hide", function(d) { return d.children ? true : false });

	cells // show this depth + 1 and below
		.filter(function(d) { return d.depth > currentDepth; })
		.classed("hide", false);

}
