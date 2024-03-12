import fs from "fs";
import inquirer from "inquirer";

// Function to prompt the user for input
const promptUser = async () => {
  try {
    return await inquirer.prompt([
      {
        type: "input",
        name: "text",
        message: "Enter the text for your logo (up to three characters):",
        validate: (input) => {
          if (input.length <= 3) {
            return true;
          }
          return "Please enter up to three characters.";
        },
      },
      {
        type: "input",
        name: "textColor",
        message: "Enter the text color (color keyword or hexadecimal number):",
      },
      {
        type: "list",
        name: "shape",
        message: "Choose a shape for your logo:",
        choices: ["circle", "triangle", "square"],
      },
      {
        type: "input",
        name: "shapeColor",
        message: "Enter the shape color (color keyword or hexadecimal number):",
      },
    ]);
  } catch (error) {
    console.error("Error prompting user:", error);
    throw error;
  }
};

// Function to generate SVG string based on user input
const generateSVG = (data) => {
  try {
    let svg;
    switch (data.shape) {
      case "circle":
        svg = generateCircleSVG(data);
        break;
      case "triangle":
        svg = generateTriangleSVG(data);
        break;
      case "square":
        svg = generateSquareSVG(data);
        break;
      default:
        throw new Error("Invalid shape");
    }
    return svg;
  } catch (error) {
    console.error("Error generating SVG:", error);
    throw error;
  }
};

// Function to generate SVG string for a circle
const generateCircleSVG = (data) => {
  return `
        <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="100" r="80" fill="${data.shapeColor}" />
            <text x="50%" y="50%" fill="${data.textColor}" text-anchor="middle" alignment-baseline="middle" font-size="48">${data.text}</text>
        </svg>`;
};

// Function to generate SVG string for a triangle
const generateTriangleSVG = (data) => {
  return `
        <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <polygon points="150,20 250,180 50,180" fill="${data.shapeColor}" />
            <text x="50%" y="50%" fill="${data.textColor}" text-anchor="middle" alignment-baseline="middle" font-size="48">${data.text}</text>
        </svg>`;
};

// Function to generate SVG string for a square
const generateSquareSVG = (data) => {
  return `
        <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="${data.shapeColor}" />
            <text x="50%" y="50%" fill="${data.textColor}" text-anchor="middle" alignment-baseline="middle" font-size="48">${data.text}</text>
        </svg>`;
};

// Function to write SVG string to file
const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error("Error writing SVG file:", err);
    } else {
      console.log("Generated logo.svg");
    }
  });
};

// Main function to run the application
const init = async () => {
  try {
    // Prompt user for input
    const userInput = await promptUser();

    // Generate SVG based on user input
    const svgString = generateSVG(userInput);

    // Write SVG to file
    writeToFile("logo.svg", svgString);
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

// Initialize the application
init();
