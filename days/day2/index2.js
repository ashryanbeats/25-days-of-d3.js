const [svg, xSlider, ySlider, colorSlider] = [
  "svg",
  "x-slider",
  "y-slider",
  "color-slider",
].map((s) => document.querySelector(`#${s}`));

document.addEventListener("DOMContentLoaded", (e) => {
  updateViz();
});

[xSlider, ySlider, colorSlider].map((el) =>
  el.addEventListener("input", (e) => {
    updateViz();
  })
);

const scales1 = {};

scales1.xSliderScale = d3
  .scaleOrdinal()
  .domain([0, 1, 2, 3, 4])
  .range([10, 40, 70, 100, 130]);
scales1.ySliderScale = d3.scaleLinear().domain([0, 140]).range([10, 130]);
scales1.colorSliderScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range(["#eee", "steelblue"]);

const updateViz = () => {
  d3.select(svg).selectAll("rect").remove();

  d3.select(svg)
    .append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .attr("x", scales1.xSliderScale(xSlider.value))
    .attr("y", scales1.ySliderScale(ySlider.value))
    .style("fill", scales1.colorSliderScale(colorSlider.value));
};
