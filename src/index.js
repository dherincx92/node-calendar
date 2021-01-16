import { Calendar } from "calendar";
import * as d3 from "d3";

// need "./" for webpack to work
import "./index.css";


let cal = new Calendar();
// outputs an array of length `n`, where n = # of weeks in month
let weeks = cal.monthDays(2021, 0)

// start of d3 work
let table = d3.select("#calendar")

// create calendar in <table />
weeks.forEach(wk => {
    table
        .append('tr')
        .selectAll('td') // selects items that don't yet exist and that's intentional
        .data(wk)
        .enter()
        .append('td') // based on `wk`, we now append that item we selected
        .attr('class', day => {
            return day > 0 ? 'valid' : 'empty' // see CSS for `td.empty`
        })
        .text(day => {
            return day > 0 ? day : ''
        })
})

// add event handlers to highlight/de-highlight a specific <td /> when user
// hovers over it
d3.selectAll('td')
    .filter(".valid") // only highlight cells that are a valid day
    .on("mouseover", function() {
        d3.select(this).style("background-color", "#800080") // purple color
    })
    .on("mouseout", function(){
        d3.select(this).style("background-color", "white")
    })
    .on("click", function() {
        const item = d3.select(this).node()
        let day = item.innerHTML
        alert(`You clicked on day ${day}!`)
    })

