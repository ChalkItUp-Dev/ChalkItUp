import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function DefaultLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto max-w-7xl px-6 mt-[40px]">
                {children}
            </main>
            <Footer />
        </div>
    );
}
