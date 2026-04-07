'use client'
import { useState } from "react"
import toast from "react-hot-toast"
import Swal from "sweetalert2"

export default function NovoProduto() {

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [estoque, setEstoque] = useState(0)
  const [estoqueMinimo, setEstoqueMinimo] = useState(0)


  async function handleSubmit(e:any) {
    e.preventDefault()

    const produto = {
      nome,
      descricao,
      estoque,
      estoqueMinimo
    }

    await fetch('http://localhost:3001/produtos',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(produto)
    })

   Swal.fire({
        icon: 'success',
        title: 'Produto cadastrado!',
        showConfirmButton: false,
        timer: 1500,
      })
     
  }

  return(
    <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-10">
  <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
    Cadastro de Produtos
  </h1>

  <form onSubmit={handleSubmit} className="space-y-4">
    <input
    required
      placeholder="Nome"
      onChange={(e) => setNome(e.target.value)}
      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
    required
      placeholder="Descrição"
      onChange={(e) => setDescricao(e.target.value)}
      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
    required
      type="number"
      placeholder="Estoque"
      onChange={(e) => setEstoque(Number(e.target.value))}
      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
    required
      type="number"
      placeholder="Estoque Mínimo"
      onChange={(e) => setEstoqueMinimo(Number(e.target.value))}
      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Cadastrar
    </button>
  </form>
</div>
  )

}