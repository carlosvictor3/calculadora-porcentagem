import { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">O valor X representa quantos % de Y?</h2>
      <p className="text-sm text-muted-foreground mb-6">Use quando quiser saber a proporção de um valor em relação a um total. Ex: 30 é quantos % de 150?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">X (valor)</label>
          <input type="text" inputMode="decimal" value={x} onChange={(e) => setX(e.target.value)} className={inputClasses} placeholder="Ex: 50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">Y (total)</label>
          <input type="text" inputMode="decimal" value={y} onChange={(e) => setY(e.target.value)} className={inputClasses} placeholder="Ex: 200" />
        </div>
      </div>
      <div className="bg-primary/5 rounded-xl p-6 mb-6 flex flex-col items-center justify-center min-h-[120px] text-center border border-primary/10">
        {isValid ? (
          <>
            <span className="text-4xl sm:text-5xl font-bold text-primary mb-2">{resultStr}%</span>
            <span className="text-muted-foreground font-medium">{formatResult(numX)} representa {resultStr}% de {formatResult(numY)}</span>
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
        <button onClick={() => { setX(''); setY(''); }} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted">
          <RotateCcw className="w-4 h-4" /> Limpar
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
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">Quanto é X% de Y?</h2>
      <p className="text-sm text-muted-foreground mb-6">Use para calcular o valor de um desconto, comissão ou qualquer fração percentual. Ex: 15% de R$ 300,00.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">X (porcentagem)</label>
          <div className="relative">
            <input type="text" inputMode="decimal" value={x} onChange={(e) => setX(e.target.value)} className={inputClasses} placeholder="Ex: 20" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium pointer-events-none">%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">Y (valor total)</label>
          <input type="text" inputMode="decimal" value={y} onChange={(e) => setY(e.target.value)} className={inputClasses} placeholder="Ex: 500" />
        </div>
      </div>
      <div className="bg-primary/5 rounded-xl p-6 mb-6 flex flex-col items-center justify-center min-h-[120px] text-center border border-primary/10">
        {isValid ? (
          <>
            <span className="text-4xl sm:text-5xl font-bold text-primary mb-2">{resultStr}</span>
            <span className="text-muted-foreground font-medium">{formatResult(numX)}% de {formatResult(numY)} é {resultStr}</span>
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
        <button onClick={() => { setX(''); setY(''); }} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted">
          <RotateCcw className="w-4 h-4" /> Limpar
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
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">Quantos % aumentou de X para Y?</h2>
      <p className="text-sm text-muted-foreground mb-6">Use para calcular reajustes, valorizações ou crescimentos. Ex: o preço subiu de R$ 80 para R$ 100 — qual foi o aumento percentual?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">X (valor inicial)</label>
          <input type="text" inputMode="decimal" value={x} onChange={(e) => setX(e.target.value)} className={inputClasses} placeholder="Ex: 100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">Y (valor final)</label>
          <input type="text" inputMode="decimal" value={y} onChange={(e) => setY(e.target.value)} className={inputClasses} placeholder="Ex: 150" />
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
            <span className="text-muted-foreground font-medium">O valor aumentou {resultStr}% de {formatResult(numX)} para {formatResult(numY)}</span>
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
        <button onClick={() => { setX(''); setY(''); }} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted">
          <RotateCcw className="w-4 h-4" /> Limpar
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
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">Quantos % diminuiu de X para Y?</h2>
      <p className="text-sm text-muted-foreground mb-6">Use para calcular descontos, depreciações ou quedas de preço. Ex: o produto baixou de R$ 200 para R$ 160 — qual foi o desconto percentual?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">X (valor inicial)</label>
          <input type="text" inputMode="decimal" value={x} onChange={(e) => setX(e.target.value)} className={inputClasses} placeholder="Ex: 150" />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">Y (valor final)</label>
          <input type="text" inputMode="decimal" value={y} onChange={(e) => setY(e.target.value)} className={inputClasses} placeholder="Ex: 120" />
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
            <span className="text-muted-foreground font-medium">O valor diminuiu {resultStr}% de {formatResult(numX)} para {formatResult(numY)}</span>
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
        <button onClick={() => { setX(''); setY(''); }} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted">
          <RotateCcw className="w-4 h-4" /> Limpar
        </button>
      </div>
    </section>
  );
}

function ArticleSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Aprenda sobre porcentagem</h2>

      <article className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
        <h3 className="text-lg font-semibold mb-3">O que é porcentagem?</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Porcentagem (ou percentagem) é uma forma de expressar uma proporção em relação a um todo de 100 partes. O símbolo <strong>%</strong> vem do latim <em>per centum</em>, que significa "por cem". Quando dizemos que algo cresceu 20%, queremos dizer que, para cada 100 unidades originais, há 20 unidades a mais.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Porcentagens estão presentes em praticamente todas as áreas da vida: nas finanças pessoais (juros, descontos, investimentos), na educação (notas e aproveitamento), na saúde (taxas de eficácia de medicamentos) e no comércio (promoções e margens de lucro).
        </p>
      </article>

      <article className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
        <h3 className="text-lg font-semibold mb-3">Como calcular desconto em porcentagem</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Calcular desconto é uma das aplicações mais comuns de porcentagem no dia a dia. Imagine que um produto custa R$ 250,00 e está com 30% de desconto. Para saber o valor do desconto:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
          <li>Divida a porcentagem de desconto por 100: 30 ÷ 100 = 0,30</li>
          <li>Multiplique pelo valor original: 0,30 × R$ 250,00 = R$ 75,00</li>
          <li>Subtraia do preço original: R$ 250,00 − R$ 75,00 = <strong className="text-foreground">R$ 175,00</strong></li>
        </ol>
        <p className="text-muted-foreground leading-relaxed">
          Você também pode usar a calculadora "Quanto é X% de Y?" acima para calcular diretamente o valor do desconto, digitando 30 no campo de porcentagem e 250 no campo de valor.
        </p>
      </article>

      <article className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
        <h3 className="text-lg font-semibold mb-3">Como calcular aumento de salário em porcentagem</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Saber calcular o aumento percentual do salário é essencial na hora de negociar com um empregador ou avaliar uma proposta. Se você ganha R$ 3.500,00 e recebeu um aumento para R$ 4.200,00, o percentual de aumento foi:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
          <li>Calcule a diferença: R$ 4.200,00 − R$ 3.500,00 = R$ 700,00</li>
          <li>Divida pela salário original: R$ 700,00 ÷ R$ 3.500,00 = 0,20</li>
          <li>Multiplique por 100: 0,20 × 100 = <strong className="text-foreground">20%</strong> de aumento</li>
        </ol>
        <p className="text-muted-foreground leading-relaxed">
          Use a calculadora "Quantos % aumentou de X para Y?" acima para fazer esse cálculo automaticamente.
        </p>
      </article>

      <article className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
        <h3 className="text-lg font-semibold mb-3">Porcentagem no mercado financeiro</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          No mercado financeiro, porcentagens aparecem em várias formas: taxa de juros, rendimento de investimentos, inflação e variação de preços de ativos. Entender como interpretar esses números é fundamental para tomar boas decisões financeiras.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Por exemplo, se você investiu R$ 10.000,00 e após um ano tem R$ 11.200,00, seu rendimento foi de 12% no período. Já se a inflação foi de 5% nesse mesmo período, seu ganho real foi de aproximadamente 7%.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Outro conceito importante é o <strong>juro composto</strong>: diferente do juro simples, onde a porcentagem é aplicada sempre sobre o valor original, no juro composto ela é aplicada sobre o montante acumulado — fazendo o dinheiro crescer de forma exponencial ao longo do tempo.
        </p>
      </article>

      <article className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
        <h3 className="text-lg font-semibold mb-3">Dicas para calcular porcentagem de cabeça</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Alguns atalhos mentais tornam o cálculo de porcentagens muito mais rápido no dia a dia:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex gap-3">
            <span className="text-primary font-bold mt-0.5">→</span>
            <div><strong className="text-foreground">10%</strong>: basta dividir o número por 10. Ex: 10% de R$ 350 = R$ 35.</div>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold mt-0.5">→</span>
            <div><strong className="text-foreground">5%</strong>: calcule 10% e divida por 2. Ex: 5% de R$ 350 = R$ 17,50.</div>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold mt-0.5">→</span>
            <div><strong className="text-foreground">20%</strong>: calcule 10% e multiplique por 2. Ex: 20% de R$ 350 = R$ 70.</div>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold mt-0.5">→</span>
            <div><strong className="text-foreground">25%</strong>: divida o número por 4. Ex: 25% de R$ 200 = R$ 50.</div>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold mt-0.5">→</span>
            <div><strong className="text-foreground">50%</strong>: divida o número por 2. Ex: 50% de R$ 180 = R$ 90.</div>
          </li>
        </ul>
      </article>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col font-sans">
      <Header />

      <div className="text-center py-10 px-4 max-w-3xl mx-auto">
        <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
          <Calculator className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          Calculadora de Porcentagem
        </h1>
        <p className="text-lg text-muted-foreground">
          Cálculos rápidos e precisos para o seu dia a dia. Descubra proporções, aumentos e descontos sem complicação.
        </p>
      </div>

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pb-16 space-y-8">
        <div id="ad-top" className="ad-slot">Publicidade</div>

        <Card1 />
        <Card2 />

        <div id="ad-middle" className="ad-slot">Publicidade</div>

        <Card3 />
        <Card4 />

        <div id="ad-bottom" className="ad-slot">Publicidade</div>

        <ArticleSection />
      </main>

      <Footer />
    </div>
  );
}
