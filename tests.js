function pOrderedTests(num,dice) {
	for (let i = 1; i < num; i++) {
		console.log("Test " + i + ":")
		console.log("Dice: " + dice + ", sum: " + i)
		let testing = probability(i,dice,10).toPrecision(8)
		let controlling = preciseCalc(i,dice).toPrecision(8)
		console.log(" ")
		console.log("testing:")
		console.log(testing)
		console.log("controlling:")
		console.log(controlling)
		console.log(" ")
		if(typeof testing !== typeof controlling) console.error("Uhh, this is akward.")
		if(testing === controlling) {console.log("%c Success ☺", "background-color:#00000; color:#00ff00")}
		else {
			console.log("%c Failed", "background-color:#000000; color:#ff0000")
		}
		console.log(" ")
		console.log(" ")
	}
}
function randomisedTests(num,maxDice,minDice) {
	for (let i = 1; i < num; i++) {
        let dice = randomNum(minDice,maxDice)
        let points = randomNum(dice,dice*10)
		console.log("Test " + i + ":")
		console.log("Dice: " + dice + ", sum: " + points)
		let testing = probability(i,dice,10).toPrecision(8)
		let controlling = preciseCalc(i,dice).toPrecision(8)
		if(typeof testing !== typeof controlling) console.error("Uhh, this is akward.")
		if(testing === controlling) {console.log("%c Success ☺", "background-color:#00000; color:#00ff00")}
		else {
			console.log("%c Failed", "background-color:#000000; color:#ff0000")
            console.warn("Failed. Info: ")
            console.warn({testing,controlling,dice,points})
		}
		console.log(" ")
	}
}


function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}

function preciseCalc(castNumber,dice) {
	if (castNumber === 0) { return "undefined" }
	if (dice === 0) { return "undefined" }

	let possiblities = Math.pow(10, dice)
	return nestedForLoop(dice, castNumber)  / possiblities
}
function nestedForLoop(dice, sum, current, stepsIn) {
	stepsIn = stepsIn || 0
	current = current || 0
	let works = 0
	if (stepsIn + 1 == dice) {
		for (let i = 1; i <= 10; i++) {
			if (current + i == sum) works++
		}
		return works
	}

	for (let i = 1; i <= 10; i++) {
		works += nestedForLoop(dice, sum, current + i, stepsIn + 1)
	}
	return works
}