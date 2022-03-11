
let debug = false
let lowDebug = false



/**
 * @param {Number} p points
 * @param {Number} n dice
 * @param {Number} s sides
 * @returns {Number}
 */
function probability(p, n, s) {

	//taget fra https://www.lucamoroni.it/the-dice-roll-sum-problem/ som matematik, så skrev jeg det om til javascript

	if (p > n * s) return 0
	if (p < n) return 0
	let summed = 0
	for (let k = 0; k <= Math.floor((p - n) / s); k++) {
		summed += (
			Math.pow(-1, k) * binomial(n, k) * binomial(p - s * k - 1, p - s * k - n)
		)
	}
	return 1 / Math.pow(s, n) * summed
}
function sum(arr) {
	debug && console.log("sum: " + arr.length, arr)
	if (arr.length === 0) return 0
	let sum = 0
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i];
	}
	debug && console.log("sum returns " + sum)
	return sum
}


function factorial(n) {
	if (n < 0) return;
	if (n < 2) return 1;
	return n * factorial(n - 1);
}
function binomial(top, bottom) {
	return factorial(top) / (factorial(bottom) * factorial(top - bottom))
}
function multisetCoeff(top, bottom) {
	return binomial(top + bottom - 1, bottom)
}


function diffCalculate(min, dice) {
	if (dice == "all") return (
		`1 terning: ${Number((diffCalculate(min, 1) * 100).toPrecision(10))}%<br>` +
		`2 terninger: ${Number((diffCalculate(min, 2) * 100).toPrecision(10))}%<br>` +
		`3 terninger: ${Number((diffCalculate(min, 3) * 100).toPrecision(10))}%<br>` +
		`4 terninger: ${Number((diffCalculate(min, 4) * 100).toPrecision(10))}%<br>`
	)

	let sum = 0
	for (let i = min; i <= dice * 10; i++) {
		sum += probability(i, dice, 10)
	}
	return sum
}

/**
 * 
 * @param {Number} dice 
 * @returns {{
 * 		1: Number,
 * 		2: Number,
 * 		3: Number,
 * 		4: Number,	
 * }}
 */
function tzeentch(dice) {
	let returnVal = {
		minor: 0,
		major: 0,
		catastrophic: 0,
	}
	if (dice <= 1) return returnVal

	returnVal.minor = Number((0.1 * binomial(dice, 2) || 0).toPrecision(8))
	returnVal.major = Number((0.01 * binomial(dice, 3) || 0).toPrecision(8))
	returnVal.catastrophic = Number((0.001 * binomial(dice, 4) || 0).toPrecision(8))
	return returnVal
}

function stringTzeentch(dice) {
	if(dice === "all") return (
		`2 terninger:<br> ${stringTzeentch(2)}<br><br>` +
		`3 terninger:<br> ${stringTzeentch(3)}<br><br>` +
		`4 terninger:<br> ${stringTzeentch(4)}<br><br>`
	)
	let tzeentchValues = tzeentch(dice)
	return (
		`2 ens (Minor Chaos Mutation): ${tzeentchValues.minor}<br>` +
		`3 ens (Major Chaos Mutation): ${tzeentchValues.major}<br>` +
		`4 ens (Catastrophic Chaos Mutation): ${tzeentchValues.catastrophic}<br>`
	)
}


function documentCalculate() {
	let dice = Number(document.getElementById("castDice").value)
	let castNumber = Number(document.getElementById("castNumber").value)
	//difficulty
	{
		let start = window.performance.now()
		let diff
		let end
		if (document.getElementById("showAllCheckbox").checked) {

			diff = diffCalculate(castNumber, "all")
			end = window.performance.now()
		} else {
			diff = `Chance for at klare det med ${dice} terninger: ${diffCalculate(castNumber, dice) * 100}%`
			end = window.performance.now()
		}
		let timing = end - start
		if (timing === 0) timing = "under 1"
		document.getElementById("difficultyOutput").innerHTML = diff + `<br><br>Udregningen tog ${timing} millisekund(er)`
	}
	//risiko
	{
		let start = window.performance.now()
		let diff
		let end
		if (document.getElementById("showAllCheckbox").checked) {

			diff = stringTzeentch("all") + "<br><br>Risikoer for insanity point checks: <br>1 terning: 10%<br>2 terninger: 1%<br>3 terninger: 0.1%<br>4 terninger: 0.01%"
			end = window.performance.now()
		} else {
			diff = `Gennemsnitlige chaos-fejl for ${dice} terninger:<br> ${stringTzeentch(dice)}<br><br>Risiko for insanity point check: ~${Number((Math.pow(0.1,dice)*100).toPrecision(10))}%`
			end = window.performance.now()
		}
		let timing = end - start
		if (timing === 0) timing = "under 1"
		document.getElementById("failOutput").innerHTML = diff + `<br><br>Udregningen tog ${timing} millisekund(er)`
	}
}


function showAllUpdate(checked) {
	document.getElementById('castDice').disabled = checked
	document.getElementById('diceDiv').hidden = checked
	/*
	if(checked) {
	} else {
		document.getElementById('diceDiv').style.display = "block"
	}*/
}


window.addEventListener("load", (event) => {
	showAllUpdate(document.getElementById("showAllCheckbox").checked)
	debug && console.log("nu ")
})