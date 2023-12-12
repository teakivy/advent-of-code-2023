<?php
// Read the input file
$galaxy = explode("\n", str_replace("\r", "", file_get_contents("input.txt")));

// Find the empty rows
$empty_rows = [];
for ($i = 0; $i < count($galaxy); $i++) {
    $row = $galaxy[$i];
    $has_galaxies = false;
    for ($j = 0; $j < strlen($row); $j++) {
        if ($row[$j] == '#') {
            $has_galaxies = true;
            break;
        }
    }
    if (!$has_galaxies) {
        array_push($empty_rows, $i);
    }
}

// Find the empty columns
$empty_cols = [];
for ($i = strlen($galaxy[0]) - 1; $i >= 0; $i--) {
    $has_galaxies = false;
    for ($j = 0; $j < count($galaxy); $j++) {
        if ($galaxy[$j][$i] == '#') {
            $has_galaxies = true;
            break;
        }
    }
    if (!$has_galaxies) {
        array_push($empty_cols, $i);
    }
}

/**
 * Find the actual location of a galaxy
 * @param array $loc The location of the galaxy
 * @param array $empty_rows The empty rows
 * @param array $empty_cols The empty columns
 * @param int expansion The expansion factor of the galaxy (default: 1,000,000)
 * @return array The actual location of the galaxy
 */
$find_actual_location = function ($loc, $empty_rows, $empty_cols, $expansion = 1_000_000) {
    $find_less = function ($arr, $val) {
        $less = [];
        foreach ($arr as $item) {
            if ($item < $val) {
                array_push($less, $item);
            }
        }
        return count($less);
    };

    $actual_row = $loc[0] + ($find_less($empty_rows, $loc[0]) * ($expansion - 1));
    $actual_col = $loc[1] + ($find_less($empty_cols, $loc[1]) * ($expansion - 1));
    return [$actual_row, $actual_col];
};

// Find the actual location of each galaxy
$galaxy_locs = [];
for ($i = 0; $i < count($galaxy); $i++) {
    for ($j = 0; $j < strlen($galaxy[$i]); $j++) {
        if ($galaxy[$i][$j] == '#') {
            array_push($galaxy_locs, $find_actual_location([$i, $j], $empty_rows, $empty_cols));
        }
    }
}

// Find the pairs of galaxies
$find_pairs = function ($galaxy_locs) {
    $pairs = [];
    for ($i = 0; $i < count($galaxy_locs); $i++) {
        for ($j = $i + 1; $j < count($galaxy_locs); $j++) {
            array_push($pairs, [$galaxy_locs[$i], $galaxy_locs[$j]]);
        }
    }
    return $pairs;
};

$galaxy_pairs = $find_pairs($galaxy_locs);

// Find the sum of the Manhattan distances between each pair of galaxies
$sum = 0;
foreach ($galaxy_pairs as $pair) {
    $sum += abs($pair[0][0] - $pair[1][0]) + abs($pair[0][1] - $pair[1][1]);
}

// Display the result
echo "Part 2: $sum<br>";
?>
