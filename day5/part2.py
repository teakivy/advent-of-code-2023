from datetime import datetime

searching = {"sts": False, "stf": False, "ftw": False, "wtl": False, "ltt": False, "tth": False, "htl": False}

seedInfo = []
sts, stf, ftw, wtl, ltt, tth, htl = [], [], [], [], [], [], []

with open("input.txt") as file:
    for line in file:
        # set the ranges of the seeds: seedInfo = [[seedStartRange, seedEndRange], [...] ]
        if "seeds:" in line:
            seeds = line.split(":")[1].strip(" ").strip("\n").split(" ")
            for info in range(len(seeds)):
                if info % 2 != 0:
                    continue
                else:
                    seedInfo.append([int(seeds[info]), int(seeds[info]) + int(seeds[info + 1])])

        # set the ranges of each map, ex.: sts = [[[mapStartRange, mapEndRange], mapDifferenceConvert], [...]]
        elif "seed-to-soil map:" in line or searching["sts"]:
            if line.startswith("\n"):
                searching["sts"] = False
                continue
            if searching["sts"]:
                current = line.strip("\n").split(" ")
                sts.append([
                    [int(current[0]), int(current[0]) + int(current[2]) - 1],
                    int(current[1]) - int(current[0])
                ])
            if not searching["sts"]:
                searching["sts"] = True

        elif "soil-to-fertilizer map:" in line or searching["stf"]:
            if line.startswith("\n"):
                searching["stf"] = False
                continue
            if searching["stf"]:
                current = line.strip("\n").split(" ")
                stf.append([
                    [int(current[0]), int(current[0]) + int(current[2]) - 1],
                    int(current[1]) - int(current[0])
                ])
            if not searching["stf"]:
                searching["stf"] = True

        elif "fertilizer-to-water map:" in line or searching["ftw"]:
            if line.startswith("\n"):
                searching["ftw"] = False
                continue
            if searching["ftw"]:
                current = line.strip("\n").split(" ")
                ftw.append([
                    [int(current[0]), int(current[0]) + int(current[2]) - 1],
                    int(current[1]) - int(current[0])
                ])
            if not searching["ftw"]:
                searching["ftw"] = True

        elif "water-to-light map:" in line or searching["wtl"]:
            if line.startswith("\n"):
                searching["wtl"] = False
                continue
            if searching["wtl"]:
                current = line.strip("\n").split(" ")
                wtl.append([
                    [int(current[0]), int(current[0]) + int(current[2]) - 1],
                    int(current[1]) - int(current[0])
                ])
            if not searching["wtl"]:
                searching["wtl"] = True

        elif "light-to-temperature map:" in line or searching["ltt"]:
            if line.startswith("\n"):
                searching["ltt"] = False
                continue
            if searching["ltt"]:
                current = line.strip("\n").split(" ")
                ltt.append([
                    [int(current[0]), int(current[0]) + int(current[2]) - 1],
                    int(current[1]) - int(current[0])
                ])
            if not searching["ltt"]:
                searching["ltt"] = True

        elif "temperature-to-humidity map:" in line or searching["tth"]:
            if line.startswith("\n"):
                searching["tth"] = False
                continue
            if searching["tth"]:
                current = line.strip("\n").split(" ")
                tth.append([
                    [int(current[0]), int(current[0]) + int(current[2]) - 1],
                    int(current[1]) - int(current[0])
                ])
            if not searching["tth"]:
                searching["tth"] = True

        elif "humidity-to-location map:" in line or searching["htl"]:
            if line.startswith("\n"):
                searching["htl"] = False
                continue
            if searching["htl"]:
                current = line.strip("\n").split(" ")
                htl.append([
                    [int(current[0]), int(current[0]) + int(current[2]) - 1],
                    int(current[1]) - int(current[0])
                ])
            if not searching["htl"]:
                searching["htl"] = True


# check if given seed value is in range of the seed list
def inSeedRange(seed):
    for ranges in seedInfo:
        if ranges[0] <= seed <= ranges[1]:
            return True


closestSeed = 0

# check every location starting from 0 until its inSeedRange()
while True:
    currentSeed = closestSeed
    staticSeed = closestSeed

    # backwards calculate from location to seed till it matches a seed in the ranges
    for s in htl:
        if s[0][0] <= currentSeed <= s[0][1]:
            currentSeed = currentSeed + s[1]
            break
    for s in tth:
        if s[0][0] <= currentSeed <= s[0][1]:
            currentSeed = currentSeed + s[1]
            break
    for s in ltt:
        if s[0][0] <= currentSeed <= s[0][1]:
            currentSeed = currentSeed + s[1]
            break
    for s in wtl:
        if s[0][0] <= currentSeed <= s[0][1]:
            currentSeed = currentSeed + s[1]
            break
    for s in ftw:
        if s[0][0] <= currentSeed <= s[0][1]:
            currentSeed = currentSeed + s[1]
            break
    for s in stf:
        if s[0][0] <= currentSeed <= s[0][1]:
            currentSeed = currentSeed + s[1]
            break
    for s in sts:
        if s[0][0] <= currentSeed <= s[0][1]:
            currentSeed = currentSeed + s[1]
            break

    # output: answer
    if inSeedRange(currentSeed):
        print("Part 2: " + staticSeed)  # <<<< The answer
        break
    else:
        closestSeed += 1
