
"use client"
import { useRouter } from "next/navigation"


export default function Login() {


     const router = useRouter()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4">
        
        <h2 className="text-2xl font-semibold text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Digite seu email"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        onClick={()=> router.push("/Produtos")}
        >
          Entrar
        </button>

        <button
          type="button"
          onClick={() => router.push("/Register")}
          className="w-full text-blue-600 hover:underline"
        >
          Criar uma conta
        </button>

      </form>

    </div>
  )
}