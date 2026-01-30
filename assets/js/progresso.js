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
    const spanMax = card.querySelector('.max'); // se existir
    const barra = card.querySelector('.progresso');

    if (!barra) return;

    // Listener em tempo real
    db.collection('fraldas_progresso')
      .doc(tamanho)
      .onSnapshot(doc => {

        const atual = doc.exists ? doc.data().quantidade || 0 : 0;

        // Atualiza texto
        if (spanAtual) spanAtual.innerText = atual;
        if (spanMax) spanMax.innerText = max;

        // Atualiza barra
        const percentual = Math.min((atual / max) * 100, 100);
        barra.style.width = percentual + '%';
      });
  });

});
