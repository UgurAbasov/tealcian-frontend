import getUser from "./getUser"
import refresh from "./refresh"
const checkAuth = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  const accessToken = localStorage.getItem('accessToken')
  if (!refreshToken || !accessToken) {
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    return 0
  }
  const accessResponse = await getUser(accessToken)
  if (accessResponse.id) {
    localStorage.setItem('userId', accessResponse.id);
    return 1
  } else {
    const refreshResponse = await refresh(refreshToken)
    if (refreshResponse.accessToken) {
      localStorage.setItem('accessToken', refreshResponse.accessToken)
      return 1
    } else {
      return 0
    }
  }
}


export default checkAuth