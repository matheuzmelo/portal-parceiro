import Image from "next/image";
import Link from "next/link";
import BackdropImage from "../../../../public/images/backdrop_logo_image.png"
export default function Home() {
    return (
        <section className="grid place-items-center h-full w-full">
            <Image className="w-1/2" src={BackdropImage} alt='imagem com circulo opaco com estrela' />
        </section>
    )
}
