def can_move(x, y, grid, x_offset, y_offset):
    if (y + y_offset < 0 or y + y_offset >= len(grid)):
        return False
    elif (x + x_offset < 0 or x + x_offset >= len(grid[y+y_offset])):
        return False
    else:
        return grid[y+y_offset][x+x_offset] == '.'

def print_grid(grid):
    for i in range(len(grid)):
        print("".join(grid[i]))

history = []

def cycle(f):
    # North
    moved = True
    while moved:
        moved = False
        for i in range(len(f)):
            for j in range(len(f[i])):
                if (f[i][j] == 'O' and can_move(j, i, f, 0, -1)):
                    moved = True
                    f[i][j] = '.'
                    f[i-1][j] = 'O'
    # West
    moved = True
    while moved:
        moved = False
        for i in range(len(f)):
            for j in range(len(f[i])):
                if (f[i][j] == 'O' and can_move(j, i, f, -1, 0)):
                    moved = True
                    f[i][j] = '.'
                    f[i][j-1] = 'O'
    # South
    moved = True
    while moved:
        moved = False
        for i in range(len(f)):
            for j in range(len(f[i])):
                if (f[i][j] == 'O' and can_move(j, i, f, 0, 1)):
                    moved = True
                    f[i][j] = '.'
                    f[i+1][j] = 'O'
    # East
    moved = True
    while moved:
        moved = False
        for i in range(len(f)):
            for j in range(len(f[i])):
                if (f[i][j] == 'O' and can_move(j, i, f, 1, 0)):
                    moved = True
                    f[i][j] = '.'
                    f[i][j+1] = 'O'
    return f

def calculate_load(grid):
    load = 0
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if (grid[i][j] == 'O'):
                load += len(grid) - i
    return load

# Read input
# Repition code assisted from https://aoc-puzzle-solver.streamlit.app/
grid = [list(row) for row in open("input.txt", "r").read().replace("\r", "").split("\n")]
m, n = len(grid), len(grid[0])
loads = []
history = {}
for i in range(300):
    grid = cycle(grid)
    total_load = sum((grid[r][c]=='O') * (m-r) for r in range(m) for c in range(n))
    loads.append(total_load)

    # check for repetition cycle
    if i > 20:
        state_hash = str(loads[-20:])
        if state_hash in history:
            rep_cycle_start = history[state_hash]
            rep_cycle_length = i - rep_cycle_start
            break
        history[state_hash] = i

target = 1_000_000_000
offset = (target - rep_cycle_start) % rep_cycle_length - 1  # -1 because initial load was not recorded 
print("Part 2:", loads[rep_cycle_start + offset])
