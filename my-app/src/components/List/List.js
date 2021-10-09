import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { GET_ITEMS } from '../../redux/actionTypes/actionTypes'
import Task from '../Task/Task';

function List() {
  const dispatch = useDispatch()
  const state = useSelector(state => state.itemReducer.items)

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:5001/');
      const data = await response.json();
      if (data) {
        dispatch({ type: GET_ITEMS, payload: data })
      } else {
        alert('Неверные данные')
      }
    })()
  }, [dispatch])

  return (
    <div>
      <ul>
        {state.map((item) => <Task key={item.id} item={item} />)}
      </ul>
    </div>
  );
}

export default List;
