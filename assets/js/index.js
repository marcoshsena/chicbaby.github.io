document.addEventListener('DOMContentLoaded', () => {

  /* ==================================================
     BOTÕES "VER OFERTAS"
  ================================================== */
  document.querySelectorAll('.btn-ver-ofertas').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      const tipo = card.dataset.tipo;

      // FRALDAS
      if (tipo === 'fralda') {
        const tamanho = card.dataset.tamanho;
        window.location.href = `fraldas.html?tamanho=${tamanho}`;
        return;
      }

      // PRODUTO NORMAL
      if (tipo === 'produto') {
        const { id, nome, url } = card.dataset;

        window.open(url, '_blank', 'noopener,noreferrer');

        window.location.href =
          `confirmacao.html?id=${encodeURIComponent(id)}&nome=${encodeURIComponent(nome)}`;
      }
    });
  });

  /* ==================================================
     🔥 PROGRESSO REAL DAS FRALDAS (FIREBASE)
  ================================================== */

  const MAX_POR_TAMANHO = 100;

  db.collection('fraldas_progresso')
    .onSnapshot(snapshot => {

      snapshot.forEach(doc => {
        const tamanho = doc.id;
        const dados = doc.data();
        const atual = dados.quantidade || 0;

        // card correspondente
        const card = document.querySelector(
          `.card[data-tamanho="${tamanho}"]`
        );
        if (!card) return;

        // texto "Quantidade arrecadada"
        const spanAtual = card.querySelector('.current');
        if (spanAtual) {
          spanAtual.textContent = atual;
        }

        // barra animada
        const barra = card.querySelector('.progresso');
        if (barra) {
          const percentual = Math.min(
            (atual / MAX_POR_TAMANHO) * 100,
            100
          );

          requestAnimationFrame(() => {
            barra.style.width = percentual + '%';
          });
        }
      });

    });

});
