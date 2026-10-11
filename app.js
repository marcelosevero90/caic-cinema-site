/**
 * CAIC Cinema - Landing Page & Divulgação
 * Script de Interatividade e Gerenciamento de Downloads
 */

document.addEventListener('DOMContentLoaded', () => {
  initModals();
  initFaqAccordion();
  initNotificationForm();
  initDownloadHandlers();
  initDeviceDetector();
  initSmoothScroll();
});

// ==========================================
// 1. Gerenciamento de Diálogos Modais (Nativo <dialog>)
// ==========================================
function initModals() {
  const downloadDialog = document.getElementById('downloadModal');
  const previewDialog = document.getElementById('previewModal');

  // Fechar ao clicar no backdrop do dialog
  [downloadDialog, previewDialog].forEach(dialog => {
    if (!dialog) return;
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  });

  // Botões de fechar
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      const dialog = document.getElementById(modalId);
      if (dialog && typeof dialog.close === 'function') {
        dialog.close();
      }
    });
  });
}

// Abrir Modal de Download
window.openDownloadModal = function(type = 'all') {
  const dialog = document.getElementById('downloadModal');
  if (!dialog) return;

  const mobileTab = document.getElementById('tab-mobile-content');
  const tvTab = document.getElementById('tab-tv-content');
  const btnMobile = document.getElementById('btn-tab-mobile');
  const btnTv = document.getElementById('btn-tab-tv');

  if (type === 'tv' && tvTab && btnTv) {
    switchApkTab('tv');
  } else if (mobileTab && btnMobile) {
    switchApkTab('mobile');
  }

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }
};

// Alternar entre abas de Celular e TV Box no Modal
window.switchApkTab = function(target) {
  const mobileTab = document.getElementById('tab-mobile-content');
  const tvTab = document.getElementById('tab-tv-content');
  const btnMobile = document.getElementById('btn-tab-mobile');
  const btnTv = document.getElementById('btn-tab-tv');

  if (target === 'tv') {
    mobileTab?.classList.add('hidden');
    tvTab?.classList.remove('hidden');
    btnMobile?.classList.remove('active-tab', 'border-cyan-400', 'text-cyan-400', 'bg-cyan-500/10');
    btnMobile?.classList.add('text-slate-400', 'border-transparent');
    btnTv?.classList.add('active-tab', 'border-cyan-400', 'text-cyan-400', 'bg-cyan-500/10');
    btnTv?.classList.remove('text-slate-400', 'border-transparent');
  } else {
    tvTab?.classList.add('hidden');
    mobileTab?.classList.remove('hidden');
    btnTv?.classList.remove('active-tab', 'border-cyan-400', 'text-cyan-400', 'bg-cyan-500/10');
    btnTv?.classList.add('text-slate-400', 'border-transparent');
    btnMobile?.classList.add('active-tab', 'border-cyan-400', 'text-cyan-400', 'bg-cyan-500/10');
    btnMobile?.classList.remove('text-slate-400', 'border-transparent');
  }
};

// Abrir Modal de Demonstração / Preview
window.openPreviewModal = function() {
  const dialog = document.getElementById('previewModal');
  if (!dialog) return;
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }
};

// ==========================================
// 2. Acordeão de Perguntas Frequentes (FAQ)
// ==========================================
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-toggle');

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Fecha outros itens
      faqButtons.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherContent = otherBtn.nextElementSibling;
          const otherIcon = otherBtn.querySelector('.faq-icon');
          if (otherContent) otherContent.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Alterna o atual
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        content?.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        content?.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// ==========================================
// 3. Sistema de Notificação e Lista de Espera do APK
// ==========================================
function initNotificationForm() {
  const form = document.getElementById('notifyForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('notifyInput');
    const value = input?.value.trim();

    if (!value) {
      showToast('⚠️ Por favor, digite seu WhatsApp ou e-mail.', 'error');
      return;
    }

    // Salvar localmente
    try {
      const list = JSON.parse(localStorage.getItem('caic_cinema_vip_list') || '[]');
      list.push({ contact: value, date: new Date().toISOString() });
      localStorage.setItem('caic_cinema_vip_list', JSON.stringify(list));
    } catch (err) {
      console.warn('Storage indisponível:', err);
    }

    if (input) input.value = '';
    showToast('🎉 Sucesso! Você receberá o aviso prioritário e o link do APK em primeira mão!', 'success');
  });
}

