import Link from "next/link";
import PrivateLayout from "../layout";

export default function Home() {
    return (
        <PrivateLayout>
            <h1>
                HOME
            </h1>
            <br />
            <Link className="underline" href={'/sign-in'}>Clique aqui para voltar para o login</Link>
        </PrivateLayout>
    )
}
