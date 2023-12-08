import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class Part2 {
    public static void main(String[] args) {
        // Read input.txt and parse the file
        List<String> input = readInput();
        ElementManager2 elements = new ElementManager2(input.get(0));

        for (int i = 2; i < input.size(); i++) {
            String line = input.get(i);
            String name = line.split(" = ")[0];
            String left = line.split(Pattern.quote("("))[1].split(Pattern.quote(", "))[0];
            String right = line.split(Pattern.quote(", "))[1].split(Pattern.quote(")"))[0];

            Element2 element = new Element2(elements, name, left, right);
            elements.addElement(element);
        }

        // Loop elements and find the number of steps for each starting element
        List<Long> steps = elements.getSteps();
        // Find the LCM of the steps
        System.out.println("Part 2: " + LCMCalculator.findLCM(steps));
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
}

class Element2 {
    private final ElementManager2 elements;
    private final String name;
    private final String left;
    private final String right;

    /**
     * Element constructor
     * @param elements ElementManager
     * @param name Name of element
     * @param left Left element
     * @param right Right element
     */
    public Element2(ElementManager2 elements, String name, String left, String right) {
        this.elements = elements;
        this.name = name;
        this.left = left;
        this.right = right;
    }

    /**
     * Returns the name of the element
     * @return String name
     */
    public String getName() {
        return name;
    }

    /**
     * Returns the left or right element
     * @return Element left or right
     */
    public Element2 getLeft() {
        return elements.getElement(left);
    }

    /**
     * Returns the right element
     * @return Element right
     */
    public Element2 getRight() {
        return elements.getElement(right);
    }

    /**
     * Returns true if the element is the first element (Ends with A)
     * @return boolean isFirst
     */
    public boolean isFirst() {
        return name.endsWith("A");
    }

    /**
     * Returns true if the element is the last element (Ends with Z)
     * @return boolean isLast
     */
    public boolean isLast() {
        return name.endsWith("Z");
    }
}

class ElementManager2 {
    private final List<Element2> elements;
    private final String dirs;

    /**
     * ElementManager constructor
     * @param dirs String dirs
     */
    public ElementManager2(String dirs) {
        elements = new ArrayList<>();
        this.dirs = dirs;
    }

    /**
     * Adds an element to the list of elements
     * @param element Element
     */
    public void addElement(Element2 element) {
        elements.add(element);
    }

    /**
     * Returns the number of steps for each starting element
     * @return List<Long> steps
     */
    public List<Long> getSteps() {
        List<Long> steps = new ArrayList<>();
        for (Element2 element : elements) {
            if (!element.isFirst()) continue;

            Directions2 dirs = new Directions2(this.dirs.toCharArray());
            boolean found = false;
            long step = -1;
            while (!found) {
                step++;
                if (element.isLast()) {
                    found = true;
                    steps.add(step);
                    continue;
                }
                if (dirs.getNext() == 'L') {
                    element = element.getLeft();
                } else {
                    element = element.getRight();
                }
            }
        }
        return steps;
    }

    /**
     * Returns an element by name
     * @param name String name
     * @return Element element
     */
    public Element2 getElement(String name) {
        for (Element2 element : elements) {
            if (element.getName().equals(name)) {
                return element;
            }
        }
        return null;
    }
}

class Directions2 {
    private final char[] dirs;
    private int dirStep;

    /**
     * Directions constructor
     * @param dirs Directions
     */
    public Directions2(char[] dirs) {
        this.dirs = dirs;
        dirStep = 0;
    }

    /**
     * Returns the next direction
     * @return char next
     */
    public char getNext() {
        if (dirStep == dirs.length) {
            dirStep = 0;
        }
        return dirs[dirStep++];
    }
}

class LCMCalculator {
    /**
     * Returns the greatest common divisor of a and b
     * @param a First number
     * @param b Second number
     * @return long gcd
     */
    private static long gcd(long a, long b) {
        while (b != 0) {
            long temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    /**
     * Returns the least common multiple of a and b
     * @param a First number
     * @param b Second number
     * @return long lcm
     */
    private static long lcm(long a, long b) {
        return (a / gcd(a, b)) * b;
    }

    /**
     * Returns the least common multiple of a list of numbers
     * @param numbers List<Long> numbers
     * @return long lcm
     */
    public static long findLCM(List<Long> numbers) {
        long result = numbers.get(0);

        for (int i = 1; i < numbers.size(); i++) {
            result = lcm(result, numbers.get(i));
        }

        return result;
    }
}
