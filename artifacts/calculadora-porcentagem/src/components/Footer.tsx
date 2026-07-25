import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border py-10 text-center text-muted-foreground text-sm px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
          <Link to="/" className="hover:text-foreground transition-colors">Calculadora</Link>
          <Link to="/sobre" className="hover:text-foreground transition-colors">Sobre</Link>
          <Link to="/politica-de-privacidade" className="hover:text-foreground transition-colors">Política de Privacidade</Link>
        </div>
        <p className="mb-2">Ferramenta gratuita para cálculos de porcentagem no dia a dia.</p>
        <p className="mb-4">Os resultados são fornecidos para fins educacionais e informativos.</p>
        <p>© {new Date().getFullYear()} Calculadora de Porcentagem. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
