import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { GoogleAnalytics } from '@next/third-parties/google'
import Auth0ProviderWrapper from '@/components/Auth0ProviderWrapper';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Datareel",
  icons: { icon: { url: "/favicon.ico", type: "image/x-icon" } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <body className={`${poppins.className} antialiased`}>
        <Auth0ProviderWrapper>
          <div className="relative max-w-[100dvw] container px-4 mx-auto overflow-hidden">
            <Header />
            <div className="absolute inset-0 -z-10 h-[100dvh] w-full rounded-b-xl bg-gradient-to-t from-secondary/30 to-transparent" />
            <Image
              src={"/v2/Shapes/Shapes-03.svg"}
              alt="element"
              width={800}
              height={600}
              className="pointer-events-none absolute left-[20%] top-[3%] md:top-[5%] z-0 size-12 rotate-12 object-contain opacity-10 max-sm:right-3 md:size-16 lg:size-20"
            />
            <Image
              src={"/v2/Shapes/Shapes-06.svg"}
              alt="element"
              width={800}
              height={600}
              className="pointer-events-none absolute right-[10%] top-[25%] z-0 size-16 rotate-12 object-contain opacity-10 max-sm:right-3 md:size-20 lg:size-28"
            />
            <Image
              src={"/v2/Shapes/Shapes-04.svg"}
              alt="element"
              width={800}
              height={600}
              className="pointer-events-none absolute bottom-1/3 right-0 z-0 size-16 rotate-45 object-contain opacity-10 max-sm:right-3 md:size-20 lg:size-24"
            />
            <Image
              src={"/v2/Shapes/Shapes-05.svg"}
              alt="element"
              width={800}
              height={600}
              className="pointer-events-none absolute bottom-5 left-14 z-0 size-20 rotate-45 object-contain opacity-10 max-sm:right-3 md:size-24 lg:size-32"
            />
            {children}
            <Footer />
          </div>
        </Auth0ProviderWrapper>
        <GoogleAnalytics gaId='G-VVNQF96XY9' />
      </body>
    </html>
  );
}
