const container = document.querySelector("#container");

const squareSvg = d3.select("#square");
const rect = squareSvg.append("rect");

rect
  .style("fill", "black") // rect's fill color
  .attr("height", 20) // rect's height (in pixels)
  .attr("width", 20) // rect's width (in pixels)
  .attr("x", 10) // x position of the top-left corner
  .attr("y", 10); // y position of the top-left corner

const squareSvg2 = d3.select("#square2");
const rects = squareSvg2.selectAll("rect");
const data = [0, 1, 2, 3, 4];

rects
  .data(data)
  .join("rect")
  .style("fill", "black")
  .attr("height", 20)
  .attr("width", 20)
  .attr("y", 10)
  .attr("x", (d, i) => {
    return 10 + i * 30;
  });
