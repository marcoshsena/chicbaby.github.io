document.addEventListener('DOMContentLoaded', () => {

  const MAX_POR_TAMANHO = {
    RN: 100,
    P: 100,
    M: 100,
    G: 100,
    GG: 100
  };

  const progresso = JSON.parse(
    localStorage.getItem('progressFraldas')
  ) || {};

  document.querySelectorAll('.card[data-tipo="fralda"]').forEach(card => {
    const tamanho = card.dataset.tamanho;
    const atual = progresso[tamanho] || 0;
    const max = MAX_POR_TAMANHO[tamanho];

    // Atualiza texto "0 / 100"
    const spanAtual = card.querySelector('.current');
    if (spanAtual) {
      spanAtual.innerText = atual;
    }

    // Atualiza barra
    const barra = card.querySelector('.progresso');
    if (!barra) return;

    const percentual = Math.min((atual / max) * 100, 100);

    requestAnimationFrame(() => {
      barra.style.width = percentual + '%';
    });
  });

});
