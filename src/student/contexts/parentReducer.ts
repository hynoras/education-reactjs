import { ParentInfoForm } from "student/models/dtos/student/studentDetail"

export const parentReducer = (state: Array<ParentInfoForm>, action: any): Array<ParentInfoForm> => {
  switch (action.type) {
    case "ADD_PARENT":
      return state.concat([
        {
          id: action.id,
          full_name: action.full_name,
          birth_date: action.birth_date,
          nationality: action.nationality,
          permanent_address: action.permanent_address,
          relationship: action.relationship
        }
      ])
    case "REMOVE_PARENT":
      return state.filter((_, index: number) => index !== action.index)
    case "RESET_PARENTS":
      return action.payload
    default:
      return state
  }
}
