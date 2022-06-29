import { AUTHENTICATE } from "../graphql/mutations"
import { useApolloClient, useMutation } from "@apollo/client"
import useAuthStorage from '../hooks/useAuthStorage';
const useSignIn = () => {

  const authStorage = useAuthStorage();
  const [login, result] = useMutation(AUTHENTICATE)
  const client = useApolloClient()

  const signIn = async ({ username, password }) => {
    const payload = await login({ variables: { credentials: { username, password}}})
    const { data } = payload
    if(data?.authenticate) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      client.resetStore()
    }
    return payload
  }

  return [signIn, result];
}

export default useSignIn