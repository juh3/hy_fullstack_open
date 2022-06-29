import { useApolloClient } from '@apollo/client'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-native'
import useAuthStorage from '../hooks/useAuthStorage'

const SignOut = () => {
  const authStorage = useAuthStorage()
  const client = useApolloClient()
  let navigate = useNavigate()

  const signout = async () => {
    await authStorage.removeAccessToken()
    await client.resetStore()
    navigate("/", {replace: true})
  }

  useEffect(() => {
    signout()
  },[])
  return(
    <></>
  )
}

export default SignOut