function respondeSim() {
  const form = document.getElementById('formMsg');
  form.style.display = 'flex';

  setTimeout(() => {
    form.classList.add('show');
  }, 10);
}

function respondeNao() {
  window.location.href = 'index.html';
}

async function enviarMensagem() {
  const nome = document.getElementById('nomePessoa').value.trim();
  const msg = document.getElementById('mensagemBebe').value.trim();

  if (!nome || !msg) {
    alert('Por favor, preencha seu nome e a mensagem 💙');
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const tamanho = params.get('tamanho');
  const produto = params.get('nome');
  const produtoId = params.get('id');

  // FRALDA
  if (tamanho) {
    const ref = db.collection('fraldas_progresso').doc(tamanho);

    await ref.set({
      quantidade: firebase.firestore.FieldValue.increment(1)
    }, { merge: true });

    await db.collection('mensagens').add({
      nome,
      mensagem: msg,
      produto: `Fralda ${tamanho}`,
      tipo: 'fralda',
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  // PRODUTO NORMAL
  if (produto && produtoId) {
    await db.collection('compras').add({
      nome,
      mensagem: msg,
      produto,
      produtoId,
      tipo: 'produto',
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  mostrarAgradecimento();
}


  // animação visual (mantida)
  const form = document.getElementById('formMsg');
  const agradecimento = document.getElementById('agradecimento');

  form.classList.remove('show');

  setTimeout(() => {
    form.style.display = 'none';
    agradecimento.style.display = 'block';

    setTimeout(() => {
      agradecimento.classList.add('show');
    }, 10);
  }, 300);
}

function voltarInicio() {
  window.location.href = 'index.html';
}

/**
 * 🔥 REGISTRA A COMPRA NO FIREBASE
 */
async function registrarCompraFralda({ tamanho, nomePessoa, mensagem, produto }) {

  const refProgresso = db.collection('fraldas_progresso').doc(tamanho);

  // 🔐 transação segura (evita erro com múltiplos usuários)
  await db.runTransaction(async (transaction) => {
    const doc = await transaction.get(refProgresso);

    const atual = doc.exists ? doc.data().quantidade : 0;

    transaction.set(refProgresso, {
      quantidade: atual + 1,
      meta: 100
    }, { merge: true });
  });

  // 📩 salva compra + mensagem
  await db.collection('compras').add({
    nomePessoa,
    mensagem,
    produto,
    tamanho,
    tipo: 'fralda',
    data: firebase.firestore.FieldValue.serverTimestamp()
  });
}
