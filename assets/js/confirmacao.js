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

  const params = new URLSearchParams(window.location.search);
  const tamanho = params.get('tamanho');

  if (tamanho) {
    registrarCompraFralda(tamanho);
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

function registrarCompraFralda(tamanho) {
  const key = 'progressFraldas';

  const progresso = JSON.parse(localStorage.getItem(key)) || {
    RN: 0,
    P: 0,
    M: 0,
    G: 0,
    GG: 0
  };

  progresso[tamanho]++;

  localStorage.setItem(key, JSON.stringify(progresso));
}
