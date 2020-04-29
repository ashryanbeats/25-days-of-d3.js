const svg = d3.select("#svg");

const USData = [
  { type: "Poultry", value: 48.9954 },
  { type: "Beef", value: 25.9887 },
  { type: "Pig", value: 22.9373 },
  { type: "Sheep", value: 0.4869 },
];

const height = 500;
const width = 500;

const colorScale = (() => {
  const colors = ["#976393", "#685489", "#43457f", "#ff9b83"];

  return d3.scaleOrdinal(
    USData.map((d) => d.type),
    colors
  );
})();

const arc = d3
  .arc()
  // After some trial-and-error, half (0.5) of the full radius gives a nice appearance
  // To see a pie chart, just change this to zero
  .innerRadius((0.5 * height) / 2)
  // Outer radius is less than the full radius because our labels will sit outside of the donut
  .outerRadius((0.85 * height) / 2);

const pie = d3
  .pie()
  // An accessor to tell the pie where to find the data values
  .value((d) => d.value);

const labelArcs = d3
  .arc()
  .innerRadius((0.95 * height) / 2)
  .outerRadius((0.95 * height) / 2);

const pieArcs = pie(USData);

// Append our donut container group
svg
  .append("g")
  .attr("class", "donut-container")
  // The donut arcs will be centered around this point
  .attr("transform", `translate(${width / 2},${height / 2})`)
  .selectAll("path")
  // Our data is the arcs, rather than the data object
  // so that we have access to the arc data for rendering the paths
  .data(pieArcs)
  .join("path")
  .style("stroke", "white")
  .style("stroke-width", 2)
  .style("fill", (d) => colorScale(d.data.type))
  // here we pass the arc generator. Remember, an accessor function
  // receives the data (d) as the first argument, so rather than doing (d) => arc(d)
  // we can just pass it like below. In this case, our data is the arc descriptor object
  // so the d attribute will be set to the arc's path string. Take a minute to let that sink in
  .attr("d", arc);

// The labels container will need the same setup because it uses an arc, as well
const text = svg
  .append("g")
  .attr("class", "labels-container")
  .attr("transform", `translate(${width / 2},${height / 2})`)
  .selectAll("text")
  // We use the data arcs so we have access to the label data
  .data(pieArcs)
  .join("text")
  // We use the label arcs here to get their centroid
  // a centroid is the center point of a shape (in this case the arc)
  // remember that our label arc has the same inner and outer radius
  // so the arc is centered just outside the radius of our donut.
  // Refer back to the labelArcs setup and think about that for a minute!
  .attr("transform", (d) => `translate(${labelArcs.centroid(d)})`)
  .attr("text-anchor", "middle");

// This section explained below
text
  .selectAll("tspan")
  // 1
  .data((d) => [d.data.type, d.data.value.toFixed(1) + " kg"])
  // 2
  .join("tspan")
  .attr("x", 0)
  .style("font-family", "sans-serif")
  .style("font-size", 12)
  .style("font-weight", (d, i) => (i ? undefined : "bold"))
  .style("fill", "#222")
  //3
  .attr("dy", (d, i) => (i ? "1.2em" : 0))
  .text((d) => d);
