document.addEventListener('DOMContentLoaded', function () {
    const confirmButton = document.getElementById('confirmButton');
    const mapButton = document.getElementById("mapButton");

    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('closeButton');

    const modalMap = document.getElementById('modal-map');
    const closeButtonMap = document.getElementById('closeButton-map');

    const content = document.getElementById('principal');
    let currentId = 1; // Inicializar o ID
    const btnConfirmar = document.getElementById("play-music-modal");
    const sessaoPrincipal = document.getElementById("sec-principal");
    const divMusica = document.getElementById("musica");

    btnConfirmar.addEventListener('click', function (event) {
        event.preventDefault(); // Evita a atualização da página
        divMusica.classList.add('oculta'); // Esconde a divMusica

        sessaoPrincipal.classList.remove("oculta");
        sessaoPrincipal.classList.add('mostra');
        var audio = new Audio('Assets/musica/musica.mp3');
        audio.play();
    });

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

    // Map

    mapButton.addEventListener('click', function () {
        modalMap.style.display = 'block';
        content.classList.add('blur');
    });

    closeButtonMap.addEventListener('click', function () {  // Corrigido para closeButtonMap
        modalMap.style.display = 'none';
        content.classList.remove('blur');
    });

    window.addEventListener('click', function (event) {
        if (event.target == modalMap) {
            modalMap.style.display = 'none';
            content.classList.remove('blur');
        }
    });

    // Tratamento e envio dos dados
    document.getElementById('sendAsistencia').addEventListener('click', function (event) {
        event.preventDefault(); // Previne o recarregamento da página

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
        fetch('http://191.252.191.180:3000/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede');
            }
            return response.text();
        })
        .then(message => {
            console.log(message);
            window.alert('Informações enviadas com sucesso!');
            // Limpa o formulário após o envio bem-sucedido
            document.getElementById('nombreAsistente').value = '';
            document.getElementById('comentariosAsistente').value = '';
            document.querySelector('input[name="asistencia"]:checked').checked = false;
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Houve um problema ao enviar as informações.');
        });
    });
    function showSuccessMessage() {
        successMessage.classList.remove('hidden');
        successMessage.classList.add('visible');
        setTimeout(() => {
            successMessage.classList.remove('visible');
            setTimeout(() => successMessage.classList.add('hidden'), 500);
        }, 3000); // Mostra a mensagem por 3 segundos
    }
});