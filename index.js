const numberOfDays = 25;
const daysList = document.querySelector("#days-list");

for (let i = 1; i < numberOfDays; i++) {
  daysList.innerHTML += `<li><a href="days/day${i}">Day ${i}</a></li>`;
}
