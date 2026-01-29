document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-ver-ofertas').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      const tipo = card.dataset.tipo;

      if (tipo === 'fralda') {
        const tamanho = card.dataset.tamanho;
        window.location.href = `fraldas.html?tamanho=${tamanho}`;
        return;
      }

      if (tipo === 'produto') {
        const { id, nome, url } = card.dataset;

        window.open(url, '_blank');

        const confirmacaoUrl =
          `confirmacao.html?id=${encodeURIComponent(id)}&nome=${encodeURIComponent(nome)}`;

        window.location.href = confirmacaoUrl;
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const progresso = JSON.parse(localStorage.getItem('progressFraldas')) || {};

  document.querySelectorAll('.progress-bar').forEach(bar => {
    const tamanho = bar.dataset.tamanho;
    const atual = progresso[tamanho] || 0;
    const meta = 10; // você define

    const percentual = Math.min((atual / meta) * 100, 100);
    bar.style.width = percentual + '%';
  });
});
