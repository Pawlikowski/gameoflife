var komorki = []; // tworzenie tablicy przechowywującej wszystkie komórki
var czyszczacy = document.getElementById("clear"); // pobranie przycisku do czyszczenia
var rozpoczynajacy = document.getElementById("start"); // pobranie przycisku do 
// ^ rozpoczęcia symulacji
var zatrzymujacy = document.getElementById("stop");
zatrzymujacy.setAttribute("disabled", "disabled");

function ustaw() {
	if (this.style.backgroundColor == "black") {
		this.style.backgroundColor = "white";
		this.style.border = "1px solid black";
	} else {
		this.style.backgroundColor = "black";
		this.style.border = "1px solid white";
	}
} // oznaczanie komórki


for (var i = 1; i <= 2500; i++) {
	if (i % 50 == 0 || i == 1) {
		komorki.push([]);
	}
	var nazwa = "numer" + i.toString();
	var komorka = document.getElementById(nazwa);
	komorka.onclick = ustaw;
	var ktora = Math.floor((i - 1) / 50);
	komorki[ktora].push(komorka);
} // pobieranie z dokumentu Html wszystkich komórek i zapisywanie ich do tablicy z komórkami
console.log(komorki);

function czysc() {
	for (var a = 0; a < komorki.length; a++) {
		for (var b = 0; b < komorki[a].length; b++) {
			if (komorki[a][b].style.backgroundColor == "black") {
				komorki[a][b].style.backgroundColor = "white";
				komorki[a][b].style.border = "1px solid black";
			}
		}
	}
} // przywracanie pierwotnego stanu tablicy z komórkami

czyszczacy.onclick = czysc;

function liczSasiadow(x, y) {
	var sasiedzi = 0;

	if (y - 1 != -1) {
		var l = komorki[x][y - 1];
		if (l.style.backgroundColor == "black") {
			sasiedzi++;
		}
	}

	if (y + 1 <= 49) {
		var p = komorki[x][y + 1];
		if (p.style.backgroundColor == "black") {
			sasiedzi++;
		}
	}

	if (x - 1 != -1) {
		var g = komorki[x - 1][y];
		if (g.style.backgroundColor == "black") {
			sasiedzi++;
		}
	}

	if (x + 1 <= 49) {
		var d = komorki[x + 1][y];
		if (d.style.backgroundColor == "black") {
			sasiedzi++;
		}
	}

	if (x - 1 != -1 && y - 1 != -1) {
		var lg = komorki[x - 1][y - 1];
		if (lg.style.backgroundColor == "black") {
			sasiedzi++;
		}
	}

	if (x - 1 != -1 && y + 1 <= 49) {
		var lp = komorki[x - 1][y + 1];
		if (lp.style.backgroundColor == "black") {
			sasiedzi++;
		}
	}

	if (x + 1 <= 49 && y - 1 != -1) {
		var ld = komorki[x + 1][y - 1];
		if (ld.style.backgroundColor == "black") {
			sasiedzi++;
		}
	}

	if (x + 1 <= 49 && y + 1 <= 49) {
		var pd = komorki[x + 1][y + 1];
		if (pd.style.backgroundColor == "black") {
			sasiedzi++;
		}
	}


	return sasiedzi;
}

var licznik = 0;
var zywe = 0;

function symuluj() {
	for (x = 0; x < 50; x++) {
		for (y = 0; y < 50; y++) {
			var liczbaSasiadow = liczSasiadow(x, y);
			if (liczbaSasiadow == 3 && komorki[x][y].style.backgroundColor != "black") {
				komorki[x][y].setAttribute("urodzi", "true");
			} else if ((liczbaSasiadow < 2 || liczbaSasiadow > 3) && komorki[x][y].style.backgroundColor == "black") {
				komorki[x][y].setAttribute("urodzi", "false");
			} else if ((liczbaSasiadow == 2 || liczbaSasiadow == 3) && komorki[x][y].style.backgroundColor == "black") {
				komorki[x][y].setAttribute("urodzi", "true");
			} else {
				komorki[x][y].setAttribute("urodzi", "false");

			}
		}
	}

	for (x = 0; x < 50; x++) {
		for (y = 0; y < 50; y++) {
			if (komorki[x][y].getAttribute("urodzi") == "true") {
				komorki[x][y].style.backgroundColor = "black";
				komorki[x][y].style.border = "1px solid white";
				zywe++;
			} else {
				komorki[x][y].style.backgroundColor = "white";
				komorki[x][y].style.border = "1px solid black";
			}
		}
	}
	licznik++;
	document.getElementById("licznik").innerHTML = licznik;
	document.getElementById("zywe").innerHTML = zywe;
	zywe = 0;
}



var timer;
var stan = document.getElementById("status");


var start = function () {
	timer = setInterval(symuluj, 100);
	rozpoczynajacy.setAttribute("disabled", "disabled");
	stan.innerHTML = "W trakcie symulowania."
	document.getElementById("zeruj").setAttribute("disabled", "disabled");
	zatrzymujacy.removeAttribute("disabled");
}

rozpoczynajacy.onclick = start;

function stop() {
	clearInterval(timer);
	rozpoczynajacy.removeAttribute("disabled");
	stan.innerHTML = "Zatrzymana.";
	document.getElementById("zeruj").removeAttribute("disabled");
	zatrzymujacy.setAttribute("disabled", "disabled");


}

zatrzymujacy.onclick = stop;

var zeruj = document.getElementById("zeruj");

function zerowanie() {
	stan.innerHTML = "Nie uruchomiona.";
	document.getElementById("licznik").innerHTML = " ";
	document.getElementById("zywe").innerHTML = " ";
	licznik = 0;
	zywe = 0;

}

zeruj.onclick = zerowanie;