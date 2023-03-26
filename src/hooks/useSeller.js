import { useEffect } from "react";
import { useState } from "react"

const useSellerChecker = email => {
    const [isSeller, setIsSeller] = useState(false);
    const [sellerLoading, setSellerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://server-tawny-theta.vercel.app/users/seller/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsSeller(data.isSeller)
                setSellerLoading(false)
            })
        }
    }, [email])
    return [isSeller, sellerLoading];
}

export default useSellerChecker;