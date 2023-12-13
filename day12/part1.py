records = open("input.txt", "r").read().replace("\r", "").split("\n")
for i in range(len(records)):
    records[i] = {"record": records[i].split(" ")[0],
                  "backupMap": list(map(lambda num: int(num), records[i].split(" ")[1].split(","))),}

def replace_question_marks(input_str):
    if '?' not in input_str:
        return [input_str]

    possibilities = ['.', '#']
    result = []

    for possibility in possibilities:
        replaced_str = input_str.replace('?', possibility, 1)
        result.extend(replace_question_marks(replaced_str))

    return result

def test_sequence(input_string, broken_sequence):
    seq = []
    n = 0
    for i in range(len(input_string)):
        if input_string[i] == '#':
            n += 1
        else:
            if n > 0:
                seq.append(n)
            n = 0
    if n > 0:
        seq.append(n)
    return seq == broken_sequence

def find_options(input_string, broken_sequence):
    options = []
    for seq in replace_question_marks(input_string):
        if test_sequence(seq, broken_sequence):
            options.append(seq)
    return options

sum = 0
for record in records:
    sum += len(find_options(record["record"], record["backupMap"]))
print("Part 1:", sum)
