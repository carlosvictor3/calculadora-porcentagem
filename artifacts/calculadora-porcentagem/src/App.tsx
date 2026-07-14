import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

const parsePtBrNumber = (val: string) => {
  if (!val) return NaN;
  let str = val.replace(/\s/g, '');
  if (str.includes(',') && str.includes('.')) {
    str = str.replace(/\./g, '').replace(',', '.');
  } else if (str.includes(',')) {
    str = str.replace(',', '.');
  }
  return parseFloat(str);
};

const formatResult = (num: number) => {
  if (isNaN(num) || !isFinite(num)) return '—';
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(num);
};

const inputClasses =
  'w-full bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 text-lg transition-all outline-none text-foreground placeholder:text-muted-foreground shadow-sm';

function Header() {
  return (
    <header className="text-center py-12 px-4 max-w-3xl mx-auto">
      <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
        <Calculator className="w-8 h-8" />
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
        Calculadora de Porcentagem
      </h1>
      <p className="text-lg text-muted-foreground">
        Cálculos rápidos e precisos para o seu dia a dia. Descubra proporções, aumentos e descontos sem complicação.
      </p>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-border py-12 text-center text-muted-foreground text-sm px-4">
      <p className="mb-2">A Calculadora de Porcentagem é uma ferramenta gratuita criada para facilitar o seu dia a dia financeiro.</p>
      <p className="mb-4">Esta calculadora é fornecida para fins educacionais e informativos.</p>
      <p>© {new Date().getFullYear()} Calculadora de Porcentagem. Todos os direitos reservados.</p>
    </footer>
  );
}

function Card1() {
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const numX = parsePtBrNumber(x);
  const numY = parsePtBrNumber(y);

  const isValid = !isNaN(numX) && !isNaN(numY) && numY !== 0;
  const result = isValid ? (numX / numY) * 100 : NaN;
  const resultStr = formatResult(result);

  return (
    <section className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">O valor X representa quantos % de Y?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">X (valor)</label>
          <input
            type="text"
            inputMode="decimal"
            value={x}
            onChange={(e) => setX(e.target.value)}
            className={inputClasses}
            placeholder="Ex: 50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">Y (total)</label>
          <input
            type="text"
            inputMode="decimal"
            value={y}
            onChange={(e) => setY(e.target.value)}
            className={inputClasses}
            placeholder="Ex: 200"
          />
        </div>
      </div>

      <div className="bg-primary/5 rounded-xl p-6 mb-6 flex flex-col items-center justify-center min-h-[120px] text-center border border-primary/10">
        {isValid ? (
          <>
            <span className="text-4xl sm:text-5xl font-bold text-primary mb-2">{resultStr}%</span>
            <span className="text-muted-foreground font-medium">
              {formatResult(numX)} representa {resultStr}% de {formatResult(numY)}
            </span>
          </>
        ) : (
          <span className="text-4xl sm:text-5xl font-bold text-muted-foreground/30">—</span>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Como calculamos</h3>
        <div className="text-sm text-foreground/80 leading-relaxed bg-muted/50 border border-border p-4 rounded-lg overflow-x-auto">
          <p className="mb-2">Dividimos o valor <strong>X</strong> pelo total <strong>Y</strong> e multiplicamos por 100.</p>
          <code className="text-primary font-semibold bg-primary/5 px-2 py-1 rounded inline-block whitespace-nowrap">
            ({isValid ? formatResult(numX) : 'X'} ÷ {isValid ? formatResult(numY) : 'Y'}) × 100 = {isValid ? resultStr : 'resultado'}%
          </code>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setX('');
            setY('');
          }}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted"
        >
          <RotateCcw className="w-4 h-4" />
          Limpar
        </button>
      </div>
    </section>
  );
}

function Card2() {
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const numX = parsePtBrNumber(x);
  const numY = parsePtBrNumber(y);

  const isValid = !isNaN(numX) && !isNaN(numY);
  const result = isValid ? (numX / 100) * numY : NaN;
  const resultStr = formatResult(result);

  return (
    <section className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Quanto é X% de Y?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">X (porcentagem)</label>
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              value={x}
              onChange={(e) => setX(e.target.value)}
              className={inputClasses}
              placeholder="Ex: 20"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium pointer-events-none">%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">Y (valor total)</label>
          <input
            type="text"
            inputMode="decimal"
            value={y}
            onChange={(e) => setY(e.target.value)}
            className={inputClasses}
            placeholder="Ex: 500"
          />
        </div>
      </div>

      <div className="bg-primary/5 rounded-xl p-6 mb-6 flex flex-col items-center justify-center min-h-[120px] text-center border border-primary/10">
        {isValid ? (
          <>
            <span className="text-4xl sm:text-5xl font-bold text-primary mb-2">{resultStr}</span>
            <span className="text-muted-foreground font-medium">
              {formatResult(numX)}% de {formatResult(numY)} é {resultStr}
            </span>
          </>
        ) : (
          <span className="text-4xl sm:text-5xl font-bold text-muted-foreground/30">—</span>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Como calculamos</h3>
        <div className="text-sm text-foreground/80 leading-relaxed bg-muted/50 border border-border p-4 rounded-lg overflow-x-auto">
          <p className="mb-2">Multiplicamos <strong>Y</strong> pela porcentagem dividida por 100.</p>
          <code className="text-primary font-semibold bg-primary/5 px-2 py-1 rounded inline-block whitespace-nowrap">
            ({isValid ? formatResult(numX) : 'X'} ÷ 100) × {isValid ? formatResult(numY) : 'Y'} = {isValid ? resultStr : 'resultado'}
          </code>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setX('');
            setY('');
          }}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted"
        >
          <RotateCcw className="w-4 h-4" />
          Limpar
        </button>
      </div>
    </section>
  );
}