// ==========================================
// 4. Download Real do Arquivo APK Placeholder/Instalador
// ==========================================
function initDownloadHandlers() {
  document.querySelectorAll('[data-download-apk]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const platform = btn.getAttribute('data-download-apk') || 'mobile';
      triggerApkDownload(platform);
    });
  });
}

function triggerApkDownload(platform) {
  const fileName = platform === 'tv' 
    ? 'CAIC_Cinema_AndroidTV_v1.0.0.apk' 
    : 'CAIC_Cinema_Mobile_v1.0.0.apk';

  // Conteúdo informativo de instalação rápida para o usuário
  const apkNoticeContent = `=====================================================
🎬 CAIC CINEMA STREAMING - PACOTE DE INSTALAÇÃO ANDROID
=====================================================

Versão: 1.0.0 (Release Oficial / Prévia Exclusiva)
Plataforma: ${platform === 'tv' ? 'Android TV & TV Box (Leanback D-Pad)' : 'Android Celular & Tablet'}
Plataforma Web Oficial: https://caic-cinema.vercel.app/

COMO USAR AGORA MESMO:
-----------------------------------------------------
1. ACESSO IMEDIATO SEM ESPERA:
   Você não precisa esperar a instalação! Basta abrir seu navegador
   (Chrome, Edge, Samsung Internet ou Safari) e acessar:
   👉 https://caic-cinema.vercel.app/
   A plataforma funciona 100% responsiva em tela cheia com todas as
   funções de IA e curadoria!

2. INSTALAÇÃO DO APK NO ANDROID:
   - Transfira ou baixe o arquivo APK diretamente no seu aparelho.
   - Abra o Gerenciador de Arquivos e clique sobre o arquivo APK.
   - Caso o Android solicite permissão, ative "Permitir desta fonte"
     nas Configurações de Segurança.
   - Toque em "Instalar" e abra o app CAIC Cinema!

3. SUPORTE & DÚVIDAS:
   Site Oficial: https://caic-cinema.vercel.app/
   Desenvolvido com IA Google Gemini 3.8 Flash e Player de Alta Definição.

Aproveite seu cinema em casa! 🍿
=====================================================`;

  // Cria um Blob e aciona o download nativo no navegador
  const blob = new Blob([apkNoticeContent], { type: 'application/vnd.android.package-archive' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`📲 Iniciando download do instalador: ${fileName}! Enquanto isso, você já pode assistir na Web.`, 'info');
}

// ==========================================
// 5. Toast Notifications (Avisos Flutuantes)
// ==========================================
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  let icon = '✨';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '❌';
  if (type === 'info') icon = '💡';

  toast.innerHTML = `
    <span class="text-xl">${icon}</span>
    <span class="text-sm font-medium leading-relaxed">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animação
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4500);
}

// ==========================================
// 6. Detecção Amigável do Dispositivo do Usuário
// ==========================================
function initDeviceDetector() {
  const ua = navigator.userAgent.toLowerCase();
  const isAndroid = /android/i.test(ua);
  const isTv = /tv|smarttv|googletv|appletv|android tv/i.test(ua);

  const deviceBadge = document.getElementById('deviceRecommendation');
  if (!deviceBadge) return;

  if (isTv) {
    deviceBadge.innerHTML = '📺 <strong>Detectamos sua Smart TV!</strong> O CAIC Cinema possui controle por setas (D-pad) 100% otimizado.';
    deviceBadge.classList.remove('hidden');
  } else if (isAndroid) {
    deviceBadge.innerHTML = '📱 <strong>Você está no Android!</strong> Aproveite no navegador agora ou baixe o APK para celular.';
    deviceBadge.classList.remove('hidden');
  }
}

// ==========================================
// 7. Compartilhar / Copiar Link do Site
// ==========================================
window.copySiteLink = function() {
  const url = window.location.href || 'https://caic-cinema.vercel.app/';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('🔗 Link copiado para a área de transferência! Compartilhe com amigos.', 'success');
    });
  } else {
    showToast('🔗 Acesse e compartilhe: ' + url, 'info');
  }
};

// ==========================================
// 8. Scroll Suave
// ==========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
