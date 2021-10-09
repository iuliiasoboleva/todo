/* eslint-disable no-unused-expressions */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { DEL_ITEM, UPD_ITEM, UPD_STATUS } from '../../redux/actionTypes/actionTypes'
import styles from './Task.module.css'

function Task({ item }) {
  const [checkedInput, setCheckedInput] = useState(false);

  const inputForEdit = useRef(null);
  const formForEdit = useRef(null);
  const checkbox = useRef(null);

  useEffect(() => {
    inputForEdit.current.focus()
  }, [])

  const dispatch = useDispatch()

  const { id } = useParams();


  const items = useSelector(state => state.itemReducer.items)

  const currentCard = items.find(el => el.id === item.id)

  useEffect(() => {
    currentCard?.status === true ?
      setCheckedInput(true) :
      setCheckedInput(false)
  }, [currentCard?.status])



  const checkedItem = async ({ target: { checked } }) => {
    if (checkbox.current.checked === true) {
      const id = item.id;
      const status = true;
      const response = await fetch(`http://localhost:5001/checked/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (data.message) {
        dispatch({ type: UPD_STATUS, payload: { status: true } });
        checkbox.current.checked === false
      } else {
        alert('Неверные данные')
      }
    } else if (checkbox.current.checked === false) {

      const id = item.id;
      const status = false;
      const response = await fetch(`http://localhost:5001/checked/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (data.message) {
        dispatch({ type: UPD_STATUS, payload: { status: false } });
        checkbox.current.checked === false
      } else {
        alert('Неверные данные')
      }
    } else {
      alert('Неверные данные')
    }
  }

  const deleteItem = async () => {
    const id = item.id;
    const response = await fetch(`http://localhost:5001/${id}`,
      {
        method: 'DELETE',
      });
    const data = await response.json();
    if (data.id) {
      dispatch({ type: DEL_ITEM, payload: id });
    } else {
      alert('Неверные данные')
    }
  };

  const editItem = async () => {
    formForEdit.current.style = 'display: block'
  }

  const handlerEditedForm = async () => {
    const id = item.id;
    const inputNewText = inputForEdit.current.value;
    const status = false;
    const response = await fetch(`http://localhost:5001/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputNewText, status }),
    });

    const data = await response.json();
    if (data.message) {
      dispatch({ type: UPD_ITEM, payload: { text: inputNewText } });
    } else {
      alert('Неверные данные')
    }
  }

  return (

    <div className="form-check form-check-inline" style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <input onClick={checkedItem} checked={checkedInput ? 'checked' : null}
          ref={checkbox} className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
        <label className="form-check-label" htmlFor="inlineCheckbox1">{item?.text}</label>
        <form ref={formForEdit} onSubmit={handlerEditedForm} className="input-group mb-3" style={{ display: "none" }}>
          <input ref={inputForEdit} type="text"
            placeholder="Что сделать?" aria-describedby="button-addon2" />
          <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Исправить</button>
        </form>
      </div>
      <div>
        <button onClick={editItem} type="button" className="btn btn-primary" className={styles.btnPrimary}>Изменить</button>
        <button onClick={deleteItem} type="button" className="btn btn-primary">Удалить</button>
      </div>
    </div>
  )
};

export default Task;
