import { readFileSync } from "fs";

// Read the file and split it into lines
const file = readFileSync("./input.txt", "utf-8");
const lines = file.split("\n");

// Types
interface Number {
	num: number;
	line: number;
	column: number;
	len: number;
}

interface Symbol {
	line: number;
	column: number;
}

// Numbers and symbols
let nums: Number[] = [];
let sumbols: Symbol[] = [];

// Loop through each line
for (let i = 0; i < lines.length; i++) {
	const line = lines[i];
	// Loop through each character
	let num = "";
	for (let j = 0; j < line.length; j++) {
		const char = line[j];

		// If the character is a number, add it to the number string
		if (isNum(char)) {
			num += char;
			// If the character is the last character, add the number to the list
			if (j === line.length - 1) {
				nums.push({
					num: parseInt(num),
					line: i,
					column: j,
					len: num.length,
				});
				num = "";
			}
			continue;
		}
		// If the character is not a number, add the number to the list if it exists
		if (num.length > 0) {
			nums.push({
				num: parseInt(num),
				line: i,
				column: j - num.length,
				len: num.length,
			});
			num = "";
		}

		// If the character is a symbol, add it to the list
		if (isSymbol(char)) {
			sumbols.push({
				line: i,
				column: j,
			});
		}
	}
}

// Find the sum of the numbers with surrounding symbols
let sum = 0;
for (let i = 0; i < nums.length; i++) {
	const num = nums[i];
	if (hasSurroundingSymbol(num)) {
		sum += num.num;
	}
}

console.log("Part 1: " + sum);

/**
 * Checks if the character is a number
 * @param char The character to check
 * @returns Whether the character is a number
 */
function isNum(char: string) {
	return !isNaN(parseInt(char));
}

/**
 * Checks if the character is a symbol
 * @param char The character to check
 * @returns Whether the character is a symbol
 */
function isSymbol(char: string) {
	return !isNum(char) && char !== "." && char !== " " && char !== "\r";
}

/**
 * Checks if a number has a surrounding symbol
 * @param num The number to check
 * @returns Whether the number has a surrounding symbol
 */
function hasSurroundingSymbol(num: Number) {
	const { line, column, len } = num;

	// horizontal
	const hasLeft = findSymbol(line, column - 1);
	const hasRight = findSymbol(line, column + len);

	// Top and bottom of each character in the number
	for (let i = 0; i < len; i++) {
		const hasTop = findSymbol(line - 1, column + i);
		const hasBottom = findSymbol(line + 1, column + i);
		console.log(hasTop, hasBottom, line, column + i, len);
		if (hasTop || hasBottom) {
			return true;
		}
	}

	// diagonal
	const hasTopLeft = findSymbol(line - 1, column - 1);
	const hasTopRight = findSymbol(line - 1, column + len);
	const hasBottomLeft = findSymbol(line + 1, column - 1);
	const hasBottomRight = findSymbol(line + 1, column + len);

	// Return whether any of the surrounding symbols exist
	return (
		hasLeft ||
		hasRight ||
		hasTopLeft ||
		hasTopRight ||
		hasBottomLeft ||
		hasBottomRight
	);
}

/**
 * Finds a symbol at a given position
 * @param line The line number
 * @param column The column number
 * @returns Whether the symbol was found
 */
function findSymbol(line: number, column: number) {
	for (let i = 0; i < sumbols.length; i++) {
		const symbol = sumbols[i];
		if (symbol.line === line && symbol.column === column) {
			return true;
		}
	}
	return false;
}
