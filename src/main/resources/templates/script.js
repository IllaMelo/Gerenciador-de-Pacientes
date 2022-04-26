lsPacientes = [];

const AdicionarPaciente=()=> {
    
    var id = document.getElementById("id").value;
    var nome = document.getElementById("nome").value;
    var status = document.getElementById("status").value;
    var local = document.getElementById("local").value;
    var entrada = document.getElementById("entrada").value;
    var inicio = document.getElementById("inicio").value;
    var fim = document.getElementById("fim").value;
    var saida = document.getElementById("saida").value;

    url = `nome=${nome}&status=${status}&local=${local}&entrada=${entrada}&inicio=${inicio}&fim=${fim}&saida=${saida}`;
    
    const fields = document.getElementsByTagName("input")
    for(i=0;i<=fields.length-3;i++){
        if (fields[i+1].value = ""){
            alert("Preencha todos os dados.")
            return;
        }
        
    }
        
    
    const xhttpaciente = new XMLHttpRequest()
    if (id =="") {
        xhttp.open("POST", "/demo/add?" + url)
    } else {
        xhttp.open("PUT", `/demo/atualizar/${id}?${url}`)
    }
    xhttp.send();
    xhttp.onload =  ()=> {
        msg = this.responseText
        alert(msg)
        AtualizarTabela()
        if (msg.substring(0, 2) == 'Ok') {
            LimparCampos()
        }

    }
}


const LimparCampos=()=>{
    const fields = document.getElementsByTagName("input")
    for(i=0;i<=fields.length-4;i++){
        fields[i].value = ""
    }
}

const AtualizarTabela=()=> {
    const xhttpaciente = new XMLHttpRequest();
    xhttp.open("GET", "/demo/all");
    xhttp.send();
    xhttp.onload = ()=> {
        lsPacientes = JSON.parse(this.responseText);
        CarregarPagina(0);
        
    }
}


const CarregarPagina=(pg)=> {
    qtPagina = lsPacientes.length / 5;
    if (qtPagina % 5 > 0) {
        qtPagina++;
    }
    qtPagina = parseInt(qtPagina);
    if (qtPagina > 1) {
        anterior = (pg == 0) ? 0 : pg - 1;
        proxima = (pg == qtPagina - 1) ? qtPagina - 1 : pg + 1;
        txtPaginas = 
        `<li class="page-item " onclick='carregarPagina(${anterior})'>
        <a class="page-link" href="#"><</a>
        </li>`
        for (i = 1; i <= qtPagina; i++) {
            txtPaginas += `<li class="page-item `
            if (i - 1 == pg) {
                txtPaginas += "active"
            }
            txtPaginas += `" onclick='carregarPagina(${i - 1})' >
            <a class="page-link" href="#">${i}</a></li>`
        }
        txtPaginas += 
        `<li class="page-item" onclick='carregarPagina(${proxima})'>
        <a class="page-link" href="#">></a></li>`
        document.getElementById("lsPagina").innerHTML = txtPaginas
    }
    

    Linha = "";
    pg = 5 * pg;
    for (i = pg; i <= pg + 4; i++) {
        paciente = lsPacientes[i];
        if (paciente != undefined) {
            Linha += 
            `<tr onclick='carregarPaciente(${i})'>
            <td>${paciente.id}</td>
            <td>${paciente.nome}</td>
            <td class='stat-color'>${paciente.status}</td>
            <td>${paciente.local}</td>
            <td>${paciente.entrada}</td>
            <td>${paciente.inicio}</td>
            <td>${paciente.fim}</td>
            <td>${paciente.saida}</td>
            </tr>`

            if (pacient.status=='Pré-Operatório'){
                document.getElementsByClassName("stat-color")[i].style.backgroundColor = 'yellow'
        
            }else if (pacient.status=='Transferido'){
                document.getElementsByClassName("stat-color")[i].style.backgroundColor = 'blue'
        
            }else if (pacient.status=='Em Cirurgia'){
                document.getElementsByClassName("stat-color")[i].style.backgroundColor = 'red'
            }else if (pacient.status=='Em Recuperação'){
                document.getElementsByClassName("stat-color")[i].style.backgroundColor = 'green'
        }
        }
    }
    document.getElementById("tbCorpo").innerHTML=Linha;
}

const CarregarPaciente=(i)=> {
    paciente = lsPacientes[i]
    document.getElementById("id").value=paciente.id
    document.getElementById("nome").value = paciente.nome 
    document.getElementById("local").value = paciente.local
    document.getElementById("entrada").value= paciente.entrada 
    document.getElementById("inicio").value=paciente.inicio 
    document.getElementById("fim").value= paciente.fim
    document.getElementById("saida").value= paciente.saida
    
}

const ApagarPaciente=()=> {
    id = document.getElementById("id").value;
    if (id == "") {
        alert("Selecione um registro!");
        return;
    }
    if (!confirm("Deseja apagar esse registro?")) {
        return;
    }

    const xhttpaciente = new XMLHttpRequest();
    xhttp.open("DELETE", "/demo/excluir/" + id);
    xhttp.send();
    xhttp.onload = ()=> {
        alert(this.responseText);
        AtualizarTabela();
        LimparCampos();
    }
}
AtualizarTabela()
