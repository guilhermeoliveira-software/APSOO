// Quando o formulário é enviado
document.getElementById("ticketForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const priority = document.getElementById("priority").value;
    const category = document.getElementById("category").value;
    const technician = document.getElementById("technician").value;
    const description = document.getElementById("description").value;

    const ticket = {
        id: Date.now(), // id único
        title,
        priority,
        category,
        technician,
        description,
        status: 'Pendente',
    };

    // Salva no localStorage
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));

    addTicketToTable(ticket);
    clearForm();
});

// Adiciona um chamado à tabela
function addTicketToTable(ticket) {
    const tableBody = document.getElementById("ticketTable").getElementsByTagName("tbody")[0];
    const row = tableBody.insertRow();

    row.innerHTML = `
        <td>${ticket.title}</td>
        <td>${ticket.priority}</td>
        <td><span class="status ${ticket.status}">${ticket.status}</span></td>
        <td>
            <button onclick="updateStatus(${ticket.id}, 'Em Progresso')">Em Progresso</button>
            <button onclick="updateStatus(${ticket.id}, 'Concluído')">Concluir</button>
            <button onclick="deleteTicket(${ticket.id})">Excluir</button>
        </td>
    `;
}

// Atualiza o status de um chamado
function updateStatus(id, newStatus) {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const index = tickets.findIndex(t => t.id === id);
    if (index !== -1) {
        tickets[index].status = newStatus;
        localStorage.setItem("tickets", JSON.stringify(tickets));
        loadTickets();
    }
}

// Exclui um chamado
function deleteTicket(id) {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const updatedTickets = tickets.filter(t => t.id !== id);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    loadTickets();
}

// Limpa o formulário
function clearForm() {
    document.getElementById("ticketForm").reset();
}

// Carrega os chamados existentes ao abrir a página
function loadTickets() {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const tableBody = document.getElementById("ticketTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
    tickets.forEach(ticket => addTicketToTable(ticket));
}

// Executa quando a página é carregada
window.onload = loadTickets;
