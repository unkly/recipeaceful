import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

type Props = {
    children: React.ReactNode
}

export const LoginProvider = ( {children}: Props) => {
    const session = useSession()
    const router = useRouter()

    if (session.status == "unauthenticated") router.push('/login')

    return children
}
