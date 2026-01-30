document.addEventListener('DOMContentLoaded', () => {

  /* ==================================================
     BOTÕES "VER OFERTAS"
  ================================================== */
  document.querySelectorAll('.btn-ver-ofertas').forEach(btn => {
    btn.addEventListener('click', () => {

      // se estiver desativado, não faz nada
      if (btn.disabled) return;

      const card = btn.closest('.card');
      if (!card) return;

      const tipo = card.dataset.tipo;

      // ===============================
      // FRALDAS
      // ===============================
      if (tipo === 'fralda') {
        const tamanho = card.dataset.tamanho;
        window.location.href = `fraldas.html?tamanho=${tamanho}`;
        return;
      }

      // ===============================
      // PRODUTO NORMAL
      // ===============================
      if (tipo === 'produto') {
        const { id, nome, url } = card.dataset;

        if (!url) return;

        // abre loja
        window.open(url, '_blank', 'noopener,noreferrer');

        // vai para confirmação
        window.location.href =
          `confirmacao.html?id=${encodeURIComponent(id)}&nome=${encodeURIComponent(nome)}`;
      }

    });
  });

  /* ==================================================
     🔒 PRODUTOS JÁ RESERVADOS (FIREBASE)
  ================================================== */
  db.collection('produtos_reservados')
    .onSnapshot(snapshot => {

      snapshot.forEach(doc => {
        const produtoId = doc.id;

        const card = document.querySelector(
          `.card[data-id="${produtoId}"]`
        );
        if (!card) return;

        const botao = card.querySelector('.btn-ver-ofertas');
        if (!botao) return;

        botao.disabled = true;
        botao.innerText = 'Já escolhido 💙';
        botao.style.background = '#ccc';
        botao.style.cursor = 'not-allowed';
      });

    });

});
