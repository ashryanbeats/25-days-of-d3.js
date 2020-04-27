const introDiv = document.querySelector("#creating-a-scale-in-d3");

const getScale = (val) => {
  const dMin = 0,
    dMax = 10;
  const rMin = 0,
    rMax = 100;

  const scale = d3.scaleLinear().domain([dMin, dMax]).range([rMin, rMax]);

  return scale(val);
};

introDiv.innerHTML += `<p>${getScale(6)}</p>`;
