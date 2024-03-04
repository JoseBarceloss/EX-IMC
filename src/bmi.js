const fs = require('fs').promises;
const readlineSync = require('readline-sync');

function calculateBMI(weight, height) {
    return weight / (height ** 2);
}

async function handleBMI() {

    const name = readlineSync.question('What\'s your name? ');
    const weight = readlineSync.questionFloat('Enter your weight in kg: ');
    const height = readlineSync.questionFloat('Enter your height in meters: ');

    const bmi = calculateBMI(weight, height);
    let situation;
    if (bmi < 18.5)  {
        situation = 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        situation = 'Normal weight';
    } else if (bmi >= 25 && bmi <= 29.9) {
        situation = 'Overweight';
    } else if ( bmi >= 30 && bmi <= 34.9) {
        situation = 'Class I obese';
    } else if (bmi >= 35 && bmi <= 39.9) {
        situation = 'Class II obese';
    } else {
        situation = 'Obese class III and IV';
    }

    console.log(`Your BMI is ${bmi.toFixed(2)}`);
    console.log(`You are ${situation}`);

    const id = new Date().toISOString();

    let jsonData;
    try {
        const data = await fs.readFile('src/data/data.json', 'utf8');
        if (data.trim() === '') {
            jsonData = [];
        } else {
            jsonData = JSON.parse(data);
            if (!Array.isArray(jsonData)) {
                throw new Error("Data in file is not an array.");
            }
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            jsonData = [];
            await fs.writeFile('src/data/data.json', '[]');
        } else {
            console.error("Error reading file:", err);
            return;
        }
    }

    const newData = {
        id: id,
        name: name,
        weight: weight,
        height: height,
        bmi: bmi.toFixed(2),
        situation: situation
    };

    jsonData.push(newData);

    try {
        await fs.writeFile('src/data/data.json', JSON.stringify(jsonData, null, 2));
        console.log('Data has been saved!');
    } catch (err) {
        console.error("Error writing file:", err);
    }
}

handleBMI();
