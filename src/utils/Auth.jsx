export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token)
}

export const getAuthToken = () => {
    return localStorage.getItem('authToken')
}

export const getUserEmail = () => {
    return localStorage.getItem('userEmail')
}

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
};