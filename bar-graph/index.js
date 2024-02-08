import { fetchData } from "./data.js"

async function init(){
    const graphData = await fetchData()
    const dataBodyNode = document.getElementById("data-body")
    const maxVal = Math.max(...graphData.map(dataPoint => dataPoint.value))
    const numBars = graphData.length
    initAxis(maxVal, numBars)
    initBars(graphData, dataBodyNode, maxVal)
}

function initAxis(maxVal, numBars){
    const yAxisNode = document.getElementById("y-axis")
    const yDivider = Math.round(maxVal / 10)

    for(let i = 10; i >= 0; i--){
        const labelNode = document.createElement("p")
        labelNode.textContent = `${yDivider * i} -`
        yAxisNode.appendChild(labelNode)
    }
}

function initBars(graphData, dataBodyNode, maxVal){
    for(let bar of graphData){
        const pxHeight = bar.value / maxVal * 400
        const barNode = document.createElement("div")
        const barLabel = document.createElement("p")
        barNode.style.height = `${pxHeight}px`
        barLabel.classList.add("bar-label")
        barLabel.textContent = bar.name
        barNode.appendChild(barLabel)
        barNode.classList.add("bar")
        dataBodyNode.appendChild(barNode)
    }
}

init()