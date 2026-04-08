'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Produto {
  id: number
  nome: string
  descricao: string
  estoque: number
  estoqueMinimo: number
}

export default function Produtos() {

  const router = useRouter()
  const [produtos, setProdutos] = useState<Produto[]>([])

  // Carrega produtos ao montar componente
  useEffect(() => {
    async function fetchProdutos() {

      const token = localStorage.getItem("token")

      if(!token){
        router.push("/Login")
        return
      }

      const res = await fetch('http://localhost:3001/produtos',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      if(res.status === 401){
        localStorage.removeItem("token")
        router.push("/Login")
        return
      }

      const data = await res.json()
      setProdutos(data)
    }
    fetchProdutos()
  }, [])

  async function excluirProduto(id: number) {
    const confirmacao = confirm("Tem certeza que deseja excluir esse produto?")
    if (!confirmacao) return

    const token = localStorage.getItem("token")

    const res = await fetch(`http://localhost:3001/produtos/${id}`, {
      method: "DELETE",
       headers: {
          Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      const erro = await res.json()
      alert(erro.message || "Erro ao excluir")
      return
    }

    // remove da tela sem reload
    setProdutos((prev) => prev.filter((p) => p.id !== id))
    alert("Produto excluído com sucesso!")
  }

  return (
    <div>
      

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition duration-300 border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{prod.nome}</h2>
              <p className="text-gray-600 mt-2 text-sm">{prod.descricao}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-green-600 font-bold">Estoque: {prod.estoque}</span>
                <span className="text-sm text-red-500">Mín: {prod.estoqueMinimo}</span>
              </div>
            </div>

            <button
              onClick={() => excluirProduto(prod.id)}
              className="mt-5 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}