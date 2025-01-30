import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl px-6 flex-grow mt-[40px] ">
                {children}
            </main>
            <Footer />
        </div>
    );
}
