import { ReactNode } from 'react';

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
