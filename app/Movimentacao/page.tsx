'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Produto{
    id: number
    nome: string
    estoque: number
}

export default function Movimentacao(){

    const router = useRouter()

    const [produtos, setProdutos] = useState<Produto[]>([])
    const [produtoId, setProdutoId] = useState("")
    const [tipo, setTipo] = useState("entrada")
    const [quantidade, setQuantidade] = useState("")

    // ✅ Carregar produtos protegidos
    useEffect(()=>{

        async function carregarProdutos(){

            const token = localStorage.getItem("token")

            // se não estiver logado
            if(!token){
                router.push("/Login")
                return
            }

            const res = await fetch("http://localhost:3001/produtos",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            // token inválido / expirado
            if(res.status === 401){
                localStorage.removeItem("token")
                router.push("/Login")
                return
            }

            const data = await res.json()
            setProdutos(data)
        }

        carregarProdutos()

    },[router])



    // ✅ salvar movimentação protegida
    async function SalvarMovimentacao(e:any) {
        e.preventDefault()

        const token = localStorage.getItem("token")

        const res = await fetch('http://localhost:3001/movimentacoes',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                produtoId: Number(produtoId),
                tipo,
                quantidade: Number(quantidade)
            })
        })

        if(res.status === 401){
            localStorage.removeItem("token")
            router.push("/Login")
            return
        }

        if(!res.ok){
            const erro = await res.json()
            alert(erro.message || "Erro ao movimentar")
            return
        }

        alert("Movimentação realizada!")

        setQuantidade("")
        setProdutoId("")
    }



    return(
        <div className="container">

            <h1 className="title">Movimentar Estoque</h1>

            <form onSubmit={SalvarMovimentacao} className="form">

                <select
                    className="input"
                    value={produtoId}
                    onChange={(e)=>setProdutoId(e.target.value)}
                    required
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
                    <option value="saida">Saída</option>
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