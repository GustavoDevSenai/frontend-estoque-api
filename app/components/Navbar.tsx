'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Navbar(){

    const router = useRouter()

    function handleLogout(){
        // remove token
        localStorage.removeItem("token")

        // volta pro login
        router.push("/Login")
    }

    return(
        <nav style={{
            backgroundColor:"black",
            color:'white',
            padding:'20px',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center'
        }}>

            <div>
               
                <Link href="/Produtos/novo" style={{marginLeft:'10px'}}>Novo Produto</Link>
                <Link href="/Produtos" style={{marginLeft:'10px'}}>Produtos</Link>
                <Link href="/Movimentacao" style={{marginLeft:'10px'}}>Movimentação</Link>
                <Link href="/Sobre" style={{marginLeft:'10px'}}>Sobre</Link>
            </div>

            <button
                onClick={handleLogout}
                style={{
                    backgroundColor:'red',
                    color:'white',
                    border:'none',
                    padding:'8px 15px',
                    cursor:'pointer'
                }}
            >
                Logout
            </button>

        </nav>
    )
}