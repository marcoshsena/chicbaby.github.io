<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
<script src="assets/js/firebase.js"></script>

document.addEventListener('DOMContentLoaded', () => {
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
});
