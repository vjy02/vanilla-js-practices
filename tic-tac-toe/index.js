function main(){
    let currentTurn = "O"
    const boxNodes = document.getElementsByClassName("box")
    const winPopupNode = document.getElementById("win-popup")
    addBoxListeners(boxNodes, winPopupNode, currentTurn)
}

function addBoxListeners(boxNodes, winPopupNode, currentTurn){
    Object.values(boxNodes).forEach((boxNode)=>{
        boxNode.addEventListener("click", (e)=>{
            if (boxNode.textContent === ""){
                if (currentTurn === "O"){
                    e.target.textContent = "O"
                }
                else{
                    e.target.textContent = "X"
                }
                if (checkWinConditions()){
                    const winMessage = `${currentTurn} Wins!`
                    winPopupNode.textContent = winMessage
                    Object.values(boxNodes).forEach((boxNode) => boxNode.classList.toggle("disabled"))
                }
                currentTurn = currentTurn === "O" ? "X" : "O"
            }
        })
    })
}

// Win condition: 
// - Rows, Cols, Diagonals
function checkWinConditions(){
    const boxNodeArr = Object.values(boxNodes)

    // Rows
    // i = 0 - 2, 3 - 5, 6 - 8'
    for(let i = 0; i < 7; i += 3){
        if (boxNodeArr[i].textContent === "") continue
        if (boxNodeArr[i].textContent === boxNodeArr[i+1].textContent &&
            boxNodeArr[i].textContent === boxNodeArr[i+2].textContent){
            return true
        }
    }

    // Cols
    // i = 0, 3, 6 OR 1, 4, 7 OR 2, 5, 8
    for(let i = 0; i < 3; i++){
        if (boxNodeArr[i].textContent === "") continue
        if (boxNodeArr[i].textContent === boxNodeArr[i+3].textContent &&
            boxNodeArr[i].textContent === boxNodeArr[i+6].textContent){
            return true
        }
    }

    // Diagonals
    // i = 0, 4, 8 OR 2, 4, 6
    if (boxNodeArr[0].textContent === boxNodeArr[4].textContent &&
        boxNodeArr[0].textContent === boxNodeArr[8].textContent && 
        boxNodeArr[0].textContent !== "" ||
        boxNodeArr[2].textContent === boxNodeArr[4].textContent &&
        boxNodeArr[2].textContent === boxNodeArr[6].textContent &&
        boxNodeArr[2].textContent !== ""){
        return true
    }
    return false
}


main()

