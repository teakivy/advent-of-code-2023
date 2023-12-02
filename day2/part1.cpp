#include <iostream>
#include <fstream>
#include <string>
#include <vector>

typedef std::string string;
typedef std::vector<string> string_list;

string_list find_rolls(const string& line);
string_list split_roll(const string& roll);
bool is_valid(const string& roll);

int main() {
    // Read input
    std::ifstream input("../input.txt");
    int sum = 0;

    // Find rolls and check if valid
    for( std::string line; getline( input, line );) {
        bool valid_roll = true;
        // Remove "Game: " from line
        line = line.substr(5);
        // Find game number and rolls
        const int gameNum = std::stoi(line.substr(0, line.find(':')));
        string_list rolls = find_rolls(line);

        // Check each roll
        for (int i = 0; i < rolls.size(); i++) {
            // Split roll into individual rolls
            string_list rs = split_roll(rolls[i]);
            // Check each individual roll for validity
            for (int j = 0; j < rs.size(); j++) {
                if (!is_valid(rs[j])) {
                    valid_roll = false;
                    break;
                }
            }
        }

        // Add game number to sum if valid
        if (valid_roll) sum += gameNum;
    }

    std::cout << "Part 1: " << sum << std::endl;
    return 0;
}

/**
 * \brief Finds rolls in a line
 * \param line line to find rolls in
 * \return list of rolls
 */
string_list find_rolls(const string& line) {
    string_list rolls;
    string roll;
    // Iterate through line
    for (int i = 0; i < line.length(); i++) {
        // Skip spaces
        if (line[i] == ' ') continue;
        if (line[i] == ':') {
            roll = "";
            continue;
        }
        // Add roll to list if semicolon is found
        if (line[i] == ';') {
            rolls.push_back(roll);
            roll = "";
            continue;
        }
        // Add last roll to list if end of line is reached
        if (i == line.length() - 1) {
            rolls.push_back(roll + line[i]);
            continue;
        }
        roll += line[i];
    }

    return rolls;
}

/**
 * \brief Splits a roll into individual color rolls
 * \param roll String to split
 * \return List of rolls
 */
string_list split_roll(const std::string& roll) {
    string_list rolls;
    string r;
    // Iterate through roll
    for (int i = 0; i < roll.length(); i++) {
        // If comma is found, add roll to list and reset roll
        if (roll[i] == ',') {
            rolls.push_back(r);
            r = "";
            continue;
        }
        r += roll[i];
    }
    // Add last roll to list
    rolls.push_back(r);

    return rolls;
}

/**
 * \brief Checks if a roll has a valid number of cubes for a color
 * \param roll roll to check
 * \return true if valid, false otherwise
 */
bool is_valid(const string& roll) {
    // Find number of cubes
    string c;
    for (int i = 0; i < roll.length(); i++) {
        if (isdigit(roll[i])) c += roll[i];
    }
    const int count = std::stoi(c);

    // Check if valid
    switch (roll[c.length()]) {
        case 'r':
            return count <= 12;
        case 'g':
            return count <= 13;
        case 'b':
            return count <= 14;
        default:
            return false;
    }
}
