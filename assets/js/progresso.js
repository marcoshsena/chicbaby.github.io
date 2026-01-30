document.addEventListener('DOMContentLoaded', () => {

  const MAX_POR_TAMANHO = {
    RN: 8,
    P: 12,
    M: 35,
    G: 40,
    GG: 30
  };

  // Escuta em tempo real o progresso das fraldas
  db.collection('fraldas_progresso')
    .onSnapshot(snapshot => {

      snapshot.forEach(doc => {
        const tamanho = doc.id;
        const dados = doc.data();
        const atual = dados.quantidade || 0;
        const max = MAX_POR_TAMANHO[tamanho];

        if (!max) return;

        // Card correspondente
        const card = document.querySelector(
          `.card[data-tipo="fralda"][data-tamanho="${tamanho}"]`
        );
        if (!card) return;

        // Texto "Quantidade arrecadada"
        const spanAtual = card.querySelector('.current');
        if (spanAtual) {
          spanAtual.innerText = atual;
        }

        // Barra animada
        const barra = card.querySelector('.progresso');
        if (!barra) return;

        const percentual = Math.min((atual / max) * 100, 100);

        requestAnimationFrame(() => {
          barra.style.width = percentual + '%';
        });
      });

    });

});
