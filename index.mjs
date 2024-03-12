import fs from 'fs';
import inquirer from "inquirer";

//function to prompt the user for input
const promptUser = () => {
 return inquirer.prompt([
 {
type: 'input',
name:'text',
message: 'Enter the text for your logo (up to three characters):'
 },
 { 
 type: 'input',
 name:'textColor',
message: 'Enter the text color (color keyword or hexadecimal number):'
},
{

 type: 'list',
name:'shape',
message: 'Choose a shape for your logo:',
choices: ['circle', 'triangle', 'square']
 },
{

type: 'input',
name:'shapeColor',
message: 'Enter the shape color (color keyword or hexadecimal number):'
}
 ]);
};



  // Function to generate SVG string based on user input
const generateSVG = (data) => {
    let svg;
    switch (data.shape) {
        case 'circle':
            svg = `
                <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="150" cy="100" r="80" fill="${data.shapeColor}" />
                    <text x="50%" y="50%" fill="${data.textColor}" text-anchor="middle" alignment-baseline="middle" font-size="48">${data.text}</text>
                </svg>`;
            break;
        case 'triangle':
            svg = `
                <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="150,20 250,180 50,180" fill="${data.shapeColor}" />
                    <text x="50%" y="50%" fill="${data.textColor}" text-anchor="middle" alignment-baseline="middle" font-size="48">${data.text}</text>
                </svg>`;
            break;
        case 'square':
            svg = `
                <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="${data.shapeColor}" />
                    <text x="50%" y="50%" fill="${data.textColor}" text-anchor="middle" alignment-baseline="middle" font-size="48">${data.text}</text>
                </svg>`;
            break;
        default:
            throw new Error('Invalid shape');
    }
    return svg;

};

//function to write SVG string to file
 const writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error('Error writing SVG file:', err);
    } else {
        console.log('Generated logo.svg');
    }
});
};

// Main function to run the application
const init = async () => {
    try {
        //prompt user for input
        const userInput = await promptUser();

        //Generate SVG based on user input
        const svgString = generateSVG(userInput);

        //Write SVG to file 
        writeToFile('logo.svg', svgString);
    } catch (err) {
        console.error('An error occured:', err);
    }
};

// Initialize the application
init();
