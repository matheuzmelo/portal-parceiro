import Link from "next/link";

export default function Home() {
    return (
        <>
            <h1>
                HOME
            </h1>
            <br />
            <Link className="underline" href={'/massificado'}>Massificado</Link>
            <br />
            <Link className="underline" href={'/sign-in'}>Clique aqui para voltar para o login</Link>
        </>
    )
}
