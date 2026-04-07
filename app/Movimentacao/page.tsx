'use client'
import { useEffect, useState } from "react"

interface Produto{
    id: number
    nome: string
    estoque: number
}

export default function Movimentacao(){

    const [produtos, setProdutos] = useState<Produto[]>([])
    const [produtoId, setProdutoId] = useState("")
    const [tipo, setTipo] = useState("entrada")
    const [quantidade, setQuantidade] = useState("")

    //Carregar os produtos
    useEffect(()=>{
        fetch("http://localhost:3001/produtos")
        .then(res => res.json())
        .then(data => setProdutos(data))
    },[])


    async function SalvarMovimentacao(e:any) {
        e.preventDefault()

       const res = await fetch('http://localhost:3001/movimentacoes',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                produtoId: Number(produtoId),
                tipo,
                quantidade: Number(quantidade)
            })
        })

        if(!res.ok){
            const erro = await res.json()
            alert(erro.message || "Erro ao movimentar")
            return
        }

        alert("Movimentacao realizada!")

        setQuantidade("")
    }


    return(
        <div className="container">
  <h1 className="title">Movimentar Estoque</h1>

  <form onSubmit={SalvarMovimentacao} className="form">

    <select
      className="input"
      value={produtoId}
      onChange={(e)=>setProdutoId(e.target.value)}
    >
      <option value="">Selecione um produto</option>

      {produtos.map((produto)=>(
        <option key={produto.id} value={produto.id}>
          {produto.nome} - Estoque: {produto.estoque}
        </option>
      ))}
    </select>

    <select
      className="input"
      value={tipo}
      onChange={(e)=>setTipo(e.target.value)}
    >
      <option value="entrada">Entrada</option>
      <option value="saida">Saida</option>   
    </select>

    <input
      className="input"
      placeholder="Quantidade..."
      value={quantidade}
      onChange={(e)=>setQuantidade(e.target.value)}
      required
    />

    <button className="button" type="submit">
      Movimentar
    </button>

  </form>
</div>
            
    )

}