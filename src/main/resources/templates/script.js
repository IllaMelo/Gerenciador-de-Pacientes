lsPacientes = [];

function gravar() {
    
    var id = document.getElementById("id").value;
    var nome = document.getElementById("nome").value;
    var status = document.getElementById("status").value;
    var local = document.getElementById("local").value;
    var entrada = document.getElementById("entrada").value;
    var inicio = document.getElementById("inicio").value;
    var fim = document.getElementById("fim").value;
    var saida = document.getElementById("saida").value;
    url = `nome=${nome}&status=${status}&local=${local}&entrada=${entrada}&inicio=${inicio}&fim=${fim}&saida=${saida}`;
    
    if (nome==""){
        alert("Preencha com o nome do paciente.");
        return;
    }
    const xhttp = new XMLHttpRequest();
    if (id =="") {
        xhttp.open("POST", "/demo/add?" + url);
    } else {
        xhttp.open("PUT", `/demo/atualizar/${id}?${url}`);
    }
    xhttp.send();
    xhttp.onload = function () {
        msg = this.responseText;
        alert(msg);
        atualizarTabela();
        if (msg.substring(0, 2) == 'Ok') {
            limpar();
        }

    }
}


function limpar() {
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("status").value = "";
    document.getElementById("local").value = "";
    document.getElementById("entrada").value= "";
    document.getElementById("inicio").value= "";
    document.getElementById("fim").value= "";
    document.getElementById("saida").value= "";
}

function atualizarTabela() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/demo/all");
    xhttp.send();
    xhttp.onload = function () {
        lsPacientes = JSON.parse(this.responseText);
        carregarPagina(0);
        
    }
}


function carregarPagina(pg) {
    qtPagina = lsPacientes.length / 5;
    if (qtPagina % 5 > 0) {
        qtPagina++;
    }
    qtPagina = parseInt(qtPagina);
    if (qtPagina > 1) {
        anterior = (pg == 0) ? 0 : pg - 1;
        proxima = (pg == qtPagina - 1) ? qtPagina - 1 : pg + 1;
        txtPaginas = `<li class="page-item " onclick='carregarPagina(${anterior})'><a class="page-link" href="#"><</a></li>`;
        for (i = 1; i <= qtPagina; i++) {
            txtPaginas += `<li class="page-item `;
            if (i - 1 == pg) {
                txtPaginas += "active";
            }
            txtPaginas += `" onclick='carregarPagina(${i - 1})' ><a class="page-link" href="#">${i}</a></li>`;
        }
        txtPaginas += `<li class="page-item" onclick='carregarPagina(${proxima})'><a class="page-link" href="#">></a></li>`;
        document.getElementById("lsPagina").innerHTML = txtPaginas;
    }
    

    texto = "";
    pg = 5 * pg;
    for (i = pg; i <= pg + 4; i++) {
        p = lsPacientes[i];
        if (p != undefined) {
            texto += `<tr onclick='carregarPaciente(${i})'><td>${p.id}</td><td>${p.nome}</td><td>${p.status}</td><td>${p.local}</td><td>${p.entrada}</td>
            <td>${p.inicio}</td><td>${p.fim}</td><td>${p.saida}</td></tr>`;
        }
    }
    document.getElementById("tbCorpo").innerHTML=texto;
}

function carregarPaciente(i) {
    p = lsPacientes[i];
    document.getElementById("id").value=p.id;
    document.getElementById("nome").value = p.nome ;
    document.getElementById("local").value = p.local;
    document.getElementById("entrada").value= p.entrada ;
    document.getElementById("inicio").value=p.inicio ;
    document.getElementById("fim").value= p.fim;
    document.getElementById("saida").value= p.saida;
    
}

function apagar() {
    id = document.getElementById("id").value;
    if (id == "") {
        alert("Selecione um registro!");
        return;
    }
    if (!confirm("Deseja apagar esse registro?")) {
        return;
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/demo/excluir/" + id);
    xhttp.send();
    xhttp.onload = function () {
        alert(this.responseText);
        atualizarTabela();
        limpar();
    }
}
