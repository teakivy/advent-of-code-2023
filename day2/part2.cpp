#include <iostream>
#include <fstream>
#include <string>
#include <vector>

typedef std::string string;
typedef std::vector<int> int_list;

int find_min(const string& line, char color);
int max(const int_list &nums);

int main() {
    // Read input
    std::ifstream input("../input.txt");
    int sum = 0;

    // Find min for each color and "power" then add to sum
    for( std::string l; getline( input, l );) {
        // Remove spaces from line
        string line;
        for (int i = 0; i < l.length(); i++) {
            if (l[i] != ' ') line += l[i];
        }

        // Find min required for each color and multiply then add to sum
        sum += find_min(line, 'g') * find_min(line, 'r') * find_min(line, 'b');
    }

    std::cout << "Part 2: " << sum << std::endl;
    return 0;
}

/**
 * \brief Finds minimum number of cubes for a color in a line
 * \param line line to find min in
 * \param color color to find min for
 * \return min for color
 */
int find_min(const string& line, char color) {
    int_list rolls;
    string roll;
    // Iterate through line
    for (int i = 0; i < line.length(); i++) {
        // If digit, add to roll string
        if (isdigit(line[i])) {
            roll.push_back(line[i]);
            continue;
        }
        // If color matches, add roll to rolls and reset roll string
        if (line[i] == color && !roll.empty()) {
            rolls.push_back(std::stoi(roll));
            roll = "";
            continue;
        }
        roll = "";
    }

    return max(rolls);
}

/**
 * \brief Finds max of a vector of ints
 * \param nums vector of ints to find max of
 * \return max int
 */
int max(const int_list &nums) {
    int max = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        if (nums[i] > max) max = nums[i];
    }
    return max;
}
