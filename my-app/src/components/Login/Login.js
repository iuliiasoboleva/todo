import React, { useRef, useEffect } from 'react';
import styles from './Login.module.css'

function Login(props) {

  const inputEmail = useRef(null);
  const inputPassword = useRef(null);

  const handlerForm = async (event) => {
    event.preventDefault();
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;

   const response = await fetch('http://localhost:5001/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.message) {
      window.location = '/'
    } else {
      alert('Неверные данные')
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1>
          Login
        </h1>
        <form onSubmit={handlerForm}>
          <div className="uk-margin">
            <input ref={inputEmail} className="uk-input" type="email" placeholder="Input" />
          </div>
          <div className="uk-margin">
            <input ref={inputPassword} className="uk-input" type="password" placeholder="Input" />
          </div>
          <button className="uk-button uk-button-default">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Login;
