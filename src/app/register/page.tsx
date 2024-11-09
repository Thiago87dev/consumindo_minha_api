"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/authService";
const RegisterPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(username, password, email);
      router.push("/login");
    } catch (err) {
      setError(`Erro ao registrar usuario. ${err}`);
    }
  };

  return (
    <div className="flex flex-col items-center my-20">
      <h2>Registro</h2>
      <form className="flex flex-col w-52 gap-3 text-black" onSubmit={handleRegister}>
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
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="text-white" type="submit">Registrar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterPage;
