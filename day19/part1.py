records = open("input.txt", "r").read().replace("\r", "")

workflows_str = records.split("\n\n")[0].split("\n")
ratings_str = records.split("\n\n")[1].split("\n")

workflows = []
for workflow_str in workflows_str:
    workflow = {
        "name": "",
        "tasks": [],
        "final": ""
    }
    workflow["name"] = workflow_str.split("{")[0]
    tasks = []
    for task_str in workflow_str.split("{")[1].split("}")[0].split(","):
        if ":" not in task_str:
            workflow["final"] = task_str
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

records = []
for rating_str in ratings_str:
    record = []
    rating_str = rating_str[1:-1]
    for rating in rating_str.split(","):
        r = {
            "category": "",
            "value": 0,
        }
        r["category"] = rating[0]
        r["value"] = int(rating[2:])
        record.append(r)
    records.append(record)

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

def run_workflow(workflow, record):
    for task in workflow["tasks"]:
        category = task["category"]
        test = task["test"]
        value = task["value"]
        result = task["result"]
        if test == "<":
            if get_rating(record, category) < value:
                return result
        elif test == ">":
            if get_rating(record, category) > value:
                return result
        else:
            print("Invalid test")
            return None
    return workflow["final"]


sum = 0
for record in records:
    workflow = get_workflow("in")
    
    while True:
        result = run_workflow(workflow, record)
        if result == "A" or result == "R":
            if result == "A":
                for rating in record:
                    sum += rating["value"]
            break
        workflow = get_workflow(result)

print("Part 1:", sum)
