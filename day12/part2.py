import re
from functools import lru_cache

@lru_cache
def count_options(record, backup):
    if len(backup) == 0:
        return '#' not in record
    sum = 0
    for i in range(len(backup)):
        sum += backup[i]
    if sum + (len(backup) - 1) > len(record):
        return 0
    char = record[0]
    if char == '.':
        m = re.search(re.compile('[^\.]'), record)
        if m:
            return count_options(record[m.start() :], backup)
        return 0
    if char == '#':
        if len(record) >= backup[0] and '.' not in record[: backup[0]] and (len(record) == backup[0] or record[backup[0]] != '#'):
            return count_options(record[backup[0] + 1 :], backup[1:])
        return 0
    if char == '?':
        return count_options(record[1:], backup) + count_options('#' + record[1:], backup)

records = open("input.txt", "r").read().replace("\r", "").split("\n")
for i in range(len(records)):
    record = records[i].split(" ")[0]
    backup = tuple(map(lambda num: int(num), records[i].split(" ")[1].split(",")))
    records[i] = [record, backup]

sum = 0
for record in records:
    sum += count_options("?".join([record[0]] * 5), record[1]*5)

print("Part 2:", sum)
