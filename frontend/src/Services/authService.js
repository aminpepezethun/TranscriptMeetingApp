const BASE_URL = `${process.env.REACT_APP_API_URL}`; // localhost:8000

export const signupUser = async (data) => {
    const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    return response.json();
};
export const loginUser = async (email, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
    });
    return response.json();
};
