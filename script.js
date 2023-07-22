let fields = [
    null,
    null,
    'circle',
    'circle',
    null,
    null,
    null,
    'cross',
    null,
];

function init() {
    render(); // Initial render 
}

function render() {
    let container = document.getElementById("contain");
    let table = document.createElement("table");

    for (let i = 0; i < 3; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 3; j++) {
            let cell = document.createElement("td");

            // Calculate the index in the fields array based on row and column
            let index = i * 3 + j;

            // Set the content of the cell based on the fields array
            if (fields[index] === 'circle') {
                cell.textContent = 'o';
            } else if (fields[index] === 'cross') {
                cell.textContent = 'x';
            } else {
                cell.textContent = ''; // Empty cell
            }

            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    container.innerHTML = ""; // Clear previous content
    container.appendChild(table);
}
