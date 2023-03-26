import { useEffect } from "react";
import { useState } from "react"

const useBuyerChecker = email => {
    const [isBuyer, setIsBuyer] = useState(false);
    const [buyerLoading, setIsBuyerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://server-tawny-theta.vercel.app/users/buyer/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsBuyer(data.isBuyer)
                setIsBuyerLoading(false)
            })
        }
    }, [email])
    return [isBuyer, buyerLoading];
}

export default useBuyerChecker;