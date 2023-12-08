import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.regex.Pattern;

public class Part1 {
    public static void main(String[] args) {
        // Read input.txt and parse the file
        List<String> input = readInput();
        ElementManager1 elements = new ElementManager1(input.get(0));

        for (int i = 2; i < input.size(); i++) {
            String line = input.get(i);
            String name = line.split(" = ")[0];
            String left = line.split(Pattern.quote("("))[1].split(Pattern.quote(", "))[0];
            String right = line.split(Pattern.quote(", "))[1].split(Pattern.quote(")"))[0];

            Element1 element = new Element1(elements, name, left, right);
            elements.addElement(element);
        }

        // Loop elements and find the number of steps
        int steps = 0;
        boolean found = false;
        while (!found) {
            Element1 element = elements.next();
            if (Objects.isNull(element)) {
                found = true;
                continue;
            }
            steps++;
        }

        System.out.println("Part 1: " + steps);
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

class Element1 {
    private final ElementManager1 elements;
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
    public Element1(ElementManager1 elements, String name, String left, String right) {
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
     * Returns the left element
     * @return Element left
     */
    public Element1 getLeft() {
        return elements.getElement(left);
    }

    /**
     * Returns the right element
     * @return Element right
     */
    public Element1 getRight() {
        return elements.getElement(right);
    }

    /**
     * Returns true if the element is the last element (ZZZ)
     * @return boolean isLast
     */
    public boolean isLast() {
        return name.equals("ZZZ");
    }
}

class ElementManager1 {
    private final List<Element1> elements;
    private final Directions1 dirs;
    private Element1 current;

    /**
     * ElementManager constructor
     * @param dirs Directions
     */
    public ElementManager1(String dirs) {
        elements = new ArrayList<>();
        this.dirs = new Directions1(dirs.toCharArray());
    }

    /**
     * Adds an element to the list of elements
     * @param element Element
     */
    public void addElement(Element1 element) {
        elements.add(element);
    }

    /**
     * Returns the next element
     * @return Element next
     */
    public Element1 next() {
        if (current == null) current = getElement("AAA");
        if (current.isLast()) return null;

        char dir = dirs.getNext();
        if (dir == 'L') {
            current = current.getLeft();
        } else if (dir == 'R') {
            current = current.getRight();
        }
        return current;
    }

    /**
     * Returns an element by name
     * @param name Name of element
     * @return Element element
     */
    public Element1 getElement(String name) {
        for (Element1 element : elements) {
            if (element.getName().equals(name)) {
                return element;
            }
        }
        return null;
    }

    /**
     * Returns the list of elements
     * @return List<Element> elements
     */
    public List<Element1> getElements() {
        return elements;
    }
}

class Directions1 {
    private final char[] dirs;
    private int dirStep;

    /**
     * Directions constructor
     * @param dirs Array of directions
     */
    public Directions1(char[] dirs) {
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
