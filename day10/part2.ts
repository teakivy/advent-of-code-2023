import { Dir, readFileSync } from "fs";

// Read the file and split it into lines
const file = readFileSync("./input.txt", "utf-8");
file.replace("\r", "");
const lines = file.split("\n");

const pipes = ["|", "-", "J", "L", "F", "7"];

interface Point {
	x: number;
	y: number;
}

type Direction = "N" | "E" | "S" | "W" | null;
type Pipe = "|" | "-" | "J" | "L" | "F" | "7";

function checkDirection(point: Point | undefined | null, direction: Direction) {
	if (point === undefined || point === null) return null;
	switch (direction) {
		case "N":
			return lines[point.y - 1][point.x];
		case "E":
			return lines[point.y][point.x + 1];
		case "S":
			return lines[point.y + 1][point.x];
		case "W":
			return lines[point.y][point.x - 1];
	}
}

function getPipe(point: Point | undefined | null) {
	if (point === undefined || point === null) return null;
	return lines[point.y][point.x];
}

function movePoint(
	point: Point | undefined | null,
	direction: Direction
): Point | undefined | null {
	if (point === undefined || point === null) return null;
	let newPoint = { x: point.x, y: point.y };
	switch (direction) {
		case "N":
			newPoint.y--;
			break;
		case "E":
			newPoint.x++;
			break;
		case "S":
			newPoint.y++;
			break;
		case "W":
			newPoint.x--;
			break;
	}
	if (newPoint.x < 0 || newPoint.y < 0) return null;

	return newPoint;
}

function findStart() {
	for (let y = 0; y < lines.length; y++) {
		for (let x = 0; x < lines[y].length; x++) {
			if (lines[y][x] === "S") return { x, y };
		}
	}
}

function getConnectingDirection(pipe: Pipe, direction: Direction) {
	switch (pipe) {
		case "|":
			return direction;
		case "-":
			return direction;
		case "J":
			switch (direction) {
				case "S":
					return "W";
				case "E":
					return "N";
				default:
					return null;
			}
		case "L":
			switch (direction) {
				case "S":
					return "E";
				case "W":
					return "N";
				default:
					return null;
			}
		case "F":
			switch (direction) {
				case "N":
					return "E";
				case "W":
					return "S";
				default:
					return null;
			}
		case "7":
			switch (direction) {
				case "E":
					return "S";
				case "N":
					return "W";
				default:
					return null;
			}
	}
}

function getConnectingPipe(pipe: Pipe, direction: Direction, point: Point) {
	const connectingDirection = getConnectingDirection(pipe, direction);
	if (connectingDirection === null) return null;
	let newPipe = checkDirection(point, connectingDirection);
	if (newPipe === ".") return null;
	if (newPipe === "S") return "S";
	return newPipe;
}

function isPipe(char: string): char is Pipe {
	return pipes.includes(char as Pipe);
}

function checkForLoop(start: Point | undefined | null, direction: Direction) {
	let history: (Point | undefined | null)[] = [];
	let currentPoint: Point | undefined | null = start;
	let currentDir = direction;
	let running = true;
	while (running) {
		let nextPipe = getPipe(movePoint(currentPoint, currentDir));
		if (nextPipe === null) return null;
		currentPoint = movePoint(currentPoint, currentDir);
		if (currentPoint === null) return null;
		if (nextPipe === "S") return history;
		if (!isPipe(nextPipe)) return null;
		if (history.includes(currentPoint)) return null;
		history.push(currentPoint);
		currentDir = getConnectingDirection(nextPipe, currentDir);
	}
}

function transformPipes(input: string[]): string[] {
	const output: string[] = [];
	output.push("");
	for (let i = 0; i < input[0].length; i++) {
		output[0] += "   ";
	}

	input.forEach((line) => {
		let convertedLineTop = "";
		let convertedLine = "";
		let convertedLineBottom = "";

		for (let i = 0; i < line.length; i++) {
			const char = line[i];

			switch (char) {
				case ".":
					convertedLineTop += "   ";
					convertedLine += " . ";
					convertedLineBottom += "   ";
					break;
				case "-":
					convertedLineTop += "   ";
					convertedLine += "---";
					convertedLineBottom += "   ";
					break;
				case "F":
					convertedLineTop += "   ";
					convertedLine += " F-";
					convertedLineBottom += " | ";
					break;
				case "7":
					convertedLineTop += "   ";
					convertedLine += "-7 ";
					convertedLineBottom += " | ";
					break;
				case "|":
					convertedLineTop += " | ";
					convertedLine += " | ";
					convertedLineBottom += " | ";
					break;
				case "J":
					convertedLineTop += " | ";
					convertedLine += "-J ";
					convertedLineBottom += "   ";
					break;
				case "L":
					convertedLineTop += " | ";
					convertedLine += " L-";
					convertedLineBottom += "   ";
					break;
				case "S":
					convertedLineTop += " | ";
					convertedLine += "-S-";
					convertedLineBottom += " | ";
					break;
				case "X":
					convertedLineTop += "   ";
					convertedLine += " X ";
					convertedLineBottom += "   ";
				default:
					convertedLineTop += "   ";
					convertedLine += "   ";
					convertedLineBottom += "   ";
			}
		}

		output.push(convertedLineTop);
		output.push(convertedLine);
		output.push(convertedLineBottom);
	});

	output.push("");
	for (let i = 0; i < input[0].length; i++) {
		output[0] += "   ";
	}

	return output;
}

