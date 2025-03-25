import { ReactNode } from 'react';

// TODO: criar um layout padrão para meu sistema interno
export default function PrivateLayout({
    children
}: Readonly<{
    children: React.ReactNode;
  }>) {
    return(
        <section>
            {children}
        </section>
    )
}
