function comprarProduto(id, nome, url) {
  // 1. Abre o produto da loja em nova aba
  window.open(url, '_blank');

  // 2. Redireciona para a página de confirmação
  const confirmacaoUrl =
    `confirmacao.html?id=${encodeURIComponent(id)}&nome=${encodeURIComponent(nome)}`;

  window.location.href = confirmacaoUrl;
}
