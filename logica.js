document.getElementById("ticketForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const priority = document.getElementById("priority").value;
    const category = document.getElementById("category").value;
    const technician = document.getElementById("technician").value;
    const description = document.getElementById("description").value;

    const ticket = {
        id: Date.now(), // Usamos o timestamp como id único
        title,
        priority,
        category,
        technician,
        description,
        status: 'Pendente',
        comments: []
    };

    // Armazenar o chamado no localStorage
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));

    addTicketToTable(ticket);
    clearForm();
});

function addTicketToTable(ticket) {
    const tableBody = document.getElementById("ticketTable").getElementsByTagName("tbody")[0];

}