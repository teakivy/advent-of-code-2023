<?php
// Read the input file
$lines = explode("\n", file_get_contents("input.txt"));

/**
 * Move a location in a direction a certain distance
 * @param array $loc The location to move from
 * @param string $dir The direction to move in (0 = R, 2 = L, 3 = U, 1 = D)
 * @param int $dist The distance to move
 * @return array The moved location
 */
$move = function ($loc, $dir, $dist) {
    $x = $loc[0];
    $y = $loc[1];
    if ($dir == "0") {
        $x += $dist;
    } elseif ($dir == "2") {
        $x -= $dist;
    } elseif ($dir == "3") {
        $y += $dist;
    } elseif ($dir == "1") {
        $y -= $dist;
    }
    return [$x, $y];
};

// Parse the input and get the locations of points
$locs = [[0, 0]];
$perimeter = 0;
foreach ($lines as $line) {
    $hex = explode(")", explode(" (#", $line)[1])[0];
    $dist = hexdec(substr($hex, 0, 5));
    $dir = $hex[strlen($hex) - 1];
    $perimeter += $dist;
    array_push($locs, $move(end($locs), $dir, $dist));
}

// Calculate the area of the polygon us
$sum = 0;
for ($i = 0; $i < count($locs) - 1; $i++) {
    $x1 = $locs[$i][0];
    $y1 = $locs[$i][1];
    $x2 = $locs[$i + 1][0];
    $y2 = $locs[$i + 1][1];
    $sum += ($x1 * $y2) - ($x2 * $y1);
}

// Finish the calculation and add the perimeter and 1
$sum = abs($sum / 2) + $perimeter / 2 + 1;

echo "Part 2: " . $sum;
?>
