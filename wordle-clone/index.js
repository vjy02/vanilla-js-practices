class Wordle{
    constructor(url){
        this.url = url
        this.curWordle = null
        this.won = false
        this.curGuess = ""
        this.curAttempts = 0
        this.guesses = []
        this.resultArr = []
    }

    async fetchWordle(){
        try{
            const res = await fetch(this.url)
            const data = await res.text()
            console.log(data)
            return data
        }   
        catch (err){
            throw new Error("Error found :",err)
        }
    }

    async newGame(){
        this.guesses = []
        this.won = false
        this.curGuess = ""
        this.curAttempts = 0
        this.curWordle = await this.fetchWordle()
    }

    updateCurGuess(val){
        this.curGuess = val
    }

    submitCurGuess(){
        this.guesses.push(this.curGuess)
        this.checkCurGuess()
        this.curGuess = ""
        this.curAttempts += 1
    }

    checkCurGuess(){
        this.resultArr = []
        for(let i = 0; i < this.curGuess.length; i++){
            if (this.curWordle[i] === this.curGuess[i]){
                this.resultArr.push("green")
            }
            else if (this.curWordle.includes(this.curGuess[i])){
                this.resultArr.push("yellow")
            }
            else{
                this.resultArr.push("grey")
            }
        }
        if(this.curWordle === this.curGuess){
            this.won = true
        }
    }
}

function startGame(wordle, wordleData){
    wordle.newGame()
    handleGuesses(wordle,wordleData)
}

function handleGuesses(wordle,wordleData){

    wordleData.input.addEventListener("input", (e) =>{
        wordle.updateCurGuess(e.target.value)
    })

    wordleData.input.addEventListener("keypress", (e) =>{
        if (e.target.value.length === 5 && e.key === "Enter" && 
        wordle.curAttempts < 5 && wordle.won !== true){
            wordle.submitCurGuess(e)
            printGuess(wordle, wordleData)
            wordleData.input.value = ""
        }
    })
}

function printGuess(wordle, wordleData){
    const guessWrapper = document.createElement("div")
    guessWrapper.className = "guess-wrapper"
    for(let i = 0; i < 5; i++){
        const newGuess = document.createElement("h1")
        newGuess.className = "guess-char"
        newGuess.textContent = wordle.guesses.slice(-1)[0][i]
        newGuess.style.backgroundColor = wordle.resultArr[i]
        guessWrapper.appendChild(newGuess)
    }
    
    if (wordle.won){
        wordleData.count.textContent = "You Won!"
    }
    else{
        wordleData.count.textContent = `You have ${5-wordle.curAttempts} guesses remaining`
    }
    wordleData.guesses.appendChild(guessWrapper)
   
}



const wordleData = {
    url: "https://api.frontendeval.com/fake/word",
    input: document.querySelector("#wordle-input"),
    guesses: document.querySelector("#wordle-guesses"),
    count: document.querySelector("#wordle-guesses-count")
}

const newWordle = new Wordle(wordleData.url)

startGame(newWordle, wordleData)