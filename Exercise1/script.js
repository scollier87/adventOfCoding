// Import the 'fs' (File System) module to enable file reading and writing functionalities
const fs = require('fs');
// Import the 'path' module to work with file and directory paths
const path = require('path');

// Define the path to the file (aOC1.text) relative to the current script
const filePath = path.join(__dirname, 'aOC1.text');

// Read the file at the given path, using UTF-8 encoding to get a string
fs.readFile(filePath, 'utf8', (err, data) => {
    // If there's an error reading the file, log the error and terminate the function
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    // If file is read successfully, process its data with the sumCalibrationValues function
    // and log the total sum to the console
    console.log(`Total Sum: ${sumCalibrationValues(data)}`);
});


// // -----Exercise 1-----

// // Import the 'fs' (File System) module to enable file reading and writing functionalities
// const fs = require('fs');
// // Import the 'path' module to work with file and directory paths
// const path = require('path');

// function sumCalibrationValues(calibrationDocument) {
//     // Split the string into an array of words
//     const words = calibrationDocument.split('\n');
//     let sum = 0;

//     // Iterate over each line in the array
//     words.forEach((word, i) => {
//         // Find the first digit in the line using a regular expression
//         const firstDigit = word.match(/\d/);
//         // Find the last digit in the line using a regular expression
//         const lastDigit = word.match(/\d(?=[^\d]*$)/);

//         // Check if both first and last digits are found
//         if (firstDigit && lastDigit) {
//             // Combine the first and last digits to form a two-digit number and convert it to an integer
//             const value = parseInt(firstDigit[0] + lastDigit[0], 10); // 10 is base-10 number
//             sum += value;
//         }
//     });
//     return sum;
// }


// -----Exercise 2-----

// Function to reverse a string.
function reverseString(str) {
    // Splits the string into an array of characters, reverses the array, and joins it back into a string.
    return str.split('').reverse().join('');
}

// Function to create a reversed version of a given mapping.
function createReversedMapping(mapping) {
    const reversedMapping = {};
    // Iterate over each key-value pair in the original mapping.
    for (const [key, value] of Object.entries(mapping)) {
        // Reverse the key and value and add them to the reversed mapping.
        reversedMapping[reverseString(key)] = reverseString(value);
    }
    return reversedMapping;
}

// Function to interpret a word based on a given mapping (either original or reversed).
function interpretWithMapping(word, mapping) {
    // Iterate over each key-value pair in the mapping.
    for (const [key, value] of Object.entries(mapping)) {
        // Create a regex for the key to replace it in the word, ignoring case.
        const regex = new RegExp(key, 'gi');
        // Replace the key in the word with its corresponding value.
        word = word.replace(regex, value);
    }
    return word;
}

// Function to interpret a word using the provided special mapping.
function interpretWord(word, specialMapping) {
    // Interpret the word using the special mapping.
    let interpretedWord = interpretWithMapping(word, specialMapping);
    // Reverse the original word.
    const reversedWord = reverseString(word);
    // Interpret the reversed word and append the result to the original interpretation.
    interpretedWord += interpretWithMapping(reversedWord, specialMapping);

    // Remove all non-digit characters from the final interpreted word.
    return interpretedWord.replace(/\D/g, '');
}

// Main function to calculate the total sum of calibration values from a document.
function sumCalibrationValues(calibrationDocument) {
    // Define the basic mapping for individual number words.
    const originalMapping = {
        "one": "1", "two": "2", "three": "3", "four": "4",
        "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9"
    };

    // Define special mappings for specific combinations of number words.
    const specialMappingCombinations = {
        "onetwo": "12", "oneightwo": "182", "twone": "21", "twoneight": "218",
        "twoneighthree": "2183", "twoneighthreeight": "21838", "seventwo": "72", "eightwo": "82"
    };

    // Generate reversed mappings for the special combinations.
    const reversedSpecialMapping = createReversedMapping(specialMappingCombinations);

    // Combine the original number words mapping, special combinations, and reversed special combinations.
    const specialMapping = {
        // ...originalMapping,
        // ...specialMappingCombinations,
        ...reversedSpecialMapping,
        ...createReversedMapping(originalMapping)
    };

    // Split the document into individual lines.
    const lines = calibrationDocument.split('\n');
    let totalSum = 0;

    // Process each line of the document.
    lines.forEach(line => {
        // Interpret each line using the combined special mapping.
        const interpretedLine = interpretWord(line, specialMapping);
        // Extract all digits from the interpreted line.
        const digits = interpretedLine.match(/\d/g);

        // If digits are found, calculate the value based on the first and last digit.
        if (digits && digits.length > 0) {
            const firstDigit = digits[0];
            const lastDigit = digits[digits.length - 1];
            // Parse the combined first and last digit as an integer and add to the total sum.
            const combinedValue = parseInt(firstDigit + lastDigit, 10);
            totalSum += combinedValue;
        }
    });

    // Return the total sum calculated from all lines.
    return totalSum;
}
