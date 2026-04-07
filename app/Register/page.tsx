"use client"

import { useState } from "react"

export default function Register() {

    //state pra cada input
    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")

    //funcao pra submeter o formulario
    async function handleSubmit(e: any) {
        e.preventDefault()

        const usuario = {
            email,
            senha
        }

        try {
            const response = await fetch("http://localhost:3001/auth/register",{
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(usuario)
            })

            const data = await response.json()
            if(!response.ok) return
            alert("Usuario cadastrado!")
            setEmail("")
            setSenha("")

        } catch (error) {
            console.log(error)
            alert("Erro ao cadastrar!")
        }


    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
      onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >

        <h2 className="text-2xl font-semibold text-center">
          Criar Conta
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e)=>setSenha(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md"
        >
          Cadastrar
        </button>

      </form>
    </div>
  )
}