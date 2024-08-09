document.addEventListener('DOMContentLoaded', function () {
    const confirmButton = document.getElementById('confirmButton');
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('closeButton');
    const content = document.getElementById('principal');
    let currentId = 1; // Inicializar o ID

    confirmButton.addEventListener('click', function () {
        modal.style.display = 'block';
        content.classList.add('blur');
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
        content.classList.remove('blur');
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            content.classList.remove('blur');
        }
    });

    // Tratamento e envio dos dados
    document.getElementById('sendAsistencia').addEventListener('click', function () {
        const confirma = document.querySelector('input[name="asistencia"]:checked').value;
        const nome = document.getElementById('nombreAsistente').value;
        const comentarios = document.getElementById('comentariosAsistente').value;

        const data = {
            id: currentId++,
            confirma,
            nome,
            comentarios
        };

        // Envia os dados para o servidor
        fetch('http://localhost:3000/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.text())
        .then(message => console.log(message))
        .catch(error => console.error('Erro:', error));
    });
});
