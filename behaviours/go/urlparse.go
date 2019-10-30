package main

import (
	"fmt"
	"net/url"
)

func main() {
	const base = "https://example.com/"
	const apath = "/absolute/path/to/something"
	const rpath = "relative/path/to/another"

	fmt.Println("base url", base)
	fmt.Println("absolute path", apath)
	fmt.Println("relative path", rpath)
	fmt.Println()

	u, _ := url.Parse(base)
	fmt.Printf("%#v\n", u)
	fmt.Println("base.String()", u.String())
	fmt.Println()

	au, _ := u.Parse(apath)
	fmt.Printf("%#v\n", au)
	fmt.Println("absolute.String()", au.String())
	fmt.Println()

	ru, _ := u.Parse(rpath)
	fmt.Printf("%#v\n", ru)
	fmt.Println("relative.String()", ru.String())
	fmt.Println()

	rau, err := ru.Parse(apath)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Printf("%#v\n", rau)
	fmt.Println("relative.aboslute.String()", rau.String())
	fmt.Println()

	aru, err := au.Parse(rpath)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Printf("%#v\n", aru)
	fmt.Println("aboslute.relative.String()", aru.String())
	fmt.Println()
}
