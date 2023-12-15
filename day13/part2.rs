use std::cmp::min;
use std::fs;

fn main() {
    let contents = fs::read_to_string("./input.txt")
        .expect("Should have been able to read the file").replace("\r", "");
    let maps = contents.split("\n\n").collect::<Vec<&str>>();

    let mut sum = 0;
    for map in maps.clone() {
        let map = map.split("\n").collect::<Vec<&str>>();
        let map = map.iter().map(|x| x.to_string()).collect::<Vec<String>>();
        let mirror = check_mirror(map.clone());
        if mirror > 0 {
            sum += mirror * 100;
            continue;
        }
        let new_map = rotate(map.clone());

        let mirror = check_mirror(new_map);
        if mirror > 0 {
            sum += mirror;
        }
    }

    println!("Part 2: {}", sum);
}

fn check_mirror(map: Vec<String>) -> i32 {
    for i in 0..(map.len() - 1) {
        let mut str1 = map.get(i).unwrap().to_string();
        let mut str2 = map.get(i + 1).unwrap().to_string();
        for j in 1..(min(i, map.len() - (i + 2)) + 1) {

            str1 = format!("{}{}{}", map.get(i - j).unwrap(), " | ", str1);
            str2 = format!("{}{}{}", map.get(i + j + 1).unwrap(), " | ", str2);
        }

        if smudge_check(str1, str2) == 1 {
            return (i + 1) as i32
        }
    }
    return -1;
}

fn rotate(map: Vec<String>) -> Vec<String> {
    let mut new_map = Vec::new();
    for i in 0..map.get(0).unwrap().len() {
        let mut new_row = String::new();
        for j in 0..map.len() {
            new_row.push(map.get(j).unwrap().chars().nth(i).unwrap());
        }
        new_map.push(new_row);
    }
    return new_map;
}

fn smudge_check(str1: String, str2: String) -> i32 {
    let mut smudge = 0;
    for i in 0..str1.len() {
        if str1.chars().nth(i).unwrap() != str2.chars().nth(i).unwrap() {
            smudge += 1;
        }
    }
    return smudge;
}
