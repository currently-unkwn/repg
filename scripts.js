import "./smoothscroll.min.js";

// Max Lifts:
//     Bench Press: 75
//     Deadlift:
//     Barbell Squat:

// Warm-Up Sets: Bar, 50%, 60%
// Reps: 10, 5, 3

// Week 1: 72.5%, 77.5%, 82.5%
// Reps: 8, 6, 4*

// Week 2: 75%, 80%, 85%
// Reps: 7, 5, 3

// Week 3: 77.5%, 82.5%, 90%
// Reps: 6, 4, 2

// Week 4: 80%, 85%, 95%
// Reps: 5, 3, 1

// Week 5: 50%, 60%
// Reps: 5, 5

// Week 6: 72.5%, 77.5%, 82.5%
// Reps: 8, 6, 4*

// Week 7: 75%, 80%, 85%
// Reps: 7, 5, 3

// Week 8: 77.5%, 82.5%, 90%
// Reps: 6, 4, 2

// Week 9: 80%, 85%, 95%
// Reps: 5, 3, 1

// Week 10: 50%, 60%
// Reps: 5, 5

// Week 11:  80%, 87.5%, 92.5%, 102%, 104%, 106% ... etc
// Reps: 4, 2, 1, 1, 1, 1 ... 1

// * or more for bench press

// const BENCH_PRESS_MAX = prompt("Barbell Bench Press Max:  ");
// const DEADLIFT_MAX = prompt("Deadlift Max:  ");

// const BENCH_PRESS_MAX = 75;
// const DEADLIFT_MAX = 85;
// const SQUAT_MAX = 65;

const week1 = {
  id: 1,
  percentages: [72.5, 77.5, 82.5],
  reps: [8, 6, 4],
};

const week2 = {
  id: 2,
  percentages: [75, 80, 85],
  reps: [7, 5, 3],
};

const week3 = {
  id: 3,
  percentages: [77.5, 82.5, 90],
  reps: [6, 4, 2],
};

const week4 = {
  id: 4,
  percentages: [80, 85, 95],
  reps: [5, 3, 1],
};

const week5 = {
  id: 5,
  percentages: [50, 60],
  reps: [5, 5],
};

const week11 = {
  id: 11,
  percentages: [80, 87.5, 92.5, 102, 104, 106],
  reps: [4, 2, 1, 1, 1, 1],
};

const weeks = [week1, week2, week3, week4, week5, week11];

//  Calculate weights for barbell, deadlifts and squats
// E.g:

// Your max:
//  Bench Press: 75kg
//  Deadlift: 85kg
//  Barbell Squat: 65kg

// Week 1:

//  Barbell Bench Press:
//      Your max: 75kg
//      (72.5%) 54.3kg — 8 reps
//      (77.5%) 58.1kg — 6 reps
//      (82.5%) 61.8kg — 4 or more reps

//  Deadlifts:
//      Your max: 85kg
//      (72.5%) 61.6kg — 8 reps
//      (77.5%) 65.8kg — 6 reps
//      (82.5%) 70.1kg — 4

//  Barbell Squats:
//      Your max: 65kg
//      (72.5%) 47.1kg — 8 reps
//      (77.5%) 50.3kg — 6 reps
//      (82.5%) 53.6kg — 4

/**
 * *************************************************************
 */

const lifts = document.querySelector("#lifts");
const form = document.querySelector("form[data-max-numbers]");
const firstInput = form.querySelector("input");
const clearBtn = form.querySelector("[data-clear]");

const KEY = "LIFTS";

// Set focus on 1st input on load
firstInput.focus();

/**
 * Get saved html from localStorage and render it on the page
 */
function init() {
  const saved = localStorage.getItem(KEY);

  if (!saved) return;

  clearBtn.style.display = "none";
  lifts.innerHTML = saved;
}

/**
 * Calculates weight numbers from percentages
 * @param {Array} percentagesArr
 * @param {Number} maxWeight
 * @returns {Array} New array with weight numbers
 */
function calcWeights(percentagesArr, maxWeight) {
  // Convert  percentages into weight numbers
  return percentagesArr.map((percentage) => (percentage / 100) * maxWeight);
}

/**
 * Calcs and sets weights and max lift numbers
 * @param {Array} weeksArr
 * @param {Object} maxWeights
 * @returns {Array} New updated array with weights and max numbers
 */
