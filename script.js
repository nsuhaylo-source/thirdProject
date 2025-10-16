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