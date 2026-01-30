<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
<script src="assets/js/firebase.js"></script>

window.comprarProduto = function (produto) {
  const { id, nome, url, tamanho } = produto;

  if (!url) {
    console.error('URL do produto não encontrada:', produto);
    return;
  }

  // Abre loja
  window.open(url, '_blank', 'noopener,noreferrer');

  // Monta URL de confirmação
  let confirmacaoUrl =
    `confirmacao.html?id=${encodeURIComponent(id)}&nome=${encodeURIComponent(nome)}`;

  if (tamanho) {
    confirmacaoUrl += `&tamanho=${encodeURIComponent(tamanho)}`;
  }

  // Redireciona
  window.location.href = confirmacaoUrl;
};
