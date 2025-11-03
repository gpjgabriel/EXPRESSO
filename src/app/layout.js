import "./globals.css";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { PrimeReactProvider } from 'primereact/api';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '../lib/registry';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: "Expresso",
  description: "Teste Técnico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <PrimeReactProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
