rev_concat [] = []
rev_concat xs = rev_concat (tail xs) ++ [head xs]

rev_cons [] = []
rev_cons xs = last xs : rev_cons (init xs)

rev [] = []
rev (x:xs) = rev xs ++ [x]

