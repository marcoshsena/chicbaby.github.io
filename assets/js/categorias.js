document.addEventListener('DOMContentLoaded', () => {
  const produtosContainer = document.getElementById('todosProdutos');
  const categoriasLista = document.getElementById('categoriasLista');
  const categoriasAccordion = document.getElementById('categoriasAccordion');

  if (!produtosContainer || !categoriasLista || !categoriasAccordion) return;

  const cards = Array.from(produtosContainer.querySelectorAll('.card[data-tipo="produto"]'));

  // Agrupa por categoria
  const grupos = new Map(); // categoria -> [cards]
  cards.forEach(card => {
    const cat = (card.dataset.categoria || 'outros').trim();
    if (!grupos.has(cat)) grupos.set(cat, []);
    grupos.get(cat).push(card);
  });

  // Helper: nome bonito da categoria
  const labelCategoria = (cat) => {
    return cat
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  // Renderiza lista de botões de categorias
  const categoriasOrdenadas = Array.from(grupos.keys()).sort((a, b) => a.localeCompare(b));
  categoriasOrdenadas.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'categoria-chip';
    btn.type = 'button';
    btn.textContent = `${labelCategoria(cat)} (${grupos.get(cat).length})`;
    btn.dataset.target = `cat-${cat}`;
    categoriasLista.appendChild(btn);
  });

  // Renderiza accordion
  categoriasOrdenadas.forEach(cat => {
    const wrapper = document.createElement('div');
    wrapper.className = 'categoria-bloco';
    wrapper.id = `cat-${cat}`;

    const header = document.createElement('button');
    header.type = 'button';
    header.className = 'categoria-header';
    header.innerHTML = `
      <span>${labelCategoria(cat)}</span>
      <span class="categoria-qtd">${grupos.get(cat).length}</span>
    `;

    const body = document.createElement('div');
    body.className = 'categoria-body';
    body.style.display = 'none';

    const grid = document.createElement('div');
    grid.className = 'grid';

    // Clona os cards para não “sumir” do container original
    grupos.get(cat).forEach(original => {
      const clone = original.cloneNode(true);
      grid.appendChild(clone);
    });

    body.appendChild(grid);
    wrapper.appendChild(header);
    wrapper.appendChild(body);
    categoriasAccordion.appendChild(wrapper);

    header.addEventListener('click', () => {
      const aberto = body.style.display === 'block';
      document.querySelectorAll('.categoria-body').forEach(el => el.style.display = 'none');
      body.style.display = aberto ? 'none' : 'block';
      if (!aberto) wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Clique nos "chips" abre a categoria
  categoriasLista.addEventListener('click', (e) => {
    const chip = e.target.closest('.categoria-chip');
    if (!chip) return;

    const targetId = chip.dataset.target;
    const bloco = document.getElementById(targetId);
    if (!bloco) return;

    const body = bloco.querySelector('.categoria-body');
    if (!body) return;

    document.querySelectorAll('.categoria-body').forEach(el => el.style.display = 'none');
    body.style.display = 'block';
    bloco.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Reusa o mesmo comportamento de "Ver ofertas"
  categoriasAccordion.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-ver-ofertas');
    if (!btn) return;

    const card = btn.closest('.card');
    if (!card) return;

    if (btn.disabled) return;

    const { id, nome, url } = card.dataset;

    window.open(url, '_blank', 'noopener,noreferrer');
    window.location.href = `confirmacao.html?id=${encodeURIComponent(id)}&nome=${encodeURIComponent(nome)}`;
  });

  // ✅ Opcional: desativar itens reservados em tempo real (produtos_reservados)
  // Se não quiser, pode apagar esse bloco.
  if (typeof db !== 'undefined') {
    db.collection('produtos_reservados').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data() || {};
        if (data.status !== 'reservado') return;

        const produtoId = doc.id;

        // Procura todos os clones na página
        document.querySelectorAll(`.card[data-tipo="produto"][data-id="${produtoId}"]`)
          .forEach(card => {
            const btn = card.querySelector('.btn-ver-ofertas');
            if (!btn) return;

            btn.disabled = true;
            btn.textContent = 'Indisponível 💙';
            btn.style.background = '#ccc';
            btn.style.cursor = 'not-allowed';
          });
      });
    });
  }
});
