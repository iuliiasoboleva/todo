import { GET_ITEMS, DEL_ITEM, UPD_ITEM, ADD_ITEM, UPD_STATUS } from "../actionTypes/actionTypes"

const initialState = { items: [] }


const itemReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_ITEM:
    return {...state, items: [...state.items, action.payload]}  

    case GET_ITEMS:
      return { ...state, items: action.payload }

    case DEL_ITEM:
      return { ...state, items: state.items.filter(item => item.id !== action.payload) }

      case UPD_STATUS:
        return {
          ...state, items: state.items.map(item => {
            if (item.id === action.payload.id) {
              return { ...item, status: action.payload.status }
            } else {
              return item
            }
          })
        }

    case UPD_ITEM:
      return {
        ...state, items: state.items.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, text: action.payload.text }
          } else {
            return item
          }
        })
      }

    default:
      return state
  }
}

export default itemReducer
