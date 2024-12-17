var nombre1;
var nombre2;

function guardarNombres() {
    nombre1 = document.getElementById("nombre1").value || "Jugador 1";
    nombre2 = document.getElementById("nombre2").value || "Jugador 2";
    alert(`Nombres guardados: ${nombre1} y ${nombre2}`);
}

function iniciarJuego() {
    document.querySelector('.contenedor').style.display = 'none';
}

function principal() {
    var ban = 0;
    var emp = 0;
    var art = document.getElementsByTagName("article");
    var btnJugar = document.getElementById("inicio");
    var btnGuardarNombres = document.getElementById("guardar-nombres");

    btnGuardarNombres.onclick = guardarNombres;
    btnJugar.onclick = iniciarJuego;

    for (var i = 0; i < art.length; i++) {
        art[i].firstChild.onclick = marcar;
    }

    function marcar(e) {
        var a = window.event || e;
        var pos = a.target || a.srcElement;
        var p = document.getElementById(pos.id);
        if (p.innerHTML === "") {
            if (ban === 0) {
                p.innerHTML = "X";
                p.className = "X";
                ban = 1;
            } else {
                p.innerHTML = "O";
                p.className = "O";
                ban = 0;
            }
            emp++;
            ganar();
        }
    }

    function ganar() {
        var fila = document.getElementsByTagName("p");
        var combinaciones = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
            [0, 4, 8], [2, 4, 6]             // Diagonales
        ];

        for (var i = 0; i < combinaciones.length; i++) {
            var [a, b, c] = combinaciones[i];
            if (fila[a].innerHTML === fila[b].innerHTML && fila[b].innerHTML === fila[c].innerHTML && fila[a].innerHTML !== "") {
                fila[a].parentNode.style.backgroundColor = "rgba(255,255,255,0.75)";
                fila[b].parentNode.style.backgroundColor = "rgba(255,255,255,0.75)";
                fila[c].parentNode.style.backgroundColor = "rgba(255,255,255,0.75)";
                ban = 3;
                var sim = fila[a].innerHTML === 'X' ? nombre1 : nombre2;
                menu(sim);
                return;
            }
        }

        if (emp === 9) {
            ban = 4;
            menu("Empate");
        }
    }

    function menu(ganador) {
        var cont = document.getElementsByClassName("contenedor")[0];
        var h2 = document.getElementsByTagName("h2")[0];
        cont.style.display = "grid";
        if (ganador === "Empate") {
            h2.innerHTML = "¡Empate!";
        } else {
            h2.innerHTML = `¡${ganador} gana!`;
        }
        emp = 0;
        var btnJugar = document.getElementById("inicio");
        btnJugar.onclick = limpiar;
    }

    function limpiar() {
        var fila = document.getElementsByTagName("p");
        for (var i = 0; i < fila.length; i++) {
            fila[i].innerHTML = "";
            fila[i].className = "";
            fila[i].parentNode.style.backgroundColor = "";
        }
        var cont = document.getElementsByClassName("contenedor")[0];
        cont.style.display = "none";
        principal();
    }
}

window.addEventListener("load", principal, false);
