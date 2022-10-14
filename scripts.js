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

const BENCH_PRESS_MAX = 75;
const DEADLIFT_MAX = 85;
const SQUAT_MAX = 65;

const Week1 = {
  weekNumber: "Week 1",
  percentages: [72.5, 77.5, 82.5],
  reps: [8, 6, 4],
};

const Week2 = {
  weekNumber: "Week 2",
  percentages: [75, 80, 85],
  reps: [7, 5, 3],
};

const Week3 = {
  weekNumber: "Week 3",
  percentages: [77.5, 82.5, 90],
  reps: [6, 4, 2],
};

const Week4 = {
  weekNumber: "Week 4",
  percentages: [80, 85, 90],
  reps: [5, 3, 1],
};

const Week5 = {
  weekNumber: "Week 5",
  percentages: [50, 60],
  reps: [5, 5],
};

const Week11 = {
  weekNumber: "Week 11",
  percentages: [80, 87.5, 92.5, 102, 104, 106],
  reps: [4, 2, 1, 1, 1, 1],
};

const Weeks = [Week1, Week2, Week3, Week4, Week5, Week11];

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

const calcWeights = function (percentagesArr, maxWeight) {
  return percentagesArr.map((percentage) => (percentage / 100) * maxWeight);
};

const setWeights = function (weeksArr) {
  weeksArr.forEach((week) => {
    week.weightsBenchPress = calcWeights(week.percentages, BENCH_PRESS_MAX);
    week.weightsDeadlifts = calcWeights(week.percentages, DEADLIFT_MAX);
    week.weightsBarbellSquats = calcWeights(week.percentages, SQUAT_MAX);
  });
};

setWeights(Weeks);

const printOutput = function () {};

const exerciseWeightsAndRepsInAWeekOutput = function (
  week,
  exercise,
  maxWeight
) {
  let output = "";

  week.percentages.map((percentage, index) => {
    output += `${index + 1} set — (${percentage}%) ${exercise[index]}kg - ${
      week.reps[index]
    } reps \n`;
  });

  return `Your max: ${maxWeight}kg \n${output}`;
};

const printAllExercisesWeightsAndRepsInAWeek = function (week) {
  const benchPressOutput = exerciseWeightsAndRepsInAWeekOutput(
    week,
    week.weightsBenchPress,
    BENCH_PRESS_MAX
  );

  const deadliftOutput = exerciseWeightsAndRepsInAWeekOutput(
    week,
    week.weightsDeadlifts,
    DEADLIFT_MAX
  );

  const barbellSquatOutput = exerciseWeightsAndRepsInAWeekOutput(
    week,
    week.weightsBarbellSquats,
    SQUAT_MAX
  );

  const output = `${week.weekNumber} \nBarbell Bench Press: \n${benchPressOutput} \nDeadlifts: \n${deadliftOutput} \nBarbell Squats: \n${barbellSquatOutput}`;

  return output;
};

const printTotalWeightsAndReps = function (weeksArr) {
  return weeksArr.forEach((week) =>
    console.log(printAllExercisesWeightsAndRepsInAWeek(week))
  );
};

printTotalWeightsAndReps(Weeks);
