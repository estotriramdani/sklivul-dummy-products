const checkAuthPrimary = () => {
  const authKey = localStorage.getItem('c5aed7e7f609d2370861f380eccb94e6');

  const isLoginPage = window.location.href.includes('/login')
  
  if (isLoginPage && authKey) {

    if (authKey) {
      window.location.replace('index.html')
    }

  } else {
    if (!authKey) {
      window.location.replace('login.html')
    }
  }

};

checkAuthPrimary()