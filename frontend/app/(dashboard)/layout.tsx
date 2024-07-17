import { Inter } from "next/font/google";
import LogOutBtn from "@/components/logoutBtn";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={inter.className}>
      <LogOutBtn />
      {children}
    </main>
  );
}
