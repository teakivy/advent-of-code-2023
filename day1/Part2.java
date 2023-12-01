import java.util.List;

public class Part2 {
    public static void main(String[] args) {
        List<String> lines = Part1.readInput();

        // Loop lines and parse each line
        int sum = 0;
        for (String line : lines) {
            sum += parseLine(line);
        }
        System.out.println("Part 2: " + sum);
    }

    /**
     * Parses a line and returns the sum of the numbers in the line.
     * @param line String line
     * @return int sum
     */
    public static int parseLine(String line) {
        int num1 = -1;
        int num2 = -1;

        // Find digits in line, and set num1 and num2
        StringBuilder word = new StringBuilder();
        for (char c : line.toCharArray()) {
            // If c is a digit, set num1 or num2
            if (Character.isDigit(c)) {
                word = new StringBuilder();
                if (num1 == -1) {
                    num1 = Character.getNumericValue(c);
                    continue;
                }
                num2 = Character.getNumericValue(c);
                continue;
            }

            // If c is a letter, append to word
            if (Character.isLetter(c)) {
                word.append(c);
            }

            // Look for a number in word
            int num = getAnInt(word);

            // Set num1 or num2 if num is not -1
            if (num != -1) {
                if (num1 == -1) {
                    num1 = num;
                    continue;
                }
                num2 = num;
            }
        }
        if (num2 == -1) num2 = num1;

        // Add num1 and num2 to sum
        return Integer.parseInt(num1 + "" + num2);
    }

    /**
     * Returns an int from a StringBuilder word.
     * @param word StringBuilder word
     * @return int num
     */
    private static int getAnInt(StringBuilder word) {
        int num = -1;
        if (word.toString().endsWith("zero")) num = 0;
        if (word.toString().endsWith("one")) num = 1;
        if (word.toString().endsWith("two")) num = 2;
        if (word.toString().endsWith("three")) num = 3;
        if (word.toString().endsWith("four")) num = 4;
        if (word.toString().endsWith("five")) num = 5;
        if (word.toString().endsWith("six")) num = 6;
        if (word.toString().endsWith("seven")) num = 7;
        if (word.toString().endsWith("eight")) num = 8;
        if (word.toString().endsWith("nine")) num = 9;
        return num;
    }
}
