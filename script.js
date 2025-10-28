document.addEventListener('DOMContentLoaded', () => {
  const btnOpen = document.getElementById('bookBtn');
  const modal = document.getElementById('bookingModal');
  const btnClose = modal ? modal.querySelector('.close') : null;
  const btnConfirm = modal ? modal.querySelector('#confirmBooking') : null;


  if (!btnOpen) return console.error('Не найдена кнопка #bookBtn');
  if (!modal) return console.error('Не найдена модалка #bookingModal');


  const roomPrices = {
    single: 75,
    standard: 85,
    deluxe: 130,
    twin: 145,
    suite: 150,
    family: 175,
    president: 1550
  };


  const roomSelect   = modal.querySelector('#roomSelect');
  const daysEl       = modal.querySelector('#days');
  const plusDay      = modal.querySelector('#plusDay');
  const minusDay     = modal.querySelector('#minusDay');
  const totalPriceEl = modal.querySelector('#totalPrice');

  let days = 1;

function updatePrice() {
  daysEl.textContent = String(days);
  const room  = roomSelect.value;
  const price = roomPrices[room] * days;
  totalPriceEl.textContent = '$' + price;   
}



  btnOpen.addEventListener('click', (e) => {
    e.preventDefault();                
    modal.classList.add('open');      
    updatePrice();                      
  });


  if (btnClose) btnClose.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });


  plusDay.addEventListener('click', () => { days++; updatePrice(); });
  minusDay.addEventListener('click', () => { if (days > 1) { days--; updatePrice(); } });


  roomSelect.addEventListener('change', updatePrice);


  if (btnConfirm) {
    btnConfirm.addEventListener('click', () => {
      const bookingData = {
        room: roomSelect.options[roomSelect.selectedIndex].text,
        roomCode: roomSelect.value,
        days,
        total: totalPriceEl.textContent
      };
      localStorage.setItem('booking', JSON.stringify(bookingData));
      alert('Бронирование сохранено!');
      modal.classList.remove('open');
      days = 1;
      updatePrice();
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const profileBtn   = document.querySelector('.profile'); 
  const authModal = document.getElementById('authModal');
  const authClose = document.getElementById('authClose');
  const openRegister  = document.getElementById('openRegister');


  profileBtn.addEventListener('click', (e) => {
    e.preventDefault();
    authModal.style.display = 'flex';
    const user = JSON.parse(localStorage.getItem('user'));
  });


  authClose.addEventListener('click', () => {
    authModal.style.display = 'none';
  });


  window.addEventListener('click', (e) => {
    if (e.target === authModal) authModal.style.display = 'none';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const profileBtn = document.querySelector('.profile'); 
  const modal = document.getElementById('authModal');
  const closeBtn = document.getElementById('authClose');

  const notRegBlock = document.getElementById('authNotRegistered');
  const regForm = document.getElementById('registerForm');
  const profileBlock = document.getElementById('authProfile');

  const openRegisterBtn = document.getElementById('openRegister');
  const regFullname = document.getElementById('regFullname');
  const regPhone = document.getElementById('regPhone');
  const regEmail = document.getElementById('regEmail');
  const regPass = document.getElementById('regPass');
  const passHelp = document.getElementById('passHelp');

  const outFullname = document.getElementById('outFullname');
  const outPhone = document.getElementById('outPhone');
  const outEmail = document.getElementById('outEmail');


  profileBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';


    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      showProfile(user);
    } else {
      showNotRegistered();
    }
  });

 
  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });


  openRegisterBtn.addEventListener('click', () => {
    notRegBlock.style.display = 'none';
    regForm.style.display = 'block';
  });


  regPass.addEventListener('input', () => {
    if (regPass.value.length < 8) {
      passHelp.style.display = 'block';
    } else {
      passHelp.style.display = 'none';
    }
  });


  regForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (regPass.value.length < 8) {
      passHelp.style.display = 'block';
      return;
    }

    const user = {
      fullname: regFullname.value.trim(),
      phone: regPhone.value.trim(),
      email: regEmail.value.trim()
    };


    localStorage.setItem('user', JSON.stringify(user));

    showProfile(user);
  });


  function showNotRegistered() {
    notRegBlock.style.display = 'block';
    regForm.style.display = 'none';
    profileBlock.style.display = 'none';
  }

  function showProfile(user) {
    notRegBlock.style.display = 'none';
    regForm.style.display = 'none';
    profileBlock.style.display = 'block';

    outFullname.textContent = user.fullname;
    outPhone.textContent = user.phone;
    outEmail.textContent = user.email;
  }
});


const deleteBtn = document.getElementById('deleteProfile');


function showNotRegisteredWithMessage(msg){
  const notReg = document.getElementById('authNotRegistered');
  const regForm = document.getElementById('registerForm');
  const profileBlock = document.getElementById('authProfile');
  if (profileBlock) profileBlock.style.display = 'none';
  if (regForm) regForm.style.display = 'none';
  if (notReg){
    notReg.style.display = 'block';

    const p = notReg.querySelector('p');
    if (p) p.textContent = msg || 'Вы ещё не зарегистрированы.';
  }
}

if (deleteBtn){
  deleteBtn.addEventListener('click', () => {

    try { localStorage.removeItem('user'); } catch {}


    showNotRegisteredWithMessage('Профиль удалён. Зарегистрируйтесь заново.');

    const toast = document.getElementById('successMessage');
    if (toast){
      const old = toast.textContent;
      toast.textContent = 'Профиль удалён.';
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; toast.textContent = old; }, 2000);
    }
  });
}