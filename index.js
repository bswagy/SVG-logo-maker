const fs = require("fs");
const inquirer = require("inquirer");

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


