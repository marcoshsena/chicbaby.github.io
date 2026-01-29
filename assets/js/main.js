function comprarProduto(id, nome, url) {
  // 1. Abre o produto da loja em nova aba
  document.querySelectorAll('.btn-comprar').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.dataset.url;
  
      if (!url) {
        console.error('URL não encontrada para o botão');
        return;
      }
  
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });


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

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.btn-ver-ofertas').forEach(btn => {
    btn.addEventListener('click', () => {

      const card = btn.closest('.card');
      const tipo = card.dataset.tipo;

      // CAMINHO 1 — FRALDAS
      if (tipo === 'fralda') {
        const tamanho = card.dataset.tamanho;
        window.location.href = `fraldas.html?tamanho=${tamanho}`;
        return;
      }

      // CAMINHO 2 — PRODUTO DIRETO
      if (tipo === 'produto') {
        const id = card.dataset.id;
        const nome = card.dataset.nome;
        const url = card.dataset.url;

        // Abre loja
        window.open(url, '_blank');

        // Redireciona para confirmação
        const confirmacaoUrl =
          `confirmacao.html?id=${encodeURIComponent(id)}&nome=${encodeURIComponent(nome)}`;

        window.location.href = confirmacaoUrl;
      }

    });
  });

});
