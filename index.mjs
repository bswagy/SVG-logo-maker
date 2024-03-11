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


//function to generate SVG string based on user input
const generateSVG = (data) => {
    //construct SVG string based on user input
    const svg = `
    <svg width="300" height="200">
    <rect width="100%" height="100%" fill="${data.shapeColor}" />
    <text x="50%" y="50%" fill="${data.textColor}" text-anchor="middle" alignment-baseline="middle" font-size="48">${data.text}</text> 
    </svg> 
     `;
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
