#include <iostream>
#include <fstream>
#include <utility>
#include <vector>

// Type definitions
class Roll;
typedef std::vector<int> vect;
typedef std::vector<Roll> roll_vect;

/**
* Class representing a single roll
*/
class Roll {
    vect rolls;

public:
    /**
    * Constructor for a roll
    * @param line The line to parse
    */
    explicit Roll(std::string& line) {
        line.push_back(' ');
        std::string roll;
        for (int i = 0; i < line.length(); i++) {
            if (isdigit(line[i]) || line[i] == '-') {
                roll.push_back(line[i]);
                continue;
            }
            if (line[i] == ' ') {
                rolls.push_back(std::stoi(roll));
                roll = "";
                continue;
            }
            roll = "";
        }
    }

    /**
    * Constructor for a roll
    * @param rolls The rolls to use
    */
    explicit Roll(vect rolls) : rolls(std::move(rolls)) {}

    /**
    * Get the spacing between the rolls
    * @return The spacing
    */
    [[nodiscard]] vect get_spacing() const {
        vect spacing;
        for (int i = 1; i < rolls.size(); i++) {
            spacing.push_back(rolls.at(i) - rolls.at(i - 1));
        }
        return spacing;
    }

    /**
    * Check if the roll is at the end
    * @return True if the roll is at the end (all 0s)
    */
    [[nodiscard]] bool is_end() const {
        for (const int roll : rolls) {
            if (roll != 0) return false;
        }
        return true;
    }

    /**
    * Get the rolls
    * @return The rolls
    */
    [[nodiscard]] const vect& get_rolls() const {
        return rolls;
    }

    /**
    * Add a roll to the end
    * @param n The roll to add
    */
    void add(const int n) {
        rolls.push_back(n);
    }
};

/**
* Class representing a full roll and it's spaces
*/
class FullRoll {
    roll_vect rolls;

public:
    /**
    * Constructor for a full roll
    * @param rolls The rolls to use
    */
    explicit FullRoll(const roll_vect& rolls) : rolls(rolls) {}

    /**
    * Find the next roll in the sequence
    * @return The next roll
    */
    [[nodiscard]] int find_next() {
        for (int i = rolls.size() - 2; i >= 0; i--) {
            rolls.at(i).add(rolls.at(i).get_rolls().back() + rolls.at(i + 1).get_rolls().back());
        }
        return rolls.at(0).get_rolls().back();
    }
};

int main() {
    // Open the input file
    std::ifstream input("../input.txt");

    // Read the input file into a vector of rolls
    roll_vect rolls;
    std::vector<FullRoll> full_rolls;
    for(std::string l; getline(input, l);) {
        rolls.emplace_back(l);
    }
    // Construct the full rolls
    for (const Roll& roll : rolls) {
        roll_vect spacing_rolls;
        spacing_rolls.push_back(roll);
        while (!spacing_rolls.back().is_end()) {
            spacing_rolls.emplace_back(spacing_rolls.back().get_spacing());
        }

        full_rolls.emplace_back(spacing_rolls);
    }

    // Find the sum of the next rolls
    long sum = 0;
    for (FullRoll& full_roll : full_rolls) {
        sum += full_roll.find_next();
    }

    std::cout << "Part 1: " << sum << std::endl;
    return 0;
}
