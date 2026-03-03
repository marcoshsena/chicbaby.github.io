// ===============================
// CONFIRMAÇÃO DO PRESENTE
// ===============================

const MAX_POR_TAMANHO = {
  RN: 6,
  P: 12,
  M: 35,
  G: 40,
  GG: 30
};

function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    tamanho: params.get('tamanho'),
    produtoId: params.get('id'),
    produtoNome: params.get('nome')
  };
}

// Mostrar nome do produto na tela (opcional)
document.addEventListener('DOMContentLoaded', () => {
  const { produtoNome, tamanho } = getParams();
  const el = document.getElementById('produtoNome');
  if (el) {
    el.textContent = produtoNome ? `${produtoNome}${tamanho ? ` (tamanho ${tamanho})` : ''}` : '';
  }
});

// Necessário para onclick=""
window.respondeSim = function () {
  const form = document.getElementById('formMsg');
  if (!form) return;

  form.style.display = 'flex';
  setTimeout(() => form.classList.add('show'), 10);
};

window.respondeNao = function () {
  window.location.href = 'index.html';
};

window.voltarInicio = function () {
  window.location.href = 'index.html';
};

window.enviarMensagem = async function () {
  const nome = document.getElementById('nomePessoa')?.value.trim();
  const msg = document.getElementById('mensagemBebe')?.value.trim();

  if (!nome || !msg) {
    alert('Por favor, preencha seu nome e a mensagem 💙');
    return;
  }

  const { tamanho, produtoId, produtoNome } = getParams();

  try {
    // 1) Salva mensagem (serve pra fralda e produto)
    await db.collection('mensagens').add({
      nome,
      mensagem: msg,
      produtoId: produtoId || null,
      produto: produtoNome || null,
      tamanho: tamanho || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // 2) Se for fralda: incrementa com limite
    if (tamanho) {
      const max = MAX_POR_TAMANHO[tamanho];

      if (!max) {
        alert('Tamanho inválido 😢');
        return;
      }

      const ref = db.collection('fraldas_progresso').doc(tamanho);

      await db.runTransaction(async (transaction) => {
        const doc = await transaction.get(ref);
        const atual = doc.exists ? (doc.data().quantidade || 0) : 0;

        if (atual >= max) {
          throw new Error('MAX_ATINGIDO');
        }

        transaction.set(ref, { quantidade: atual + 1 }, { merge: true });
      });
    } else {
      // 3) Se NÃO for fralda: marca produto como indisponível
      if (produtoId) {
        await db.collection('produtos_status').doc(produtoId).set(
          {
            disponivel: false,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          },
          { merge: true }
        );
      }
    }

    // UI sucesso
    const form = document.getElementById('formMsg');
    const agradecimento = document.getElementById('agradecimento');

    if (form) form.classList.remove('show');

    setTimeout(() => {
      if (form) form.style.display = 'none';
      if (agradecimento) {
        agradecimento.style.display = 'block';
        setTimeout(() => agradecimento.classList.add('show'), 10);
      }
    }, 300);

  } catch (err) {
    console.error('Erro ao salvar:', err);

    if ((err && err.message) === 'MAX_ATINGIDO') {
      alert('Esse tamanho já atingiu a quantidade máxima 💙');
      return;
    }

    alert('Erro ao enviar mensagem 😢');
  }
};
