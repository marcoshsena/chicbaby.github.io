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

  document.querySelectorAll('.progresso').forEach(barra => {
    const tamanho = barra.dataset.tamanho;

    if (!tamanho || !MAX_POR_TAMANHO[tamanho]) return;

    const atual = progresso[tamanho] || 0;
    const max = MAX_POR_TAMANHO[tamanho];

    const percentual = Math.min((atual / max) * 100, 100);

    // animação suave
    requestAnimationFrame(() => {
      barra.style.width = percentual + '%';
    });
  });

});
