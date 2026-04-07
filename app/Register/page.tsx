"use client"

export default function Register() {

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >

        <h2 className="text-2xl font-semibold text-center">
          Criar Conta
        </h2>

        <input
          type="email"
          placeholder="Email"
 
         
          className="w-full border rounded-md px-3 py-2"
          required
        />

        <input
          type="password"
          placeholder="Senha"
  
    
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