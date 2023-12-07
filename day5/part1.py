f = open("input.txt", "r").read()
seeds = f.split("\n")[0].split(": ")[1].split(" ")

maps = list(map(lambda line: line.split("\n\n")[0], f.split(":\n")[1: len(f.split(":\n"))]))

for i in range(len(maps)):
    maps[i] = list(map(lambda line: list(map(lambda x: int(x), line.split(" "))), maps[i].split("\n")))

for i in range(len(seeds)):
    seed = int(seeds[i])
    for transform in maps:
        for m in transform:
            [dest_start, src_start, length] = m
            if seed >= src_start and seed < src_start + length:
                seed = dest_start + seed - src_start
                break
    seeds[i] = seed

min = -1
for seed in seeds:
    if seed < min or min == -1:
        min = seed
print("Part 1:", min)
