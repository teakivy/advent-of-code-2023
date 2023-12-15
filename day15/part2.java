import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

public class Part2 {
    public static void main(String[] args) {
        // Read the input.txt file and split it into an array of strings by commas.
        String[] input = readInput().get(0).split(",");
        HashMap<Integer, Box> boxes = new HashMap<>();

        // Parse each string in the array into boxes.
        for (String seq : input) {
            char operation = '\0';
            String key = "";
            String value = "";

            // Parse the string into a key, value, and operation.
            for (char c : seq.toCharArray()) {
                if (Character.isAlphabetic(c)) {
                    key += c;
                } else if (Character.isDigit(c)) {
                    value += c;
                } else {
                    operation = c;
                }
            }

            // If the box doesn't exist, create it.
            if (!boxes.containsKey(parse(key))) {
                boxes.put(parse(key), new Box());
            }

            // Set or remove the key and value from the box.
            if (operation == '=') {
                boxes.get(parse(key)).add(key, Integer.parseInt(value));
            } else if (operation == '-') {
                boxes.get(parse(key)).remove(key);
            }
        }

        // Calculate the sum of all boxes.
        int sum = 0;
        for (int i = 0; i < boxes.keySet().size(); i++) {
            int boxNum = (int) boxes.keySet().toArray()[i];
            Box box = boxes.get(boxNum);
            if (box == null) continue;
            for (int j = 0; j < box.getMap().keySet().size(); j++) {
                // Calculate the sum of the object in the box using the formula:
                // (box + 1) * (indexInBox + 1) * value
                int val = box.get(box.getMap().keySet().toArray()[j].toString());
                sum += (boxNum + 1) * (j + 1) * val;
            }
        }

        System.out.println("Part 2: " + sum);
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

/**
 * A box that contains a LinkedHashMap of keys and values.
 */
class Box {
    LinkedHashMap<String, Integer> map = new LinkedHashMap<>();

    /**
     * Adds a key and value to the box.
     * @param key String key
     * @param value int value
     */
    public void add(String key, int value) {
        map.put(key, value);
    }

    /**
     * Gets the value of a key in the box.
     * @param key String key
     * @return int value
     */
    public int get(String key) {
        return map.get(key);
    }

    /**
     * Gets the LinkedHashMap of keys and values.
     * @return LinkedHashMap<String, Integer> map
     */
    public LinkedHashMap<String, Integer> getMap() {
        return map;
    }

    /**
     * Removes a key and value from the box.
     * @param key String key
     */
    public void remove(String key) {
        map.remove(key);
    }
}
