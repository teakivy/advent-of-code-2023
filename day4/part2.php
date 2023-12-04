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
 * Find the number of matches between two arrays
 * @param array $arr1 The first array
 * @param array $arr2 The second array
 * @return int The number of matches
 */
$countMatches = function ($arr1, $arr2) {
    $matches = 0;
    for ($i = 0; $i < count($arr1); $i++) {
        for ($j = 0; $j < count($arr2); $j++) {
            if ($arr1[$i] == $arr2[$j]) {
                $matches++;
            }
        }
    }
    return $matches;
};

// Create an array of cards
$cards = array();

for ($i = 0; $i < count($lines); $i++) {
    // Split the winning numbers and my numbers into arrays
    $winningNumbers = array();
    $nums = explode(": ", explode(" | ", $lines[$i])[0])[1];
    $winningNumbers = $intSplitOnSpaces($nums);

    $myNumbers = array();
    $nums = explode(" | ", explode(": ", $lines[$i])[1])[1];
    $myNumbers = $intSplitOnSpaces($nums);

    // Add the card to the array
    $cards[$i] = array(
        "copies" => 1,
        "winningNumbers" => $winningNumbers,
        "myNumbers" => $myNumbers
    );
}

// Count the number of matches for each card and add the number of copies to the next card(s) based on the number of matches
for ($i = 0; $i < count($cards); $i++) {
    $matches = $countMatches($cards[$i]["winningNumbers"], $cards[$i]["myNumbers"]);

    for ($j = 0; $j < $matches; $j++) {
        $cards[$i + $j + 1]["copies"] += $cards[$i]["copies"];
    }
}

// Sum the number of copies for all cards
$sum = 0;
for ($i = 0; $i < count($cards); $i++) {
    $sum += $cards[$i]["copies"];
}

echo "Part 2: " . $sum;

?>
