use std::fs;

fn main() {
    let mut contents = fs::read_to_string("./input.txt")
        .expect("Should have been able to read the file").replace("\r", "").replace(" ", "");

    let time = contents.split("\n").next().unwrap().split(":").last().unwrap().parse::<u64>().unwrap();
    let distance = contents.split("\n").nth(1).unwrap().split(":").last().unwrap().parse::<u64>().unwrap();
    println!("Part 2: {}", find_winning_hold_times(time, distance));
}

fn find_winning_hold_times(time: u64, distance: u64) -> u64 {
    let mut winning_options = 0;
    for t in 1..(time - 1) {
        let travelled = (time - t) * t;
        if travelled > distance {
            winning_options += 1;
        }
    }
    winning_options
}
