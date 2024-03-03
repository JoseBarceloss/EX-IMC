function calculateBMI(weight, height) {
    return weight / (height ** 2);
}

const readlineSync = require('readline-sync');

function handleBMI() {
    const weight = readlineSync.questionFloat('Enter your weight in kg: ');
    const height = readlineSync.questionFloat('Enter your height in meters: ');

    const bmi = calculateBMI(weight, height);
    console.log(`Your BMI is ${bmi.toFixed(2)}`);
}

handleBMI();
