function getChance(sides, atleast) {
	let x = 0
	for (let i = 1; i <= sides; i++) {
		if(i >= atleast) {
			x++
		}
		
	}
	let prob1 = (x / sides) * 100
	x = 0
	for (let i = 1; i <= sides; i++) {
		for (let o = 1; o <= sides; o++) {
			if(i + o >= atleast) {
				x++
			}
		}
	}
	let sidessq = sides * sides
	let prob2 = (x / sidessq) * 100
	x = 0
	for (let i = 1; i <= sides; i++) {
		for (let o = 1; o <= sides; o++) {
			for (let u = 1; u <= sides; u++) {
				if(i + o + u >= atleast) {
					x++
				}
			}
		}
	}
	let sidescu = sides * sides * sides
	let prob3 = (x / sidescu) * 100
	x = 0
	for (let i = 1; i <= sides; i++) {
		for (let o = 1; o <= sides; o++) {
			for (let u = 1; u <= sides; u++) {
				for (let y = 1; y <= sides; y++) {
					if(i + o + u + y >= atleast) {
						x++
					}
				}
			}
		}
	}
	let sidesqu = sides * sides * sides * sides
	let prob4 = (x / sidesqu) * 100


	//DARK MAGIC

	x = 0
	for (let i = 1; i <= sides; i++) {
		for (let o = 1; o <= sides; o++) {
			let ok = i + o - Math.min(i, o)
			if(ok >= atleast) {
				x++
			}
		}
		
	}
	let prob1da = (x / sidessq) * 100
	x = 0
	for (let i = 1; i <= sides; i++) {
		for (let o = 1; o <= sides; o++) {
			for (let k = 1; k <= sides; k++) {
				let ok = i + o + k - Math.min(i, o, k)
				if(ok >= atleast) {
					x++
				}
				
			}
		}
	}
	let prob2da = (x / sidescu) * 100
	x = 0
	for (let i = 1; i <= sides; i++) {
		for (let o = 1; o <= sides; o++) {
			for (let u = 1; u <= sides; u++) {
				for (let k = 1; k <= sides; k++) {
					let ok = i + o + u + k - Math.min(i, o, u, k)
					if(ok >= atleast) {
						x++
					}
				}
			}
		}
	}
	let prob3da = (x / sidesqu) * 100
	x = 0
	for (let i = 1; i <= sides; i++) {
		for (let o = 1; o <= sides; o++) {
			for (let u = 1; u <= sides; u++) {
				for (let y = 1; y <= sides; y++) {
					for (let k = 1; k <= sides; k++) {
						let ok = i + o + u + y + k - Math.min(i, o, u, k)
						if(ok >= atleast) {
							x++
						}
					}
				}
			}
		}
	}
	let sidesfem = sides * sides * sides * sides * sides
	let prob4da = (x / sidesfem) * 100



	console.log(x, prob1, prob2, prob3, prob4)

	document.getElementById("chance").innerHTML = "<p>Chancen for at klare det med 1 terning er " + prob1 + "%</p><br><p>Chancen for at klare det med 2 terninger er " + prob2 + "%</p><br><p>Chancen for at klare det med 3 terninger er " + prob3 + "%</p><br><p>Chancen for at klare det med 4 terninger er " + prob4 + "%</p>"
	document.getElementById("chance").innerHTML += "<br><p>Chancen for at klare det med 1 terning + 1 dark magic er " + prob1da + "%</p><br><p>Chancen for at klare det med 2 terninger + 1 dark magic er " + prob2da + "%</p><br><p>Chancen for at klare det med 3 terninger + 1 dark magic er " + prob3da + "%</p><br><p>Chancen for at klare det med 4 terninger + 1 dark magic er " + prob4da + "%</p>"

	/*

	loop igennem alle kombinationer
		hvis at kombinationen giver mere end





	*/





	//
	//x = 0
	//for (let i = 1; i < (sides + 1); i++) {
	//	for (let o = 1; o < (sides + 1); o++) {
	//		if((i + o) >= atleast) {
	//			x++
	//		}
	//	}
	//}
	//let prob2 = x / (sides + 1)
	//console.log(x)
	//console.log(prob1, prob2)
}