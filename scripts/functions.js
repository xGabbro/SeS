let index = 1;
function generateTable() {
    let _table = document.getElementById("tableResults");
    _table.innerHTML = "";
    index = 1;

    let _r = document.getElementById("r").value;
    let _c = document.getElementById("c").value;

    let _ft = Math.round(1/(2 * 3.14 * _r * _c)); //frequenza di taglio

    let _offset = [1, 3, 5, 8];

    let _pow = 0;

    addToTable(null, true); //setuppo la tabella
    for(let i = 0; i < 20; i++) {
        
        if (i % 4 == 0 && i != 0)
            _pow++;
        addToTable(_offset[i % 4] * Math.pow(10, _pow), false);
        
    }
    addToTable(Math.round(_ft * 0.01), false);
    addToTable(Math.round(_ft * 0.1), false);
    addToTable(Math.round(_ft), false);
    addToTable(Math.round(_ft * 10), false);
    addToTable(Math.round(_ft * 100), false);

}

function addToTable(f, flag) {
    let _table = document.getElementById("tableResults");
    let _tableRow = document.createElement("tr");
    let _tableCell;

    if (flag) {

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

        return;
    }

    let _r = document.getElementById("r").value;
    let _c = document.getElementById("c").value;
    let _v = document.getElementById("v").value;

    let _w = 2 * 3.14 * f;

    let _module = round(mod(_w, _r, _c, _v));
    let _phase = round(phase(_w, _r, _c));
    let _logf = round(Math.log10(f));
    let _a = round(_module / _v);
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
    _tableCell.appendChild(document.createTextNode(_v)); //Aggiunge Vin alla tabella
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

function mod(w, r, c, v) {

    let _m = v / Math.sqrt(1 + Math.pow(r * c * w, 2));

    return _m;
}

function phase(w, r, c) {

    let _phi = Math.atan(r * c * w);
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