function comprarProduto(produto) {
  const { id, nome, url } = produto;

  if (!url) {
    console.error('URL do produto não encontrada:', produto);
    return;
  }

  window.open(url, '_blank', 'noopener,noreferrer');

  const confirmacaoUrl =
    `confirmacao.html?id=${encodeURIComponent(id)}&nome=${encodeURIComponent(nome)}`;

  window.location.href = confirmacaoUrl;
}
