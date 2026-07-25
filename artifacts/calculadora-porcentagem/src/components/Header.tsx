import { Calculator, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Calculadora' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/politica-de-privacidade', label: 'Privacidade' },
  ];

  return (
    <header className="w-full border-b border-border bg-card/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-primary transition-colors">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline">Calculadora de Porcentagem</span>
          <span className="sm:hidden">Calc %</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="sm:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
