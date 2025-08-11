/* 글로벌 데이터 */
const CONTACT = {
  name: '심현광',
  phone: '010-8758-7325',
  org: '삼성전자 서서울 물류센터',
  title: '설치 전문 CS Master',
};

function toDigitsOnly(phone) {
  return phone.replace(/[^0-9]/g, '');
}

function saveVCard() {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${CONTACT.name}`,
    `FN:${CONTACT.name}`,
    `TITLE:${CONTACT.title}`,
    `ORG:${CONTACT.org}`,
    `TEL;TYPE=CELL:${toDigitsOnly(CONTACT.phone)}`,
    'END:VCARD',
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${CONTACT.name}-명함.vcf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function copyPhone() {
  try {
    await navigator.clipboard.writeText(CONTACT.phone);
    toast('전화번호를 복사했어요');
  } catch (e) {
    toast('복사에 실패했어요. 길게 눌러 복사해주세요.');
  }
}

function callNow() {
  window.location.href = `tel:${toDigitsOnly(CONTACT.phone)}`;
}

function toast(message) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    Object.assign(el.style, {
      position: 'fixed', left: '50%', bottom: '28px', transform: 'translateX(-50%)',
      background: 'rgba(0,0,0,.8)', color: '#fff', padding: '10px 14px', borderRadius: '999px',
      zIndex: 9999, fontWeight: 700, fontSize: '13px', opacity: '0', transition: 'opacity .2s',
    });
    document.body.appendChild(el);
  }
  el.textContent = message;
  requestAnimationFrame(() => { el.style.opacity = '1'; });
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => { el.style.opacity = '0'; }, 1600);
}

function wireEvents() {
  const byId = (id) => document.getElementById(id);
  byId('btn-save')?.addEventListener('click', saveVCard);
  byId('btn-copy')?.addEventListener('click', copyPhone);
  byId('btn-call')?.addEventListener('click', callNow);
}

document.addEventListener('DOMContentLoaded', () => {
  wireEvents();
});


