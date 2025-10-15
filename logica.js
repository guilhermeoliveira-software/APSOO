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
        </td>
    `;
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

function clearForm() {
    document.getElementById("ticketForm").reset();
}

function loadTickets() {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const tableBody = document.getElementById("ticketTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
    tickets.forEach(ticket => addTicketToTable(ticket));
}

window.onload = loadTickets;
