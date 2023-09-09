import React, { createContext, useReducer} from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
  // user: {
  //   _id: "63f9a8c6cb22bb2db50affa3",
  //   username: "nguyen",
  //   email: "nguyen@gmail.com",
  //   profilePicture:"person/6.jpeg",
  //   coverPicture: "",
  //   isAdmin: false,
  //   followers: [],
  //   followings: [],
  // },
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)


  return(
    <AuthContext.Provider value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
