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
	switch (direction) {
		case "N":
			return { x: point.x, y: point.y - 1 };
		case "E":
			return { x: point.x + 1, y: point.y };
		case "S":
			return { x: point.x, y: point.y + 1 };
		case "W":
			return { x: point.x - 1, y: point.y };
	}
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

const start = findStart();

let loop = checkForLoop(start, "E");
if (loop === null) loop = checkForLoop(start, "S");
if (loop === null) loop = checkForLoop(start, "W");
if (loop === null) loop = checkForLoop(start, "N");
if (loop === null || loop === undefined) throw new Error("No loop found");
console.log(loop.length / 2);

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
