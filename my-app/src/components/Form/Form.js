import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux'
import { ADD_ITEM } from '../../redux/actionTypes/actionTypes'
import List from '../List/List';


function Form(props) {

  const dispatch = useDispatch()

  const inputValue = useRef(null);

  const handlerForm = async (event) => {
    event.preventDefault();
    const inputText = inputValue.current.value;
    const status = false;


    const response = await fetch('http://localhost:5001/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ inputText, status }),
    });
    const data = await response.json();
    if (data) {
      dispatch({ type: ADD_ITEM, payload: { id: data.id, text: inputText, status } });
        <List /> 
  } else {
  alert('Неверные данные')
}
};

return (
  <>
    <form onSubmit={handlerForm} className="input-group mb-3">
      <input ref={inputValue} type="text" className="form-control" 
      placeholder="Что сделать?" aria-describedby="button-addon2" />
      <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Добавить</button>
    </form>
  </>
);
}

export default Form;
