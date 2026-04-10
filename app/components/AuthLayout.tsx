"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "./Navbar"



export default function AuthLayout({
    children,
}:{
    children: React.ReactNode
})
{
    const [logado, setLogado] = useState(false)
    const pathname = usePathname()


    useEffect(()=>{
        const token = localStorage.getItem("token")
        setLogado(!!token)
    },[pathname])


    return(
        <>
        {logado && <Navbar />}
        {children}
        </>
    )
}