let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

function init() {
    render();// Spiel starten
}

// Funktion zum Rendern der Tic Tac Toe Tabelle
function render() {
    let container = document.getElementById('contain');
    let table = '<table>';
    for (let i = 0; i < 3; i++) {
        table += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let value = fields[index] ? fields[index] : '';
            table += `<td onclick="onCellClick(${index})">${value}</td>`;
        }
        table += '</tr>';
    }
    table += '</table>';
    container.innerHTML = table;
}

// Funktion, die aufgerufen wird, wenn ein Zelle angeklickt wird
function onCellClick(index) {
    // Überprüfen, ob das Feld bereits belegt ist
    if (fields[index] !== null) {
        return;
    }

    // Wechseln zwischen 'o' und 'x'
    fields[index] = currentPlayer === 'x' ? 'o' : 'x';

    // Hier können weitere Funktionen aufgerufen werden, um das Spiel zu überprüfen (z.B. Gewinnbedingungen)
    // ...

    // Neu rendern, um den aktualisierten Zustand anzuzeigen
    render();
}


