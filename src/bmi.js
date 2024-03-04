// Importa o módulo fs para lidar com operações de arquivo e o módulo readline-sync para receber entrada do usuário de forma síncrona.
const fs = require('fs').promises;
const readlineSync = require('readline-sync');

// Função para calcular o IMC (Índice de Massa Corporal) com base no peso e altura fornecidos.
function calculateBMI(weight, height) {
    return weight / (height ** 2);
}

// Função assíncrona principal para lidar com o cálculo do IMC e salvar os dados em um arquivo JSON.
async function handleBMI() {
    // Pergunta ao usuário o nome.
    const name = readlineSync.question('What\'s your name? ');
    // Pergunta ao usuário o peso e converte para float.
    const weight = readlineSync.questionFloat('Enter your weight in kg: ');
    // Pergunta ao usuário a altura e converte para float.
    const height = readlineSync.questionFloat('Enter your height in meters: ');

    // Calcula o IMC usando a função calculateBMI.
    const bmi = calculateBMI(weight, height);
    let situation;
    // Determina a situação do IMC com base em intervalos padrão.
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

    // Exibe o IMC calculado e a situação.
    console.log(`Your BMI is ${bmi.toFixed(2)}`);
    console.log(`You are ${situation}`);

    // Gera um ID baseado na data e hora atual.
    const id = new Date().toISOString();

    let jsonData;
    try {
        // Tenta ler o arquivo JSON.
        const data = await fs.readFile('src/data/data.json', 'utf8');
        // Se o arquivo estiver vazio, inicializa um array vazio.
        if (data.trim() === '') {
            jsonData = [];
        } else {
            // Converte o conteúdo do arquivo JSON em um objeto.
            jsonData = JSON.parse(data);
            // Se o conteúdo não for um array, lança um erro.
            if (!Array.isArray(jsonData)) {
                throw new Error("Data in file is not an array.");
            }
        }
    } catch (err) {
        // Se ocorrer um erro de arquivo não encontrado, cria um novo arquivo com um array vazio.
        if (err.code === 'ENOENT') {
            jsonData = [];
            await fs.writeFile('src/data/data.json', '[]');
        } else {
            // Se ocorrer outro erro, exibe o erro e sai da função.
            console.error("Error reading file:", err);
            return;
        }
    }

    // Cria um novo objeto contendo o ID, nome, peso, altura, IMC e situação.
    const newData = {
        id: id,
        name: name,
        weight: weight,
        height: height,
        bmi: bmi.toFixed(2),
        situation: situation
    };

    // Adiciona o novo objeto ao array de dados.
    jsonData.push(newData);

    try {
        // Escreve o array de dados de volta no arquivo JSON.
        await fs.writeFile('src/data/data.json', JSON.stringify(jsonData, null, 2));
        console.log('Data has been saved!');
    } catch (err) {
        // Se ocorrer um erro ao escrever o arquivo, exibe o erro.
        console.error("Error writing file:", err);
    }
}

// Chama a função principal para iniciar o processo de cálculo do IMC e salvamento dos dados.
handleBMI();
