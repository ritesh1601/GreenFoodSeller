import { BackToHomeBtn } from "@/components/BackToHomeBtn";
import Footer from "@/components/Footer"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <BackToHomeBtn/>
        {children}
        <Footer/>
    </div>
  );
}
