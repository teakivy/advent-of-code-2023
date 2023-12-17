#include <iostream>
#include <fstream>
#include <vector>

typedef std::vector<std::vector<char>> maplist;

struct point {
    int x;
    int y;
};

struct dirpoint {
    point p;
    char dir;
};

char get_at(const maplist map, point p);
int run_start(const maplist map, dirpoint p);

void print_map(const maplist map) {
    for (std::vector<char> row : map) {
        for (char c : row) {
            std::cout << c;
        }
        std::cout << std::endl;
    }
}

int main() {
    // Open the input file
    std::ifstream input("../input.txt");

    maplist map = {};
    for(std::string l; getline(input, l);) {
        std::vector<char> row = {};
        for (char c : l) {
            row.push_back(c);
        }
        map.push_back(row);
    }

    std::vector<int> sums = {};

    for (int i = 0; i < map.at(0).size(); i++) {
        sums.push_back(run_start(map, dirpoint(point(i, 0), 'D')));
        sums.push_back(run_start(map, dirpoint(point(i, map.size() - 1), 'U')));
    }

    for (int i = 0; i < map.size(); i++) {
        sums.push_back(run_start(map, dirpoint(point(0, i), 'R')));
        sums.push_back(run_start(map, dirpoint(point(map.at(0).size() - 1, i), 'L')));
    }

    int max = 0;
    for (int i : sums) {
        if (i > max) max = i;
    }

    std::cout << "Part 2: " << max << std::endl;
    return 0;
}

char get_at(const maplist map, point p) {
    if (p.x < 0 || p.y < 0 || p.y >= map.size() || p.x >= map.at(p.y).size()) {
        return '!';
    }
    return map.at(p.y).at(p.x);
}

int run_start(const maplist map, dirpoint p) {
    maplist newMap = {};
    for (int y = 0; y < map.size(); y++) {
        std::vector<char> row = {};
        for (int x = 0; x < map.at(y).size(); x++) {
            row.push_back(map.at(y).at(x));
        }
        newMap.push_back(row);
    }

    std::vector<dirpoint> points = {};
    points.push_back(p);
    std::vector<point> intersections = {};

    while (!points.empty()) {
        // std::cout << std::endl;
        for (int i = 0; i < points.size(); i++) {
            dirpoint p = points.at(i);
            // std::cout << p.p.x << ", " << p.p.y << ", " << p.dir << std::endl;
            char next = get_at(map, p.p);

            bool found = false;
            for (point inter : intersections) {
                if (inter.x == p.p.x && inter.y == p.p.y || (inter.x < 0 || inter.y < 0 || inter.y >= map.size() || inter.x >= map.at(inter.y).size())) {
                    points.erase(points.begin() + i);
                    found = true;
                }
            }
            if (found) continue;

            if (next == '!') {
                // std::cout << "Exit found at " << p.p.x << ", " << p.p.y << std::endl;
                points.erase(points.begin() + i);
                continue;
            }
            newMap.at(p.p.y).at(p.p.x) = '#';

            if (next == '/') {
                switch (p.dir) {
                    case 'R':
                        p.dir = 'U';
                        break;
                    case 'L':
                        p.dir = 'D';
                        break;
                    case 'U':
                        p.dir = 'R';
                        break;
                    case 'D':
                        p.dir = 'L';
                        break;
                }
            } else if (next == '\\') {
                switch (p.dir) {
                    case 'R':
                        p.dir = 'D';
                        break;
                    case 'L':
                        p.dir = 'U';
                        break;
                    case 'U':
                        p.dir = 'L';
                        break;
                    case 'D':
                        p.dir = 'R';
                        break;
                }
            } else if (next == '|') {
                switch (p.dir) {
                    case 'L':
                    case 'R':
                        p.dir = 'U';
                        points.push_back(dirpoint(point(p.p.x, p.p.y + 1), 'D'));
                        break;
                }

                intersections.push_back(p.p);
            } else if (next == '-') {
                switch (p.dir) {
                    case 'U':
                    case 'D':
                        p.dir = 'L';
                        points.push_back(dirpoint(point(p.p.x + 1, p.p.y), 'R'));
                        break;
                }

                intersections.push_back(p.p);
            }

            point n = p.p;
            switch (p.dir) {
                case 'R':
                    n.x++;
                    break;
                case 'L':
                    n.x--;
                    break;
                case 'U':
                    n.y--;
                    break;
                case 'D':
                    n.y++;
                    break;
            }


            points.at(i).p = n;
            points.at(i).dir = p.dir;
        }
    }

    int sum = 0;
    for (std::vector<char> map : newMap) {
        for (char c : map) {
            if (c == '#') sum++;
        }
    }

    return sum;
}
