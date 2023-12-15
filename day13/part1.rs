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
        }
        let mut new_map = rotate(map.clone());

        let mirror = check_mirror(new_map);
        if mirror > 0 {
            sum += mirror;
        }
    }

    println!("Part 1: {}", sum);
}

fn check_mirror(map: Vec<String>) -> i32 {
    for i in 0..(map.len() - 1) {
        if map.get(i).unwrap() != map.get(i + 1).unwrap() { continue; }
        let mut mirror = true;
        for j in 0..min(i + 1, map.len() - i - 1) {
            if map.get(i - j).unwrap() != map.get(i + j + 1).unwrap() {
                mirror = false;
                break;
            }
        }
        if mirror {
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
