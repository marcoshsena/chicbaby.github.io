<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
<script src="assets/js/firebase.js"></script>

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const tamanhoSelecionado = params.get('tamanho');

  if (!tamanhoSelecionado) return;

  const titulo = document.getElementById('titulo-fralda');
  if (titulo) {
    titulo.innerText = `🧸 Fraldas tamanho ${tamanhoSelecionado}`;
  }

  const cards = document.querySelectorAll('.card-fralda');

  cards.forEach(card => {
    const tamanhoCard = card.dataset.tamanho;

    if (tamanhoCard !== tamanhoSelecionado) {
      card.style.display = 'none';
    }
  });
});
