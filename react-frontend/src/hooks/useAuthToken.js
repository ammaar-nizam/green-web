import { jwtDecode } from 'jwt-decode';

const useAuthToken = () => {
    const accessToken = localStorage.getItem('accessToken')
    let userId = ''
    let email = ''
    let roleId = ''

    if(!accessToken) {
        window.location.href = "/";
    }

    const decodedToken = jwtDecode(accessToken);
    if (decodedToken) {
        userId = decodedToken.id
        email = decodedToken.email
        roleId = decodedToken.roleId
    }

    return { userId, email, roleId, accessToken }
}

export default useAuthToken