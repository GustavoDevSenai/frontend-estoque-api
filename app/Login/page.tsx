
"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function Login() {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    //funcao que faz o envio das informacoes pra o backend e salva o token no localstorage
    async function handleLogin(e:any) {
        e.preventDefault()
        
        const response = await fetch("http://localhost:3001/auth/login",{
            method: 'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,senha})
        })

        const data = await response.json()
        console.log(data)
        //Salvar o token
        localStorage.setItem("token", data.access_token)
        //Redireciona pra pagina de produtos
        router.push("/Produtos")

    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      
      onSubmit={handleLogin}   
      
      >
        
        <h2 className="text-2xl font-semibold text-center">
          Login
        </h2>

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
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
       
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