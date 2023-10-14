import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { backendUrl } from '../variables/backendUrl'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  )
  let [user, setUser] = useState(() =>
    localStorage.getItem('authTokens')
      ? jwtDecode(localStorage.getItem('authTokens'))
      : null
  )
  const nav = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  let loginUser = async (e) => {
    e.preventDefault()
    setError(null)
    let response = await axios
      .post(
        `${backendUrl}/api/auth/token/`,
        {
          email: e.target.email.value,
          password: e.target.password.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        setAuthTokens(res.data)
        setUser(jwtDecode(res.data.access))
        localStorage.setItem('authTokens', JSON.stringify(res.data))
        nav('/profil')
      })
      .catch((err) => {
        setError(err.response.data.error)
      })
  }

  let logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    sessionStorage.clear()
    nav('/logowanie')
  }

  let contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    error: error,
    setError: setError,
  }

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access))
    }

    setLoading(false)
  }, [authTokens, loading])

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}
