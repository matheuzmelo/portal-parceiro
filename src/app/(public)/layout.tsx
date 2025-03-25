import { ReactNode } from 'react';

export default function PublicLayout({
    children
}: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <section className="bg-">
            {children}
        </section>
    )
}
