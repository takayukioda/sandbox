package main

import "fmt"

func main() {
	var arr [10]int = [10]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	fmt.Println("[10]int:", arr) // [ 0 1 2 3 4 5 6 7 8 9]

	var sli []int = arr[2:6]
	var copied []int = make([]int, 6-2)
	copy(copied, arr[2:6])
	fmt.Println("[]int:", sli)           // [2 3 4 5]
	fmt.Println("copied []int:", copied) // [2 3 4 5]

	// Modification
	sli[2] = 10
	fmt.Println("altered sli:", sli) // [2 3 10 5]
	fmt.Println("copied:", copied)   // [2 3 4 5]
	fmt.Println("arr:", arr)         // [ 0 1 2 3 10 5 6 7 8 9]
}
