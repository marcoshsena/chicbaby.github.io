// assets/js/progresso.js
document.addEventListener('DOMContentLoaded', () => {
  const MAX_POR_TAMANHO = {
    RN: 6,
    P: 12,
    M: 35,
    G: 40,
    GG: 30
  };

  document.querySelectorAll('.card[data-tipo="fralda"]').forEach(card => {
    const tamanho = card.dataset.tamanho;
    const max = MAX_POR_TAMANHO[tamanho];
    if (!max) return;

    const spanAtual = card.querySelector('.current');
    const barra = card.querySelector('.progresso');
    const botao = card.querySelector('.btn-ver-ofertas');

    if (!barra) return;

    db.collection('fraldas_progresso')
      .doc(tamanho)
      .onSnapshot(doc => {
        const atualRaw = doc.exists ? (doc.data().quantidade || 0) : 0;
        const atual = Math.min(atualRaw, max); // não deixa passar do max na UI

        if (spanAtual) spanAtual.innerText = atual;

        const percentual = Math.min((atual / max) * 100, 100);
        barra.style.width = percentual + '%';

        // bloqueia botão quando atingir max
        if (botao) {
          if (atual >= max) {
            botao.disabled = true;
            botao.innerText = 'Meta atingida 💙';
            botao.style.background = '#ccc';
            botao.style.cursor = 'not-allowed';
          } else {
            botao.disabled = false;
            botao.innerText = 'Ver ofertas';
            botao.style.background = '';
            botao.style.cursor = '';
          }
        }
      });
  });
});
