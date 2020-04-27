const squareSvg = d3.select("#square");
const rects = squareSvg.selectAll("rect");
const data = [0, 1, 2, 3, 4];
const maxHeight = 140;

const scales2 = {};

scales2.xScale = d3.scaleOrdinal().domain(data).range([10, 40, 70, 100, 130]);
scales2.yScale = d3.scaleLinear().domain([0, 4]).range([10, maxHeight]);
scales2.colorScale = d3
  .scaleLinear()
  .domain([0, 4])
  .range(["#eee", "steelblue"]);

squareSvg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("width", 20)
  .attr("y", 10)
  .attr("x", (d) => scales2.xScale(d))
  .attr("height", (d) => scales2.yScale(d))
  .style("fill", (d) => scales2.colorScale(d));
