const svg = d3.select("#svg");

const data = [
  { year: 2005, value: 734.69 },
  { year: 2006, value: 750.7 },
  { year: 2007, value: 755.13 },
  { year: 2008, value: 694.19 },
  { year: 2009, value: 681.83 },
  { year: 2010, value: 718.98 },
  { year: 2011, value: 740.57 },
  { year: 2012, value: 752.24 },
  { year: 2013, value: 767.24 },
  { year: 2014, value: 802.45 },
  { year: 2015, value: 805.65 },
  { year: 2016, value: 935.58 },
  { year: 2017, value: 967.13 },
  { year: 2018, value: 1007.24 },
];

const height = 500;
const width = 900;
const margin = { top: 10, right: 10, bottom: 20, left: 35 };
const yMax = d3.max(data, (d) => d.value);
const xDomain = data.map((d) => d.year);

const xScale = d3
  .scaleBand()
  .domain(xDomain)
  .range([margin.left, width - margin.right - margin.left])
  .padding(0.5);
const yScale = d3
  .scaleLinear()
  .domain([0, yMax])
  .range([height - margin.bottom, margin.top]);

const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

svg
  .append("g")
  .attr("class", "bars")
  .selectAll("rect")
  .data(data)
  .join("rect")
  .attr("class", "bar")
  .attr("x", (d) => xScale(d.year))
  .attr("y", (d) => yScale(d.value))
  // bandwidth is a special function of scaleBand
  // it returns the width of the band (bar) based on the configuration
  // we set up earlier
  .attr("width", xScale.bandwidth())
  // remember that yScale(0) is the height of the entire chart
  // so we subtract the y position of the top of the bar yScale(d.value)
  // from it to get the total height of the bar.
  .attr("height", (d) => yScale(0) - yScale(d.value))
  .style("fill", "#7472c0");

// Here we render the x axis
svg
  .append("g")
  .attr("class", "x-axis")
  // First set its container's (g) position to the
  // bottom of the chart
  .attr("transform", `translate(0,${height - margin.bottom})`)
  // then just call this to render it
  .call(xAxis);

// it works the same for the y axis
svg
  .append("g")
  .attr("class", "y-axis")
  .attr("transform", `translate(${margin.left},0)`)
  .call(yAxis);
