package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

type Standing struct {
	position             int
	played               int
	team_id              int
	team_name            string
	short_code           string
	team_logo            string
	goals                string
	goal_diff            int
	wins                 int
	lost                 int
	draws                int
	points               int
	description          string
	recent_form          string
	fairplay_points_lose string
}

type Group [4]Standing

type GroupStage struct {
	a Group
	b Group
	c Group
	d Group
	e Group
	f Group
}

func main() {
	jsonFile, err := os.Open("./json/225400.json")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully opened json file.")

	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var response map[string]interface{}
	json.Unmarshal([]byte(byteValue), &response)

	data := response["data"].([]byte)


    for i := 0; i < 4; i++ {
        var standing Standing
        json.Unmarshal(data[i], &standing)
    }


}
