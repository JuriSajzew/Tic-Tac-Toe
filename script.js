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
    const container = document.getElementById('contain');
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const fieldValue = fields[index] ? fields[index] : '';
            tableHtml += `<td onclick="onCellClick(${index})">${fieldValue}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    container.innerHTML = tableHtml;
}

// Funktion zum Setzen eines Kreuzes oder Kreises in das Feld
function onCellClick(index) {
    if (!fields[index]) {
        fields[index] = generateAnimatedCross(); // Hier kannst du auch 'x' für Kreis setzen
        render();
        // Hier kannst du die Logik für den Spielablauf, wie z.B. Gewinnüberprüfung, einfügen
    }
}

function generateAnimatedCircle() {
    const circleColor = "#00B0EF";
    const width = 70;
    const height = 70;
    const animationDuration = 125; // Geschwindigkeit der Animation in ms
  
    const svgHtml = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2 - 2}" fill="${circleColor}" stroke="none">
          <animateTransform attributeName="transform" type="rotate" from="0 ${width / 2} ${height / 2}" to="360 ${width / 2} ${height / 2}" dur="${animationDuration}ms" repeatCount="indefinite" />
        </circle>
      </svg>
    `;
  
    return svgHtml;
  }

  function generateAnimatedCross() {
    const crossColor = "#FFC000";
    const width = 70;
    const height = 70;
    const animationDuration = 125; // Geschwindigkeit der Animation in ms
  
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
  
  
  
  