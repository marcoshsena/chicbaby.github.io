document.addEventListener('DOMContentLoaded', () => {

  const MAX_POR_TAMANHO = {
    RN: 8,
    P: 12,
    M: 35,
    G: 40,
    GG: 30
  };

  document.querySelectorAll('.card[data-tipo="fralda"]').forEach(card => {
    const tamanho = card.dataset.tamanho;
    const max = MAX_POR_TAMANHO[tamanho];
    if (!max) return;

    const spanAtual = card.querySelector('.current');
    const barra = card.querySelector('.progresso');
    const botao = card.querySelector('.btn-ver-ofertas');

    db.collection('fraldas_progresso')
      .doc(tamanho)
      .onSnapshot(doc => {

        const atual = doc.exists ? doc.data().quantidade || 0 : 0;

        // Atualiza texto
        if (spanAtual) spanAtual.innerText = atual;

        // Atualiza barra
        const percentual = Math.min((atual / max) * 100, 100);
        barra.style.width = percentual + '%';

        // 🔒 BLOQUEIA SE ATINGIR O MÁXIMO
        if (atual >= max) {
          botao.disabled = true;
          botao.innerText = 'Meta atingida 💙';
          botao.style.background = '#ccc';
          botao.style.cursor = 'not-allowed';
        }
      });
  });

});
