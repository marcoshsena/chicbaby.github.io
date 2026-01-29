function respondeSim() {
  const form = document.getElementById('formMsg');
  form.style.display = 'flex';

  setTimeout(() => {
    form.classList.add('show');
  }, 10);
}

function respondeNao() {
  window.location.href = 'index.html';
}

function enviarMensagem() {
  const nome = document.getElementById('nomePessoa').value.trim();
  const msg = document.getElementById('mensagemBebe').value.trim();

  if (!nome || !msg) {
    alert('Por favor, preencha seu nome e a mensagem 💙');
    return;
  }

  const form = document.getElementById('formMsg');
  const agradecimento = document.getElementById('agradecimento');

  form.classList.remove('show');

  setTimeout(() => {
    form.style.display = 'none';
    agradecimento.style.display = 'block';

    setTimeout(() => {
      agradecimento.classList.add('show');
    }, 10);
  }, 300);
}

function voltarInicio() {
  window.location.href = 'index.html';
}