function updateWeeks(weeksArr, maxWeights) {
  // Get maxes
  const { benchPressMax, squatMax, deadliftMax } = maxWeights;

  // Set exercise weights and max numbers as properties on each week
  return weeksArr.map((week) => {
    return {
      ...week,
      weightsBenchPress: calcWeights(week.percentages, benchPressMax),
      weightsDeadlifts: calcWeights(week.percentages, deadliftMax),
      weightsBarbellSquats: calcWeights(week.percentages, squatMax),
      benchPressMax,
      squatMax,
      deadliftMax,
    };
  });
}

/**
 * Html markup for a single exercise
 * @param {Object} args Object with properties
 * @returns {HTMLElement} Html markup for a single exercise
 */
function renderLift(args) {
  const { title, maxWeight, weights, week } = args;

  const isBenchPress = title === "Barbell Bench Press";
  const lastRep = week.reps[week.reps.length - 1];
  const isNotWeek5And11 = week.id !== 5 && week.id !== 11;

  return `
      <article class="lift">
        <h3 class="exercise" data-exercise>${title}</h3>
        <div class="max">Your max: <span data-max-lift>${maxWeight}kg</span></div>

        <table>
          <thead>
            <tr>
              <th>Sets</th>
              <th>Weights</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            ${weights
              .map((weight, index) => {
                return `
                  <tr>
                    <td class="set">${index + 1}</td>
                    <td class="weight">
                      <div class="weight-number">
                        <span class="weight-percentage">${
                          week.percentages[index]
                        }%</span>
                        ${weight.toFixed(1)}kg
                      </div>
                    </td>
                    <td class="rep">${
                      isBenchPress &&
                      week.reps[index] === lastRep &&
                      isNotWeek5And11
                        ? week.reps[index] + " and more"
                        : week.reps[index]
                    }</td>
                  </tr>
              `;
              })
              .join("")}
          </tbody>
        </table>
    </article>
  `;
}

/**
 * Html for all exercises in a week
 * @param {Object} week
 * @returns {HTMLElement} Html markup for lift content
 */
function renderLiftContent(week) {
  const barbellBenchPressHtml = renderLift({
    title: "Barbell Bench Press",
    maxWeight: week.benchPressMax,
    weights: week.weightsBenchPress,
    week,
  });

  const barbellSquatHtml = renderLift({
    title: "Barbell Squat",
    maxWeight: week.squatMax,
    weights: week.weightsBarbellSquats,
    week,
  });

  const deadliftsHtml = renderLift({
    title: "Deadlifts",
    maxWeight: week.deadliftMax,
    weights: week.weightsDeadlifts,
    week,
  });

  return `
    <div class="lift-content">
      <div class="lift-week">Week ${week.id}</div>
      ${barbellBenchPressHtml}
      ${barbellSquatHtml}
      ${deadliftsHtml}
    </div>
  `;
}

/**
 * Calculates and shows lift content on a page
 * @param {Object} event object
 */
function handleSubmit(event) {
  event.preventDefault();

  // Get max lifts from form
  let { benchPressMax, squatMax, deadliftMax } = Object.fromEntries(
    new FormData(event.target)
  );

  // If no value do nothing
  if (!benchPressMax || !squatMax || !deadliftMax) return;

  // Convert values into a number
  benchPressMax = parseFloat(benchPressMax);
  squatMax = parseFloat(squatMax);
  deadliftMax = parseFloat(deadliftMax);

  // Set weights properties
  const updatedWeeks = updateWeeks(weeks, {
    benchPressMax,
    squatMax,
    deadliftMax,
  });

  // Render lifts content
  const html = updatedWeeks.map((week) => renderLiftContent(week)).join("");
  lifts.innerHTML = html;

  // Save lifts content to localStorage
  localStorage.setItem(KEY, html);

  // Reset input values
  form.querySelectorAll("input").forEach((input) => (input.value = 0));

  // Scroll to lifts section
  lifts.scrollIntoView({ behavior: "smooth" });

  clearBtn.style.display = "block";
}

function handleClick(event) {
  event.preventDefault();

  lifts.innerHTML = "Type your max numbers and press 'Generate'.";
  localStorage.removeItem(KEY);

  firstInput.focus();

  clearBtn.style.display = "none";
}

init();
form.addEventListener("submit", handleSubmit);
clearBtn.addEventListener("click", handleClick);
