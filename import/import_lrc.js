function import_lrc(name, lrc_text)
{
	// "zoek" de lengte van het liedje
	let times = lrc_text.match(/\[length:(.*)\]/)[1].match(/([0-9]{2}):([0-9]{2}\.[0-9]{2})/);
	let Time = (parseFloat(times[1]) * 60) + parseFloat(times[2]);
	// match alle regels
	let lines = lrc_text.matchAll(/\[([0-9]{2}:[0-9]{2}.[0-9]{2})\](.*)/g);
	lines = Array.from(lines, m => m[0]);
	// maak de lyrics array aan
	let lyrics = [];
	for (let line of lines) {
		let tim = line.match(/\[([0-9]{2}):([0-9]{2}.[0-9]{2})\](.*)/);
		lyrics.push({
			"w": tim[3],
			"s": Math.round((parseFloat(tim[1]) * 60) + parseFloat(tim[2]))
		});
	}
	// zoek het "einde" van de regel op, i.e. het "begin" van de volgende regel (ongeveer)
	for (let i = 0; i < lyrics.length - 1; i++) {
		      lyrics[i].s = lyrics[i + 1].s;
	}
	lyrics[lyrics.length - 1] = Math.round(Time);
	// het resultaat
	res = { "Title": name, "Time": Math.round(Time), "lyrics": lyrics } ;
	// let json_el = document.getElementById("json");
	// json_el.innerHTML = syntaxHighlight(res);
	return res;
}

let quote = document.querySelector('.quote_copy');
let quote_inp = document.querySelector('.quote_inp');
let input_area = document.querySelector(".input_area");
quote.setAttribute('style', 'white-space: pre;');
input_area.addEventListener("keyup", function(event) {
	if (event.keyCode === 18) {
		event.preventDefault();
		event.stopImmediatePropagation();
		let arr = input_area.value.split("\n");
		for(let i = 0; i < arr.length; i++) {
			/*if (!arr[i] === "") {
				let tmp2 = '{ "w": "' + arr[i] + '", "s": 0 }, \r\n';
				if (i == 0) {
					quote.textContent = tmp2;
				} else {
					quote.textContent += tmp2;
				}
			} else {
				let tmp2 = "\r\n";
				if (i == 0) {
					quote.textContent = tmp2;
				} else {
					quote.textContent += tmp2;
				}
			} */
			let tmp2 = '{ "w": "' + arr[i] + '", "s": # }, \r\n';
			if (i == 0) {
				quote.textContent = tmp2;
			} else {
				quote.textContent += tmp2;
			}
		}
		quote_inp.value = quote.textContent;
		setClipboard(quote_inp.value);
	}
});

function setClipboard(value) {
    var tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}