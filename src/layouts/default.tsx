import { Footer } from '../components/footer.tsx';
import Navbar from '../components/navbar';

export default function DefaultLayout({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
}) {
    return (
        <div className="flex flex-col min-h-screen max-w-[1024px] mx-auto">
            <Navbar title={title} />
            <main className="flex-grow container mx-auto max-w-7xl px-6 mt-[100px] pb-12">
                {children}
            </main>
            <Footer />
        </div>
    );
}
