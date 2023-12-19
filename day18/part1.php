<?php
// Read the input file
$lines = explode("\n", file_get_contents("input.txt"));

/**
 * Move a location in a direction a certain distance
 * @param array $loc The location to move from
 * @param string $dir The direction to move in (R, L, U, D)
 * @param int $dist The distance to move
 * @return array The locations moved to
 */
$move = function ($loc, $dir, $dist) {
    $x = $loc[0];
    $y = $loc[1];
    $locs = [];
    for ($i = 0; $i < $dist; $i++) {
        if ($dir == "R") {
            $x++;
        } elseif ($dir == "L") {
            $x--;
        } elseif ($dir == "U") {
            $y++;
        } elseif ($dir == "D") {
            $y--;
        }
        array_push($locs, [$x, $y]);
    }
    return $locs;
};

/**
 * Make a map of the locations
 * @param array $locs The locations to make a map of
 * @return array The map
 */
$make_map = function ($locs) {
    $map = [];
    $min_x = min(array_column($locs, 0));
    $max_x = max(array_column($locs, 0));
    $min_y = min(array_column($locs, 1));
    $max_y = max(array_column($locs, 1));
    array_push($map, array_fill(0, $max_x - $min_x + 3, "O"));
    for ($y = $max_y; $y >= $min_y; $y--) {
        $row = ["O"];
        for ($x = $min_x; $x <= $max_x; $x++) {
            if (in_array([$x, $y], $locs)) {
                array_push($row, "X");
            } else {
                array_push($row, "O");
            }
        }
        array_push($row, "O");
        array_push($map, $row);
    }
    array_push($map, array_fill(0, $max_x - $min_x + 3, "O"));

    return $map;
};

/**
 * Flood fill a map
 * @param array $map The map to flood fill
 * @param int $x_start The x coordinate to start at
 * @param int $y_start The y coordinate to start at
 * @param string $replace The character to replace
 * @param string $replace_with The character to replace with
 * @return array The flood filled map
 */
$flood_fill = function ($map, $x_start, $y_start, $replace, $replace_with) {
    $queue = [[$x_start, $y_start]];
    while (count($queue) > 0) {
        $current = array_pop($queue);
        $x = $current[0];
        $y = $current[1];
        if ($x < 0 || $x >= count($map[0]) || $y < 0 || $y >= count($map)) {
            continue;
        } else if ($map[$y][$x] == $replace) {
            $map[$y][$x] = $replace_with;
            array_push($queue, [$x + 1, $y]);
            array_push($queue, [$x - 1, $y]);
            array_push($queue, [$x, $y + 1]);
            array_push($queue, [$x, $y - 1]);
        } else {
            continue;
        }
    }
    return $map;
};

// Parse the input and move the locations
$locs = [[0, 0]];
foreach ($lines as $line) {
    $dir = explode(" ", $line)[0];
    $dist = explode(" ", $line)[1];
    array_push($locs, ...$move(end($locs), $dir, $dist));
}

// Make the map and flood fill it
$map = $make_map($locs);
$map = $flood_fill($map, 0, 0, "O", ".");

// Count the number of non-filled spaces
$count = 0;
foreach ($map as $row) {
    foreach ($row as $char) {
        if ($char == "O" || $char == "X") {
            $count++;
        }
    }
}

echo "Part 1: " . $count;
?>
