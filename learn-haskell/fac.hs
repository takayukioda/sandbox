facA :: Integer -> Integer
facA 0 = 1
facA n = n * facA (n - 1)


facB 0 = 1
facB n = foldr (*) 1 [1..n]
