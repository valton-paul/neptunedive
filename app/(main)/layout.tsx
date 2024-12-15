import type {Metadata} from "next";
import localFont from "next/font/local";
import "../globals.css";
import Navigation from "@/components/navComponent";
import {ThemeProvider} from "next-themes";
import {QueryProvider} from "@/components/providers/QueryProvider";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "NeptuneDive",
    description: "Best diving club tool",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <body className={geistSans.className + " " + geistMono.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryProvider>
                <div className="flex h-screen overflow-hidden bg-[#e6f4ff]" suppressHydrationWarning={true}>
                    <Navigation/>
                    <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pt-16">
                        {children}
                    </main>
                </div>
            </QueryProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
