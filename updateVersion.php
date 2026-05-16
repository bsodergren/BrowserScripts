#!/usr/bin/php
<?php

$file = file_get_contents($argv[1]);


$matched = preg_match_all('/(\/\/ @require\s+)(.*)\?(.*)/', $file, $matches, PREG_SET_ORDER);

if ($matched) {
    foreach ($matches as $match) {
        $find = $match[0];
        $replace = $match[1] . $match[2] . '?' . random_int(100000, 999999);
        $file = str_replace($find, $replace, $file);
    }
}

$matched = preg_match('/(\/\/ @version\s+)([\d\.]+)/', $file, $matches);
if (!$matched) {
    echo "Version not found in file.\n";
    exit(1);
}

$find = $matches[0];
$version = $matches[2];
$parts = explode('.', $version);

$major = (int)$parts[0];
$minor = (int)$parts[1];
$rev = (int)$parts[2];

if ($rev < 10) {
    $parts[2] = $rev + 1;
} elseif ($minor < 99) {
    $parts[1] = $minor + 1;
    $parts[2] = 0;
} else {
    $parts[0] = $major + 1;
    $parts[1] = 0;
    $parts[2] = 0;
}

//$parts[count($parts) - 1] = (int)$parts[count($parts) - 1] + 1;

$newVersion = implode('.', $parts);
$replace = $matches[1] . $newVersion;

$fileContents = str_replace($find, $replace, $file);
file_put_contents($argv[1], $fileContents);
