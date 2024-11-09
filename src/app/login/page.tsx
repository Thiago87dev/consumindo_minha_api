"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      router.push("/");
    } catch (err) {
      setError(`Senha ou usuário incorreto ${err}`);
    }
  };

  return (
    <div className="flex flex-col items-center my-20">
      <h2>Login</h2>
      <form className="flex flex-col w-52 gap-3 text-black" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="text-white" type="submit">Entrar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
