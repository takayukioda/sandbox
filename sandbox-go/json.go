package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	parse()
	stringify()
}

func parse() {
	type Product struct {
		Name  string `json:"name"`
		Price int64 `json:"price"`
	}

	fmt.Println("Unmarshal json blob into structed object; same as JSON.parse in JavaScript")

	blob := []byte(`[
		{"name": "Silver Ring", "price":94320},
		{"name": "Wooden Ring", "price":943.0}
	]`)
	/** can't parse second `price` because it's in float format; show error message but process will continue, returning 0 instead */

	var products []Product
	err := json.Unmarshal(blob, &products)
	if err != nil {
		fmt.Println("Error: ", err)
	}
	fmt.Printf("%+v", products)
}

func stringify() {
	fmt.Println("Marshal structed object into json string; same as JSON.stringify in JavaScript")
	type User struct {
		ID int `json:"id"`
		GroupIds []int `json:"group_ids"`
		Name string `json:"name"`
		Comment string `json:"comment,omitempty"`
	}

	users := []User{
		User{ ID: 0, GroupIds: []int{0}, Name: "/" },
		User{ ID: 999, GroupIds: []int{9,23,999}, Name:"takayukioda", Comment:"Owner Account"}}
	blob, err := json.Marshal(users)
	if err != nil {
		fmt.Println("Error: ", err)
	}
	fmt.Println(string(blob[:]))
}
