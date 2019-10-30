zipTogether :: [a] -> [b] -> [(a, b)]

zipTogether [] [] = []
zipTogether [] ys = []
zipTogether xs [] = []
-- zipTogether xs ys = (head xs, head ys) : (zipTogether (tail xs) (tail ys))
zipTogether (x:xs) (y:ys) = (x, y) : (zipTogether xs ys)
