"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e:any) {
    e.preventDefault()

    setLoading(true)

    try {

      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      })

      if (!response.ok) {
        throw new Error("Login inválido")
      }

      const data = await response.json()

      localStorage.setItem("token", data.access_token)

      router.push("/Produtos")

    } catch (error) {
      alert("Email ou senha inválidos")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
        onSubmit={handleLogin}
      >

       
        <Image
          src="/estoque.png"
          alt="logotipo"
          width={100}
          height={100}
          className="mx-auto"
        />

        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Digite seu email"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          value={senha}
          onChange={(e)=>setSenha(e.target.value)}
          placeholder="Digite sua senha"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        
        <button
          type="submit"
          disabled={loading}
          className="w-full
            bg-blue-600
            text-white
            py-2
            rounded-md
            flex
            justify-center
            items-center
            gap-2
            transition
            disabled:bg-gray-400
          "
        >
          {loading && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          )}

          {loading ? "Entrando..." : "Entrar"}
        </button>

        <button>

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