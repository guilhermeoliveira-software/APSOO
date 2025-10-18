
document.getElementById("ticketForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const priority = document.getElementById("priority").value;
    const category = document.getElementById("category").value;
    const technician = document.getElementById("technician").value;
    const description = document.getElementById("description").value;
    const comentaryUser = "";

    const ticket = {
        id: Date.now(), // id único
        title,
        priority,
        category,
        technician,
        description,
        comentaryUser,
        status: 'Pendente',
    };

   
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));

    addTicketToTable(ticket);
    clearForm();
});

function mostrarChamados(){

    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const tableBody = document.getElementById("ticketTable").getElementsByTagName("tbody")[0];
    const row = tableBody.insertRow();

    const id = tickets.map(t => t.id).join(",");
    const title = tickets.map(t => t.title).join(", ");
    const priority = tickets.map(t => t.priority).join(", ");
    const status = tickets.map(t => t.status).join(",");
   
    if(document.title == "User-Area"){
        row.innerHTML = `
            <td>${title}</td>
            <td>${priority}</td>
            <td><span class="status ${status}">${status}</span></td>
            <td>
                <button onclick="fazerComentario(${id})" style="background-color: green;
            color: white;">Fazer Comentários</button>
            </td>
        `;
    } else {
        row.innerHTML = `
            <td>${title}</td>
            <td>${priority}</td>
            <td><span class="status ${status}">${status}</span></td>
            <td>
                <button onclick="updateStatus(${id}, 'Em Progresso')">Em Progresso</button>
                <button onclick="updateStatus(${id}, 'Concluído')">Concluir</button>
            </td>
        `;
    }
}

function addTicketToTable(ticket) {
    const tableBody = document.getElementById("ticketTable").getElementsByTagName("tbody")[0];
    const row = tableBody.insertRow();

    if (document.title == "Admin-area") {
        row.innerHTML = `
        <td>${ticket.title}</td>
        <td>${ticket.priority}</td>
        <td><span class="status ${ticket.status}">${ticket.status}</span></td>
        <td>
            <button onclick="deleteTicket(${ticket.id})" style="background-color: red;
            color: white;">Excluir</button>
        </td>
    `;
    }

}


function updateStatus(id, newStatus) {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const index = tickets.findIndex(t => t.id === id);
    if (index !== -1) {
        tickets[index].status = newStatus;
        localStorage.setItem("tickets", JSON.stringify(tickets));
        loadTickets();
    }
}


function deleteTicket(id) {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const updatedTickets = tickets.filter(t => t.id !== id);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    loadTickets();
}


function clearForm() {
    document.getElementById("ticketForm").reset();
}


function loadTickets() {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const tableBody = document.getElementById("ticketTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
    tickets.forEach(ticket => addTicketToTable(ticket));
}


function gerarRelatorio() {
    
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      const title = tickets.map(t => t.title).join(", ");
      const priority = tickets.map(t => t.priority).join(", ");
      const category = tickets.map(t => t.category).join(", ");
      const technician = tickets.map(t => t.technician).join(", ");
      const description = tickets.map(t => t.description).join(", ");
      const critica = tickets.map(t => t.comentaryUser).join(",");

      doc.text("Relatório de Chamados de TI:", 10, 10);
      doc.text(`Títulos: ${title}`, 10, 20);
      doc.text(`Prioridades: ${priority}`, 10, 30);
      doc.text(`Categorias: ${category}`, 10, 40);
      doc.text(`Técnicos: ${technician}`, 10, 50);
      doc.text(`Descrições: ${description}`, 10, 60);
      doc.text(`Comentário do Usuário: ${critica}`, 10, 70);

      // Abre o PDF em uma nova aba
      const blobUrl = doc.output('bloburl');
      const win = window.open(blobUrl);

      // Depois que abrir, tenta imprimir automaticamente
      win.onload = () => win.print();

}

function fazerComentario(id) {

    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const index = tickets.findIndex(t => t.id === id);
    if (index !== -1) {
        tickets[index].comentaryUser = prompt("Faça sua crítica:");
        localStorage.setItem("tickets", JSON.stringify(tickets));
        loadTickets();
    }

    mostrarChamados();
    
}

window.onload = loadTickets;
