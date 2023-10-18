const AUTH_KEY = 'c5aed7e7f609d2370861f380eccb94e6';

const API_URL = 'https://6527e890931d71583df19400.mockapi.io/api/users';

const loginFormElement = document.getElementById('loginForm');
const emailInputElement = document.getElementById('emailInput');
const passwordInputElement = document.getElementById('passwordInput');

loginFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInputElement.value;
  const password = passwordInputElement.value;

  if (!email || !password) {
    alert('Email dan password wajib diisi!');
    return;
  }

  const body = {
    email,
    password,
  };

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Something when wrong');
      }
      return response.json();
    })
    .then((response) => {
      /* 
      Contoh kasus (ideal, ada tokennya):
      1. server kasih token
      2. client simpan token

      FITUR: tambah produk
      1. Client kirim request (fetch) sesuai dengan spek API-nya, DAN di headers mengirimkan tokennya
      2. Server cek token tersebut.
        2.a. tidak valid => return 403 Forbidden
        2.b. valid => lanjut ke tahap berikutnya
      3. Masukkan produknya ke database

      ? Karena skrg tidak ada token di mockAPI, maka kita simpan semua responnya ke localStorage/web storage
      */

      const stringify = JSON.stringify(response);

      localStorage.setItem(AUTH_KEY, stringify);

      window.location.href = 'index.html';
      
    })
    .catch((error) => {
      console.error(error);
    });
});
