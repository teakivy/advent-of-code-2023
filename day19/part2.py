records = open("input.txt", "r").read().replace("\r", "")

workflows_str = records.split("\n\n")[0].split("\n")
ratings_str = records.split("\n\n")[1].split("\n")

workflows = []
for workflow_str in workflows_str:
    workflow = {
        "name": "",
        "tasks": []
    }
    workflow["name"] = workflow_str.split("{")[0]
    tasks = []
    for task_str in workflow_str.split("{")[1].split("}")[0].split(","):
        if ":" not in task_str:
            task = {
                "test": "=",
                "result": task_str
            }
            tasks.append(task)
            continue
        task = {
            "category": "",
            "test": "",
            "value": 0,
            "result": ""
        }
        task["category"] = task_str[0]
        task["test"] = task_str[1]
        task["value"] = int(task_str.split(":")[0][2:])
        task["result"] = task_str.split(":")[1]
        tasks.append(task)
    workflow["tasks"] = tasks
    workflows.append(workflow)

def get_workflow(name):
    for workflow in workflows:
        if workflow["name"] == name:
            return workflow
    return None

def get_rating(record, category):
    for rating in record:
        if rating["category"] == category:
            return rating["value"]
    return None

queue = [{"x": [1, 4000], "m": [1, 4000], "a": [1, 4000], "s": [1, 4000], "workflow": "in", "rule": 0}]
sum = 0

while len(queue) != 0:
    q = queue.pop()

    if q["workflow"] == "A":
        sum += (q["x"][1] - q["x"][0] + 1) * (q["m"][1] - q["m"][0] + 1) * (q["a"][1] - q["a"][0] + 1) * (q["s"][1] - q["s"][0] + 1)
        continue
    if q["workflow"] == "R":
        continue

    workflow = get_workflow(q["workflow"])
    rule = workflow["tasks"][q["rule"]]
    if rule["test"] == "=":
        queue.append({"x": q["x"], "m": q["m"], "a": q["a"], "s": q["s"], "workflow": rule["result"], "rule": 0})
        continue

    matched = {"x": [q["x"][0], q["x"][1]], "m": [q["m"][0], q["m"][1]], "a": [q["a"][0], q["a"][1]], "s": [q["s"][0], q["s"][1]], "workflow": rule["result"], "rule": 0}
    not_matched = {"x": [q["x"][0], q["x"][1]], "m": [q["m"][0], q["m"][1]], "a": [q["a"][0], q["a"][1]], "s": [q["s"][0], q["s"][1]], "workflow": q["workflow"], "rule": q["rule"] + 1}

    if rule["test"] == "<":
        matched[rule["category"]][1] = min(q[rule['category']][1], rule['value'] - 1)
        not_matched[rule["category"]][0] = max(q[rule['category']][0], rule['value'])
    elif rule["test"] == ">":
        matched[rule["category"]][0] = max(q[rule['category']][0], rule['value'] + 1)
        not_matched[rule["category"]][1] = min(q[rule['category']][1], rule['value'])

    if matched[rule["category"]][0] <= matched[rule["category"]][1]:
        queue.append(matched)

    if not_matched[rule["category"]][0] <= not_matched[rule["category"]][1]:
        queue.append(not_matched)

print("Part 2:", sum)
