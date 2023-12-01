import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Part1 {
    public static void main(String[] args) {
        List<String> lines = readInput();

        // Loop lines and parse each line
        int sum = 0;
        for (String line : lines) {
            int num1 = -1;
            int num2 = -1;

            // Find digits in line, and set num1 and num2
            for (char c : line.toCharArray()) {
                if (Character.isDigit(c)) {
                    if (num1 == -1) {
                        num1 = Character.getNumericValue(c);
                    }
                    num2 = Character.getNumericValue(c);
                }
            }

            if (num2 == -1) num2 = num1;

            // Add num1 and num2 to sum
            sum += Integer.parseInt(num1 + "" + num2);
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
                lines.add(line);
                line = reader.readLine();
            }

            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return lines;
    }
}
