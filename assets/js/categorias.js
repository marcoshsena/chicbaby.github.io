document.addEventListener('DOMContentLoaded', () => {
  const produtosContainer = document.getElementById('todosProdutos');
  const categoriasLista = document.getElementById('categoriasLista');
  const categoriasAccordion = document.getElementById('categoriasAccordion');

  if (!produtosContainer || !categoriasLista || !categoriasAccordion) return;

  // ✅ Agora pega FRALDAS e PRODUTOS
  const cards = Array.from(
    produtosContainer.querySelectorAll('.card[data-tipo]')
  );

  // Agrupa por categoria (data-categoria). Se não tiver, usa "outros"
  const grupos = new Map();
  cards.forEach(card => {
    const cat = (card.dataset.categoria || 'outros').trim();
    if (!grupos.has(cat)) grupos.set(cat, []);
    grupos.get(cat).push(card);
  });

  const labelCategoria = (cat) =>
    cat.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const categoriasOrdenadas = Array.from(grupos.keys()).sort((a, b) => a.localeCompare(b));

  // Lista de “chips”
  categoriasOrdenadas.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'categoria-chip';
    btn.type = 'button';
    btn.textContent = `${labelCategoria(cat)} (${grupos.get(cat).length})`;
    btn.dataset.target = `cat-${cat}`;
    categoriasLista.appendChild(btn);
  });

  // Accordion
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
      document.querySelectorAll('.categoria-body').forEach(el => (el.style.display = 'none'));
      body.style.display = aberto ? 'none' : 'block';
      if (!aberto) wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Chips abrem categoria
  categoriasLista.addEventListener('click', (e) => {
    const chip = e.target.closest('.categoria-chip');
    if (!chip) return;

    const targetId = chip.dataset.target;
    const bloco = document.getElementById(targetId);
    if (!bloco) return;

    const body = bloco.querySelector('.categoria-body');
    if (!body) return;

    document.querySelectorAll('.categoria-body').forEach(el => (el.style.display = 'none'));
    body.style.display = 'block';
    bloco.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ✅ Clique em "Ver ofertas" (agora funciona para fralda e produto)
  categoriasAccordion.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-ver-ofertas');
    if (!btn) return;

    const card = btn.closest('.card');
    if (!card || btn.disabled) return;

    const tipo = card.dataset.tipo;

    // FRALDAS: vai para fraldas.html?tamanho=
    if (tipo === 'fralda') {
      const tamanho = card.dataset.tamanho;
      window.location.href = `fraldas.html?tamanho=${encodeURIComponent(tamanho)}`;
      return;
    }

    // PRODUTO: abre loja e vai para confirmacao.html
    if (tipo === 'produto') {
      const { id, nome, url } = card.dataset;
      window.open(url, '_blank', 'noopener,noreferrer');
      window.location.href = `confirmacao.html?id=${encodeURIComponent(id)}&nome=${encodeURIComponent(nome)}`;
    }
  });

  // ✅ Opcional: desativar itens reservados (produtos_reservados) no Firestore
  if (typeof db !== 'undefined') {
    db.collection('produtos_reservados').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data() || {};
        if (data.status !== 'reservado') return;

        const produtoId = doc.id;

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
