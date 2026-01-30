// ===============================
// CONFIRMAÇÃO DO PRESENTE
// ===============================

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

  const tamanho = params.get('tamanho');
  const produtoId = params.get('id');
  const produtoNome = params.get('nome');

  try {
    // 🔹 Salva mensagem
    await db.collection('mensagens').add({
      nome,
      mensagem: msg,
      tamanho: tamanho || null,
      produto: produtoNome || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // 🔹 Se for fralda, incrementa progresso
    if (tamanho) {
      const ref = db.collection('fraldas_progresso').doc(tamanho);

      await db.runTransaction(async (transaction) => {
        const doc = await transaction.get(ref);
        const atual = doc.exists ? doc.data().quantidade || 0 : 0;

        transaction.set(ref, { quantidade: atual + 1 }, { merge: true });
      });
    }

    // UI feedback
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
    alert('Erro ao enviar mensagem 😢');
  }
};

window.voltarInicio = function () {
  window.location.href = 'index.html';
};