function Card3() {
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const numX = parsePtBrNumber(x);
  const numY = parsePtBrNumber(y);

  const isValid = !isNaN(numX) && !isNaN(numY) && numX !== 0;
  const isWarning = isValid && numY < numX;
  const result = isValid ? ((numY - numX) / numX) * 100 : NaN;
  const resultStr = formatResult(result);

  return (
    <section className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Quantos % aumentou de X para Y?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">X (valor inicial)</label>
          <input
            type="text"
            inputMode="decimal"
            value={x}
            onChange={(e) => setX(e.target.value)}
            className={inputClasses}
            placeholder="Ex: 100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">Y (valor final)</label>
          <input
            type="text"
            inputMode="decimal"
            value={y}
            onChange={(e) => setY(e.target.value)}
            className={inputClasses}
            placeholder="Ex: 150"
          />
        </div>
      </div>

      {isWarning && (
        <div className="flex gap-2 text-destructive bg-destructive/10 px-4 py-3 rounded-lg mb-6 text-sm font-medium border border-destructive/20">
          <span>⚠️ O valor final é menor que o inicial. Use a calculadora de diminuição.</span>
        </div>
      )}

      <div className="bg-primary/5 rounded-xl p-6 mb-6 flex flex-col items-center justify-center min-h-[120px] text-center border border-primary/10">
        {isValid && !isWarning ? (
          <>
            <span className="text-4xl sm:text-5xl font-bold text-primary mb-2">{resultStr}%</span>
            <span className="text-muted-foreground font-medium">
              O valor aumentou {resultStr}% de {formatResult(numX)} para {formatResult(numY)}
            </span>
          </>
        ) : (
          <span className="text-4xl sm:text-5xl font-bold text-muted-foreground/30">—</span>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Como calculamos</h3>
        <div className="text-sm text-foreground/80 leading-relaxed bg-muted/50 border border-border p-4 rounded-lg overflow-x-auto">
          <p className="mb-2">Calculamos a diferença (Y − X), dividimos pelo valor inicial X e multiplicamos por 100.</p>
          <code className="text-primary font-semibold bg-primary/5 px-2 py-1 rounded inline-block whitespace-nowrap">
            (({isValid ? formatResult(numY) : 'Y'} − {isValid ? formatResult(numX) : 'X'}) ÷ {isValid ? formatResult(numX) : 'X'}) × 100 = {isValid && !isWarning ? resultStr : 'resultado'}%
          </code>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setX('');
            setY('');
          }}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted"
        >
          <RotateCcw className="w-4 h-4" />
          Limpar
        </button>
      </div>
    </section>
  );
}

function Card4() {
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const numX = parsePtBrNumber(x);
  const numY = parsePtBrNumber(y);

  const isValid = !isNaN(numX) && !isNaN(numY) && numX !== 0;
  const isWarning = isValid && numY > numX;
  const result = isValid ? ((numX - numY) / numX) * 100 : NaN;
  const resultStr = formatResult(result);

  return (
    <section className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Quantos % diminuiu de X para Y?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">X (valor inicial)</label>
          <input
            type="text"
            inputMode="decimal"
            value={x}
            onChange={(e) => setX(e.target.value)}
            className={inputClasses}
            placeholder="Ex: 150"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">Y (valor final)</label>
          <input
            type="text"
            inputMode="decimal"
            value={y}
            onChange={(e) => setY(e.target.value)}
            className={inputClasses}
            placeholder="Ex: 120"
          />
        </div>
      </div>

      {isWarning && (
        <div className="flex gap-2 text-destructive bg-destructive/10 px-4 py-3 rounded-lg mb-6 text-sm font-medium border border-destructive/20">
          <span>⚠️ O valor final é maior que o inicial. Use a calculadora de aumento.</span>
        </div>
      )}

      <div className="bg-primary/5 rounded-xl p-6 mb-6 flex flex-col items-center justify-center min-h-[120px] text-center border border-primary/10">
        {isValid && !isWarning ? (
          <>
            <span className="text-4xl sm:text-5xl font-bold text-primary mb-2">{resultStr}%</span>
            <span className="text-muted-foreground font-medium">
              O valor diminuiu {resultStr}% de {formatResult(numX)} para {formatResult(numY)}
            </span>
          </>
        ) : (
          <span className="text-4xl sm:text-5xl font-bold text-muted-foreground/30">—</span>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Como calculamos</h3>
        <div className="text-sm text-foreground/80 leading-relaxed bg-muted/50 border border-border p-4 rounded-lg overflow-x-auto">
          <p className="mb-2">Calculamos a diferença (X − Y), dividimos pelo valor inicial X e multiplicamos por 100.</p>
          <code className="text-primary font-semibold bg-primary/5 px-2 py-1 rounded inline-block whitespace-nowrap">
            (({isValid ? formatResult(numX) : 'X'} − {isValid ? formatResult(numY) : 'Y'}) ÷ {isValid ? formatResult(numX) : 'X'}) × 100 = {isValid && !isWarning ? resultStr : 'resultado'}%
          </code>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setX('');
            setY('');
          }}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted"
        >
          <RotateCcw className="w-4 h-4" />
          Limpar
        </button>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pb-16 space-y-8">
        <div id="ad-top" className="ad-slot">Publicidade</div>

        <Card1 />
        <Card2 />

        <div id="ad-middle" className="ad-slot">Publicidade</div>

        <Card3 />
        <Card4 />

        <div id="ad-bottom" className="ad-slot">Publicidade</div>
      </main>

      <Footer />
    </div>
  );
}
