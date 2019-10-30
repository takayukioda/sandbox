package main

import (
	"errors"
	"fmt"
)

func main() {
	s := getString()
	fmt.Println("1st string:", s)

	//  declare.go:27:4: no new variables on left side of :=
	//	s := getString()
	//	fmt.Println("2nd string:", s)

	e := getError()
	fmt.Println("1st error:", e)

	//  declare.go:33:4: no new variables on left side of :=
	//	e := getError()
	//	fmt.Println("2nd error:", e)

	str1, err := eitherStrOrErr(2)
	fmt.Println("1st string or error (string):", str1, err)

	// Only error can be over written
	str2, err := eitherStrOrErr(3)
	fmt.Println("2nd string or error (error):", str2, err)

	str1, num := eitherStrOrIntp(2)
	fmt.Println("1st string or error (string):", str1, num)

	//	./declare.go:55:12: no new variables on left side of :=
	//	str2, num := eitherStrOrIntp(3)
	//	fmt.Println("2nd string or error (intp):", str2, num)
}

func getString() string {
	return "the string"
}
func getError() error {
	return errors.New("the error")
}

func eitherStrOrIntp(n int) (string, *int) {
	if n%2 == 0 {
		return "the string", nil
	} else {
		return "", &n
	}
}

func eitherStrOrErr(n int) (string, error) {
	if n%2 == 0 {
		return "the string", nil
	} else {
		return "", errors.New("the error")
	}
}
