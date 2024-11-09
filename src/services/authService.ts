export const registerUser = async (
  username: string,
  password: string,
  email: string
) => {
  const response = await fetch("http://127.0.0.1:8000/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
  });
  if (!response.ok) throw new Error("Erro ao registrar o usuário.");
  return response.json();
};

export const loginUser = async (username: string, password: string) => {
  const response = await fetch("http://127.0.0.1:8000/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error("Erro ao fazer login");
  const data = await response.json();
  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);
  alert('Vc fez login')
  console.log(data)
  return data;
};

export const logoutUser = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    alert('Vc fez logout')
}
