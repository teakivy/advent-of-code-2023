def can_move(x, y, grid, x_offset, y_offset):
    if (y + y_offset < 0 or y + y_offset >= len(grid)):
        return False
    elif (x + x_offset < 0 or x + x_offset >= len(grid[y+y_offset])):
        return False
    else:
        return grid[y+y_offset][x+x_offset] == '.'

def calculate_load(grid):
    load = 0
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if (grid[i][j] == 'O'):
                load += len(grid) - i
    return load

f = open("input.txt", "r").read().split("\n")

for i in range(len(f)):
    f[i] = list(f[i])

moved = True
while moved:
    moved = False
    for i in range(len(f)):
        for j in range(len(f[i])):
            if (f[i][j] == 'O' and can_move(j, i, f, 0, -1)):
                moved = True
                f[i][j] = '.'
                f[i-1][j] = 'O'

print("Part 1:", calculate_load(f))