const start = findStart();
let loop = checkForLoop(start, "S");
if (loop === null) loop = checkForLoop(start, "E");
if (loop === null) loop = checkForLoop(start, "W");
if (loop === null) loop = checkForLoop(start, "N");
if (loop === null || loop === undefined) throw new Error("No loop found");

// Create a new array with the same contents as lines but with all characters outside the loop replaced with "."
let newLines = lines.map((line) => line);
for (let i = 0; i < newLines.length; i++) {
	for (let j = 0; j < newLines[i].length; j++) {
		if (newLines[i][j] === "S") continue;
		// check if the current character is in the loop, if not replace with "."
		let inLoop = false;
		for (let k = 0; k < loop.length; k++) {
			if (loop[k] === null) inLoop = true;
			if (loop[k]!.x === j && loop[k]!.y === i) inLoop = true;
		}
		if (!inLoop)
			newLines[i] =
				newLines[i].substr(0, j) + "." + newLines[i].substr(j + 1);
	}
}

let filled = floodFill(transformPipes(newLines), { x: 0, y: 0 }, "O");
console.log("Part 2:", countChars(filled, "."));

function floodFill(ls: string[], point: Point, replacement: string) {
	let history: Point[] = [];
	let queue: Point[] = [];
	queue.push(point);
	while (queue.length > 0) {
		const currentPoint = queue.pop()!;
		if (currentPoint === undefined) continue;
		if (ls[currentPoint.y][currentPoint.x] === replacement) continue;
		ls[currentPoint.y] =
			ls[currentPoint.y].substr(0, currentPoint.x) +
			replacement +
			ls[currentPoint.y].substr(currentPoint.x + 1);
		const north = movePoint(currentPoint, "N");
		const east = movePoint(currentPoint, "E");
		const south = movePoint(currentPoint, "S");
		const west = movePoint(currentPoint, "W");
		if (
			north !== null &&
			north !== undefined &&
			(north.y < 0 || north.y >= ls.length)
		)
			continue;
		if (
			east !== null &&
			east !== undefined &&
			(east.x < 0 || east.x >= ls[east.y].length)
		)
			continue;
		if (
			south !== null &&
			south !== undefined &&
			(south.y < 0 || south.y >= ls.length)
		)
			continue;
		if (
			west !== null &&
			west !== undefined &&
			(west.x < 0 || west.x >= ls[west.y].length)
		)
			continue;
		if (
			north !== null &&
			north !== undefined &&
			!history.includes(north) &&
			(ls[north.y][north.x] === " " || ls[north.y][north.x] === ".")
		) {
			history.push(north);
			queue.push(north);
		}
		if (
			east !== null &&
			east !== undefined &&
			!history.includes(east) &&
			(ls[east.y][east.x] === " " || ls[east.y][east.x] === ".")
		) {
			history.push(east);
			queue.push(east);
		}
		if (
			south !== null &&
			south !== undefined &&
			!history.includes(south) &&
			(ls[south.y][south.x] === " " || ls[south.y][south.x] === ".")
		) {
			history.push(south);
			queue.push(south);
		}
		if (
			west !== null &&
			west !== undefined &&
			!history.includes(west) &&
			(ls[west.y][west.x] === " " || ls[west.y][west.x] === ".")
		) {
			history.push(west);
			queue.push(west);
		}
	}

	return ls;
}

function countChars(ls: string[], char: string) {
	let count = 0;
	for (let i = 0; i < ls.length; i++) {
		for (let j = 0; j < ls[i].length; j++) {
			if (ls[i][j] === char) count++;
		}
	}
	return count;
}
