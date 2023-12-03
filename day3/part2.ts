import { readFileSync } from "fs";

// Read the file and split it into lines
const file = readFileSync("./input.txt", "utf-8");
const lines = file.split("\n");

// Sum of the gear ratios
let sum = 0;
// Loop through each line
for (let i = 0; i < lines.length; i++) {
	const line = lines[i];

	// Loop through each character
	for (let j = 0; j < line.length; j++) {
		// If the character is not a "gear", skip it
		if (line[j] !== "*") continue;

		// Find the gear ratio
		const gearRatio = findGearRatio(i, j);
		if (gearRatio === null) continue;

		// Add the gear ratio to the sum
		sum += gearRatio;
	}
}

// Log the sum
console.log("Part 2: " + sum);

/**
 * Checks if the character is a number
 * @param char The character to check
 * @returns Whether the character is a number
 */
function isNum(char: string) {
	return !isNaN(parseInt(char));
}

/**
 * Finds the gear ratio at a given position
 * @param line The line number
 * @param column The column number
 * @returns The gear ratio or null
 */
function findGearRatio(line: number, column: number) {
	// List of surrounding numbers
	let nums: number[] = [];

	// Check left and right
	const left = findNum(line, column - 1);
	if (left !== null) nums.push(left);
	const right = findNum(line, column + 1);
	if (right !== null) nums.push(right);

	// Check top and bottom
	const up = findNum(line - 1, column);
	if (up !== null) nums.push(up);
	const down = findNum(line + 1, column);
	if (down !== null) nums.push(down);

	// Check diagonal top left and top right, if they are not the same as the top number
	const topLeft = findNum(line - 1, column - 1);
	if (topLeft !== null && topLeft !== up) nums.push(topLeft);
	const topRight = findNum(line - 1, column + 1);
	if (topRight !== null && topRight !== up) nums.push(topRight);

	// Check diagonal bottom left and bottom right, if they are not the same as the bottom number
	const bottomLeft = findNum(line + 1, column - 1);
	if (bottomLeft !== null && bottomLeft !== down) nums.push(bottomLeft);
	const bottomRight = findNum(line + 1, column + 1);
	if (bottomRight !== null && bottomRight !== down) nums.push(bottomRight);

	// If there are not exactly 2 numbers, return null
	if (nums.length !== 2) return null;
	// Return the gear ratio
	return nums[0] * nums[1];
}

/**
 * Finds a number at a given position
 * @param line The line number
 * @param column The column number
 * @returns The number found or null
 */
function findNum(line: number, column: number) {
	let num = lines[line]?.[column];
	// Check the exact position
	if (!isNum(num)) return null;

	// Check right
	for (let i = column + 1; i < lines[line].length; i++) {
		const char = lines[line][i];
		if (isNum(char)) {
			num += char;
			continue;
		}
		break;
	}

	// Check left
	for (let i = column - 1; i >= 0; i--) {
		const char = lines[line][i];
		if (isNum(char)) {
			num = char + num;
			continue;
		}
		break;
	}

	return parseInt(num);
}
