import { useEffect } from "react";
import { useState } from "react"

const useAdminChecker = email => {
    const [adminLoading, setAdminLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (email) {
            fetch(`https://server-tawny-theta.vercel.app/users/admin/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data.isAdmin)
                setAdminLoading(false);
            })
        }
    }, [email])
    return [isAdmin,adminLoading];
}

export default useAdminChecker;