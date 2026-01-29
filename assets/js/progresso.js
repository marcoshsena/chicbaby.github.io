document.addEventListener('DOMContentLoaded', () => {
  const MAX_POR_TAMANHO = 10; // ajuste se quiser

  const progressoSalvo = JSON.parse(
    localStorage.getItem('progressFraldas')
  ) || {};

  document.querySelectorAll('.progresso').forEach(barra => {
    const tamanho = barra.dataset.tamanho;

    if (!tamanho) return;

    const quantidade = progressoSalvo[tamanho] || 0;
    const percentual = Math.min(
      (quantidade / MAX_POR_TAMANHO) * 100,
      100
    );

    // pequeno delay para animar
    setTimeout(() => {
      barra.style.width = `${percentual}%`;
    }, 200);
  });
});
