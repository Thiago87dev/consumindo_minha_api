"use client";
import { logoutUser } from "@/services/authService";
import HomeComponent from "./components/HomeComponent";

export default function Home() {
  return (
    <div className="flex flex-col items-center"> 
      <HomeComponent/>
      <button onClick={logoutUser}>Sair</button>
    </div>
  );
}
