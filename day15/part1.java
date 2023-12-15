import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Part1 {
    public static void main(String[] args) {
        // Read the input.txt file and split it into an array of strings by commas.
        String[] input = readInput().get(0).split(",");

        // Parse each string in the array and add it to the sum.
        int sum = 0;
        for (String seq : input) {
            sum += parse(seq);
        }

        System.out.println("Part 1: " + sum);
    }

    /**
     * Reads the input.txt file and returns a list of strings.
     * @return List<String> lines
     */
    public static List<String> readInput() {
        List<String> lines = new ArrayList<>();
        BufferedReader reader;

        try {
            reader = new BufferedReader(new FileReader("input.txt"));
            String line = reader.readLine();

            while (line != null) {
                lines.add(line.replaceAll("\r", ""));
                line = reader.readLine();
            }

            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return lines;
    }

    /**
     * Parses a string into an integer using the AOC 2023 Day 15 algorithm.
     * - Determine the ASCII code for the current character of the string.
     * - Increase the current value by the ASCII code you just determined.
     * - Set the current value to itself multiplied by 17.
     * - Set the current value to the remainder of dividing itself by 256.
     * @param s String to parse
     * @return int parsed value
     */
    public static int parse(String s) {
        int val = 0;
        for (char c : s.toCharArray()) {
            val += c;
            val *= 17;
            val %= 256;
        }
        return val;
    }
}
