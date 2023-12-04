<?php
// Open the file and read it as lines
$myfile = fopen("input.txt", "r") or die("Unable to open file!");
$input = fread($myfile,filesize("input.txt"));
fclose($myfile);
$lines = explode("\n", $input);

/**
 * Split a string on spaces and convert each element to an int
 * @param string $str The string to split
 * @return array The array of ints
 */
$intSplitOnSpaces = function($str) {
    $arr = explode(" ", $str);
    for ($i = 0; $i < count($arr); $i++) {
        if ($arr[$i] == "") {
            array_splice($arr, $i, 1);
            $i--;
            continue;
        }
        $arr[$i] = (int)$arr[$i];
    }
    return $arr;
};

/**
 * Find the matches between two arrays
 * @param array $arr1 The first array
 * @param array $arr2 The second array
 * @return array The array of matches
 */
$findMatches = function ($arr1, $arr2) {
    $matches = array();
    for ($i = 0; $i < count($arr1); $i++) {
        for ($j = 0; $j < count($arr2); $j++) {
            if ($arr1[$i] == $arr2[$j]) {
                array_push($matches, $arr1[$i]);
            }
        }
    }
    return $matches;
};

// Find the winning numbers of all the cards
$winningNumbers = array();
for ($i = 0; $i < count($lines); $i++) {
    $nums = explode(": ", explode(" | ", $lines[$i])[0])[1];
    $winningNumbers[$i] = $intSplitOnSpaces($nums);
}

// Find my numbers for all the cards
$myNumbers = array();
for ($i = 0; $i < count($lines); $i++) {
    $nums = explode(" | ", explode(": ", $lines[$i])[1])[1];
    $myNumbers[$i] = $intSplitOnSpaces($nums);
}

// Count the number of points for each card and add them up (2^matches - 1)
$sum = 0;
for ($i = 0; $i < count($winningNumbers); $i++) {
    $match = $findMatches($winningNumbers[$i], $myNumbers[$i]);
    if (count($match) == 0) {
        continue;
    }
    $sum += 2 ** (count($match) - 1);

}

echo "Part 1: " . $sum;

?>
