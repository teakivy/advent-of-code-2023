<?php
// Read the input file
$galaxy_tmp = explode("\n", file_get_contents("input.txt"));

// Expand the galaxy on empty rows
$galaxy = [];
for ($i = 0; $i < count($galaxy_tmp); $i++) {
    $row = $galaxy_tmp[$i];
    $has_galaxies = false;
    // Search each row for a galaxy
    for ($j = 0; $j < strlen($row); $j++) {
        if ($row[$j] == '#') {
            $has_galaxies = true;
            break;
        }
    }
    array_push($galaxy, $row);
    // If the row has no galaxies, expand it
    if (!$has_galaxies) {
        array_push($galaxy, $row);
    }
}

// Expand the galaxy on empty columns
for ($i = strlen($galaxy[0]) - 2; $i >= 0; $i--) {
    $has_galaxies = false;
    // Search each column for a galaxy
    for ($j = 0; $j < count($galaxy); $j++) {
        if ($galaxy[$j][$i] == '#') {
            $has_galaxies = true;
            break;
        }
    }
    // If the column has no galaxies, expand it
    if (!$has_galaxies) {
        for ($j = 0; $j < count($galaxy); $j++) {
            $galaxy[$j] = substr_replace($galaxy[$j], $galaxy[$j][$i], $i + 1, 0);
        }
    }
}

// Find the actual location of each galaxy
$galaxy_locs = [];
for ($i = 0; $i < count($galaxy); $i++) {
    for ($j = 0; $j < strlen($galaxy[$i]); $j++) {
        if ($galaxy[$i][$j] == '#') {
            array_push($galaxy_locs, [$i, $j]);
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
echo "Part 1: $sum<br>";
?>
