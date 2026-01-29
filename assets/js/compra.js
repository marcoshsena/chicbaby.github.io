function comprarProduto(produto) {
  const { id, nome, url, tamanho } = produto;

  if (!url) {
    console.error('URL do produto não encontrada:', produto);
    return;
  }

  window.open(url, '_blank', 'noopener,noreferrer');

  const confirmacaoUrl =
    `confirmacao.html?id=${encodeURIComponent(id)}&nome=${encodeURIComponent(nome)}`
  
  // só adiciona tamanho se existir fraldas
  if (tamanho) {
    confirmacaoUrl += `&tamanho=${encodeURIComponent(tamanho)}`;

  window.location.href = confirmacaoUrl;
}
