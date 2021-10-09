import { UPD_ITEM } from "../actionTypes/actionTypes"

export const updItemAC = (payload) => {
  return {
    type: UPD_ITEM,
    payload
  }
}
