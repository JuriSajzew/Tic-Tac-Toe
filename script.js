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

let currentPlayer = 'circle';
let gameEnded = false; // Neue Variable, um den Spielstatus zu verfolgen

function init() {
  render();// Spiel starten
}


function render() {
  const container = document.getElementById('contain');
  let tableHtml = '<table>';
  for (let i = 0; i < 3; i++) {
    tableHtml += '<tr>';
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j; // Korrekte Berechnung des Index
      let symbol = '';
      if (fields[index] === 'circle') {
        symbol = generateAnimatedCircle();
      } else if (fields[index] === 'cross') {
        symbol = generateAnimatedCircle();
      }
      tableHtml += `<td onclick="onCellClick(this, ${index})">${symbol}</td>`;
    }

    tableHtml += '</tr>';

  }
  tableHtml += '</table>';
  container.innerHTML = tableHtml;
}

//Funktion zum Setzen eines Kreuzes oder Kreises in das Feld
function onCellClick(cell, index) {
  if (!gameEnded && fields[index] === null) { // Nur Züge erlauben, wenn das Spiel nicht beendet ist
    fields[index] = currentPlayer;
    cell.innerHTML = currentPlayer === 'circle' ? generateAnimatedCircle() : generateAnimatedCross();
    cell.onclick = null;
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    checkGameOver(); // Nach jedem Zug das Spielende überprüfen
  }
}

function checkGameOver() {
  const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontale Kombinationen
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertikale Kombinationen
    [0, 4, 8], [2, 4, 6], // diagonale Kombinationen
  ];

  for (const combination of winCombinations) {
    const [a, b, c] = combination;
    if (fields[a] && fields[a] === fields[b] && fields[b] === fields[c]) {
      drawWinningLine(a, c);
      gameEnded = true; // Spiel beenden, da ein Spieler gewonnen hat
      return;
    }
  }

  // Überprüfen, ob alle Felder belegt sind (Unentschieden)
  if (fields.every(field => field !== null)) {
    drawWinningLine(); // Unentschieden, keine spezifische Gewinnkombination
    gameEnded = true; // Spiel beenden, da Unentschieden
  }
}

function drawWinningLine(startIndex, endIndex) {
  const container = document.getElementById('contain');
  const winningLine = document.createElement('div');
  winningLine.classList.add('winning-line');

  if (startIndex !== undefined && endIndex !== undefined) {
    // Berechne die Positionen der Start- und Endzellen
    const startCell = document.getElementsByTagName('td')[startIndex];
    const endCell = document.getElementsByTagName('td')[endIndex];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    // Zeichne die Linie
    winningLine.style.width = Math.sqrt((endRect.left - startRect.left) ** 2 + (endRect.top - startRect.top) ** 2) + 'px';
    winningLine.style.transform = `rotate(${Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left)}rad)`;
    winningLine.style.top = startRect.top + startRect.height / 2 + 'px';
    winningLine.style.left = startRect.left + startRect.width / 2 + 'px';
  }

  container.appendChild(winningLine);
}

// SVG-Generator für das Kreis-Symbol
function generateAnimatedCircle() {
  const circleStroke = "#00B0EF"; // Farbe der Linie des Kreises
  const strokeWidth = 4; // Dicke der Linie des Kreises
  const width = 70;
  const height = 70;
  const animationDuration = 325; // Geschwindigkeit der Animation in ms

  const svgHtml = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2 - strokeWidth / 2}" fill="none" stroke="${circleStroke}" stroke-width="${strokeWidth}" stroke-dasharray="${2 * Math.PI * (width / 2 - strokeWidth / 2)}" stroke-dashoffset="${2 * Math.PI * (width / 2 - strokeWidth / 2)}">
        <animate attributeName="stroke-dashoffset" from="${2 * Math.PI * (width / 2 - strokeWidth / 2)}" to="0" dur="${animationDuration}ms" repeatCount="1" fill="freeze" />
      </circle>
    </svg>
  `;

  return svgHtml;
}

// SVG-Generator für das Kreuz-Symbol
function generateAnimatedCross() {
  const crossColor = "#FFC000";
  const width = 70;
  const height = 70;
  const animationDuration = 325; // Geschwindigkeit der Animation in ms

  const svgHtml = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="10" x2="${width - 10}" y2="${height - 10}" stroke="${crossColor}" stroke-width="4">
          <animate attributeName="x2" from="10" to="${width - 10}" dur="${animationDuration}ms" fill="freeze" />
          <animate attributeName="y2" from="10" to="${height - 10}" dur="${animationDuration}ms" fill="freeze" />
        </line>
        <line x1="10" y1="${height - 10}" x2="${width - 10}" y2="10" stroke="${crossColor}" stroke-width="4">
          <animate attributeName="x2" from="10" to="${width - 10}" dur="${animationDuration}ms" fill="freeze" />
          <animate attributeName="y2" from="${height - 10}" to="10" dur="${animationDuration}ms" fill="freeze" />
        </line>
      </svg>
    `;

  return svgHtml;
}

function resetGame() {
  // Zurücksetzen des Spiels und des Spielbretts
  fields = [
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
  currentPlayer = 'circle';
  gameEnded = false;

  // Löschen der Gewinnlinie, falls vorhanden
  const winningLine = document.querySelector('.winning-line');
  if (winningLine) {
    winningLine.remove();
  }

  // Zurücksetzen des Spielbretts
  const cells = document.getElementsByTagName('td');
  for (const cell of cells) {
    cell.innerHTML = '';
    cell.onclick = function () {
      onCellClick(this, Array.prototype.indexOf.call(cells, this));
    };
  }

  // Neu rendern des Spielbretts
  render();
}
