let index = 0;

let resistor = 0;
let capacitor = 0;
let voltage = 0;

function setup() {
    let _resistorUnits = [ "ohm", "Kohm", "Mohm", "Gohm" ];

    let _resistorUnit = document.getElementById("runit");

    for (let i = 0; i < _resistorUnits.length; i++) {
        let _option = document.createElement("option");
        
        _option.setAttribute("value", Math.pow(10, i * 3));
        _option.appendChild(document.createTextNode(_resistorUnits[i]));

        _resistorUnit.appendChild(_option);

    }

    let _capacitorUnits = [ "F", "mF", "uF", "nF", "pF" ];

    let _capacitorUnit = document.getElementById("cunit");

    for (let i = 0; i < _capacitorUnits.length; i++) {
        let _option = document.createElement("option");
        
        _option.setAttribute("value", Math.pow(10, i * 3));
        _option.appendChild(document.createTextNode(_capacitorUnits[i]));

        _capacitorUnit.appendChild(_option);

    }

}

function generateTable() {
    
    let tableDiv = document.getElementById("tableDiv");
    tableDiv.setAttribute("style", "visibility: visible");

    //Pulisco la tabella
    let _table = document.getElementById("tableResults");
    _table.innerHTML = "";
    //------------------

    index = 1; //Azzero il contatore

    let _capacitorUnit = document.getElementById("cunit").value;
    let _resistorUnit = document.getElementById("runit").value;

    resistor = Number(document.getElementById("r").value) * _resistorUnit;
    capacitor = Number(document.getElementById("c").value) / _capacitorUnit;
    voltage = Number(document.getElementById("v").value);

    /*if (isNaN(_r) || isNaN(_c) || isNaN(voltage)) {

        alert("Inserire numeri validi!!");
        return;

    }*/

    let _ft = Math.round(1 / (2 * 3.14 * resistor * capacitor)); //Calcolo la frequenza di taglio

    let _offset = [1, 3, 5, 8];

    let _pow = 0;

    console.log(_ft);

    setupTable();
    for (let i = 0; i < 20; i++) {

        if (i % 4 == 0 && i != 0)
            _pow++;
        addToTable(_offset[i % 4] * Math.pow(10, _pow));

    }
    addToTable(Math.round(_ft * 0.01));
    addToTable(Math.round(_ft * 0.1));
    addToTable(Math.round(_ft));
    addToTable(Math.round(_ft * 10));
    addToTable(Math.round(_ft * 100));

}

function addToTable(f) {
    let _table = document.getElementById("tableResults");
    let _tableRow = document.createElement("tr");
    let _tableCell;

    let w = 2 * 3.14 * f;

    let _module = round(mod(w));
    let _phase = round(phase(w));
    let _logf = round(Math.log10(f));
    let _a = round(_module / voltage);
    let _adb = round(20 * Math.log10(Math.abs(_a)));

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode(index)); //Aggiunge l'index alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode(f)); //Aggiunge la frequenza alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode(_logf)); //Aggiunge log f alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode(voltage)); //Aggiunge Vin alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode(_module)); //Aggiunge Vout alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode(_a)); //Aggiunge A alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode(_adb)); //Aggiunge A|db alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode(_phase)); //Aggiunge A|db alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _table.appendChild(_tableRow); //Aggiunge la riga alla tebella
    index++;
}

function setupTable() {
    let _table = document.getElementById("tableResults");
    let _tableRow = document.createElement("tr");
    let _tableCell;

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode("indice")); //Aggiunge l'index alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode("frequenza (f)")); //Aggiunge la frequenza alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode("Log f")); //Aggiunge log f alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode("Vin")); //Aggiunge Vin alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode("Vout")); //Aggiunge Vout alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode("A = Vout/Vin")); //Aggiunge A alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode("A|db")); //Aggiunge A|db alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _tableCell = document.createElement("td");
    _tableCell.appendChild(document.createTextNode("Fase")); //Aggiunge A|db alla tabella
    _tableRow.appendChild(_tableCell); //Aggiunge la cella alla riga

    _table.appendChild(_tableRow); //Aggiunge la riga alla tebella
}

function mod(w) {

    let _m = voltage / Math.sqrt(1 + Math.pow(resistor * capacitor * w, 2));

    return _m;
}

function phase(w) {

    let _phi = Math.atan(resistor * capacitor * w);
    let _deg = _phi * 180 / 3.14;

    return _deg;
}

function round(valore) {
    var ris = valore * Math.pow(10, 3);
    ris = Math.round(ris);
    return ris / Math.pow(10, 3);
}

function getlength(number) {
    return number.toString().length;
}