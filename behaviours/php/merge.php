<?php

$Arr = array(
	'a' => 'vAlue',
	'b' => 'vAlue',
	'x' => 'vAlue',
);

$Brr = array(
	'v' => 'Balue',
	'w' => 'Balue',
	'x' => 'Balue',
);

print_r($Arr);
print_r($Brr);

echo 'merge ($Arr, Brr)';
print_r(array_merge($Arr, $Brr));
echo 'merge ($Brr, Arr)';
print_r(array_merge($Brr, $Arr));

echo '$Arr + $Brr';
print_r($Arr + $Brr);
echo '$Brr + $Arr';
print_r($Brr + $Arr);

/**
$ php -v
PHP 5.5.13 (cli) (built: Jun  6 2014 05:25:04) 
Copyright (c) 1997-2014 The PHP Group
Zend Engine v2.5.0, Copyright (c) 1998-2014 Zend Technologies

$ php merge.php
Array
(
    [a] => vAlue
    [b] => vAlue
    [x] => vAlue
)
Array
(
    [v] => Balue
    [w] => Balue
    [x] => Balue
)
merge ($Arr, Brr)Array
(
    [a] => vAlue
    [b] => vAlue
    [x] => Balue
    [v] => Balue
    [w] => Balue
)
merge ($Brr, Arr)Array
(
    [v] => Balue
    [w] => Balue
    [x] => vAlue
    [a] => vAlue
    [b] => vAlue
)
$Arr + $BrrArray
(
    [a] => vAlue
    [b] => vAlue
    [x] => vAlue
    [v] => Balue
    [w] => Balue
)
$Brr + $ArrArray
(
    [v] => Balue
    [w] => Balue
    [x] => Balue
    [a] => vAlue
    [b] => vAlue
)
 */
