use std::fs;

fn main() {
    let mut contents = fs::read_to_string("./input.txt")
        .expect("Should have been able to read the file");
    contents = contents.replace("\r", "");

    let times = split_nums(contents.split("\n").next().unwrap());
    let distances = split_nums(contents.split("\n").nth(1).unwrap());

    let mut error_margin = 1;
    for i in 0..times.len() {
        error_margin *= find_winning_hold_times(times[i], distances[i]);
    }

    println!("Part 1: {}", error_margin);
}

fn split_nums(input: &str) -> Vec<u32> {
    input.split(":").last().unwrap().split(" ").filter(|&x| !x.is_empty()).map(|x| x.parse::<u32>().unwrap()).collect::<Vec<u32>>()
}

fn find_winning_hold_times(time: u32, distance: u32) -> u32 {
    let mut winning_options = 0;
    for t in 1..(time - 1) {
        let travelled = (time - t) * t;
        if travelled > distance {
            winning_options += 1;
        }
    }
    winning_options
}
