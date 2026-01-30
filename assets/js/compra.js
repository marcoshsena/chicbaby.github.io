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
