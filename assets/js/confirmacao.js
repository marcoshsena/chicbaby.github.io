// ===============================
// CONFIRMAÇÃO DO PRESENTE
// ===============================

const MAX_POR_TAMANHO = {
  RN: 8,
  P: 12,
  M: 35,
  G: 40,
  GG: 30
};

// Torna as funções globais (necessário para onclick)
window.respondeSim = function () {
  const form = document.getElementById('formMsg');
  if (!form) return;

  form.style.display = 'flex';

  setTimeout(() => {
    form.classList.add('show');
  }, 10);
};

window.respondeNao = function () {
  window.location.href = 'index.html';
};

window.enviarMensagem = async function () {
  const nome = document.getElementById('nomePessoa').value.trim();
  const msg = document.getElementById('mensagemBebe').value.trim();

  if (!nome || !msg) {
    alert('Por favor, preencha seu nome e a mensagem 💙');
    return;
  }

  const params = new URLSearchParams(window.location.search);

  const tamanho = params.get('tamanho');      // fraldas
  const produtoId = params.get('id');         // produtos normais
  const produtoNome = params.get('nome');

  try {
    // 🔹 1. Salva mensagem (para fralda OU produto)
    await db.collection('mensagens').add({
      nome,
      mensagem: msg,
      tamanho: tamanho || null,
      produtoId: produtoId || null,
      produto: produtoNome || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // 🔒 Marca produto como reservado (se não for fralda)
    if (!tamanho && produtoId) {
      await db
        .collection('produtos_reservados')
        .doc(produtoId)
        .set({
          nome: produtoNome,
          reservadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    // 🔹 2. Se for fralda, incrementa progresso com limite
    if (tamanho && MAX_POR_TAMANHO[tamanho]) {
      const ref = db.collection('fraldas_progresso').doc(tamanho);
      const max = MAX_POR_TAMANHO[tamanho];

      await db.runTransaction(async (transaction) => {
        const doc = await transaction.get(ref);
        const atual = doc.exists ? doc.data().quantidade || 0 : 0;

        // ⛔ Bloqueia se atingir o máximo
        if (atual >= max) {
          throw new Error('LIMITE_ATINGIDO');
        }

        transaction.set(
          ref,
          { quantidade: atual + 1 },
          { merge: true }
        );
      });
    }

    // 🔹 3. Feedback visual
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

  } catch (err) {
    console.error('Erro ao salvar:', err);

    if (err.message === 'LIMITE_ATINGIDO') {
      alert('Esse tamanho de fralda já atingiu a quantidade máxima 💙');
    } else {
      alert('Erro ao enviar mensagem 😢');
    }
  }
};

window.voltarInicio = function () {
  window.location.href = 'index.html';
};
