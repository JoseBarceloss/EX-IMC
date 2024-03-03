function calculateBMI(weight, height) {
    return weight / (height ** 2);
}

const readlineSync = require('readline-sync');

function handleBMI() {
    const weight = readlineSync.questionFloat('Enter your weight in kg: ');
    const height = readlineSync.questionFloat('Enter your height in meters: ');

    const bmi = calculateBMI(weight, height);
    console.log(`Your BMI is ${bmi.toFixed(2)}`);

    if (bmi < 18.5)  {
        console.log('You are underweight');
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        console.log('You are normal weight');
    } else if (bmi >= 25 && bmi <= 29.9) {
        console.log('You are overweight');
    } else if ( bmi >= 30 && bmi <= 34.9) {
        console.log('You are class I obese');
    } else if (bmi >= 35 && bmi <= 39.9) {
        console.log('You are class II obese');
    } else {
        console.log('You are obese class III and IV');
    }
}

handleBMI();

