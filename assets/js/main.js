function comprarProduto(id, nome, url) {
  // 1. Abre o produto da loja em nova aba
  window.open(url, '_blank');

  // 2. Redireciona para a página de confirmação
  const confirmacaoUrl =
    `confirmacao.html?id=${encodeURIComponent(id)}&nome=${encodeURIComponent(nome)}`;

  window.location.href = confirmacaoUrl;
}

function respondeSim() {
  const form = document.getElementById('formMsg');
  form.style.display = 'flex';

  // pequeno delay pra animação funcionar
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
