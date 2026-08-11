import { useState } from 'react';
import {
  RotateCcw, ChevronDown, TrendingUp, TrendingDown,
  Tag, DollarSign, BarChart2, RefreshCw, Divide,
  ShoppingCart, Briefcase, PiggyBank,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

/* ─── helpers ─────────────────────────────────────────── */
const parse = (v: string) => {
  if (!v) return NaN;
  let s = v.replace(/\s/g, '');
  if (s.includes(',') && s.includes('.')) s = s.replace(/\./g, '').replace(',', '.');
  else if (s.includes(',')) s = s.replace(',', '.');
  return parseFloat(s);
};
const fmt = (n: number) =>
  isNaN(n) || !isFinite(n)
    ? '—'
    : new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(n);
const fmtR = (n: number) =>
  isNaN(n) || !isFinite(n)
    ? '—'
    : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);

const inp =
  'w-full bg-white border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-lg transition-all outline-none placeholder:text-slate-300 shadow-sm';

/* ─── result box ──────────────────────────────────────── */
function Result({ value, label, color = 'blue' }: { value: string; label?: string; color?: string }) {
  const colors: Record<string, string> = {
    blue:   'from-blue-50 to-blue-100 border-blue-200 text-blue-700',
    green:  'from-green-50 to-green-100 border-green-200 text-green-700',
    purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-700',
    emerald:'from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-700',
    orange: 'from-orange-50 to-orange-100 border-orange-200 text-orange-700',
    teal:   'from-teal-50 to-teal-100 border-teal-200 text-teal-700',
    rose:   'from-rose-50 to-rose-100 border-rose-200 text-rose-700',
  };
  const cls = colors[color] ?? colors.blue;
  return (
    <div className={`bg-gradient-to-br ${cls} border rounded-2xl p-6 text-center min-h-[110px] flex flex-col items-center justify-center mb-6`}>
      <span className="text-4xl sm:text-5xl font-extrabold mb-1">{value}</span>
      {label && <span className="text-sm font-medium opacity-70 mt-1">{label}</span>}
    </div>
  );
}

/* ─── card shell ──────────────────────────────────────── */
function Card({
  id, icon: Icon, iconBg, title, subtitle, children,
}: {
  id: string; icon: React.ElementType; iconBg: string;
  title: string; subtitle: string; children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="bg-white rounded-3xl shadow-md border border-slate-200 p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300 scroll-mt-20"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">{title}</h2>
          <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

/* ─── clear button ─────────────────────────────────────── */
function ClearBtn({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-end">
      <button
        onClick={onClick}
        className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors px-4 py-2 rounded-xl hover:bg-slate-100"
      >
        <RotateCcw className="w-4 h-4" /> Limpar
      </button>
    </div>
  );
}

/* ─── how we calc box ──────────────────────────────────── */
function HowBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Como calculamos</p>
      <div className="text-sm text-slate-600 leading-relaxed">{children}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   CALCULATORS
══════════════════════════════════════════════════════════ */
function C1() {
  const [x, sx] = useState(''); const [y, sy] = useState('');
  const nx = parse(x), ny = parse(y);
  const ok = !isNaN(nx) && !isNaN(ny) && ny !== 0;
  const r = ok ? (nx / ny) * 100 : NaN;
  return (
    <Card id="proporcao" icon={Divide} iconBg="bg-blue-500" title="Que porcentagem X é de Y?" subtitle="Descubra a proporção de um valor em relação ao total">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Valor (X)</label>
          <input type="text" inputMode="decimal" value={x} onChange={e => sx(e.target.value)} className={inp} placeholder="Ex: 50" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Total (Y)</label>
          <input type="text" inputMode="decimal" value={y} onChange={e => sy(e.target.value)} className={inp} placeholder="Ex: 200" />
        </div>
      </div>
      <Result value={ok ? `${fmt(r)}%` : '—'} label={ok ? `${fmt(nx)} é ${fmt(r)}% de ${fmt(ny)}` : undefined} color="blue" />
      <HowBox>
        <p className="mb-1">Dividimos X pelo total Y e multiplicamos por 100.</p>
        <code className="text-blue-600 font-semibold">({ok ? fmt(nx) : 'X'} ÷ {ok ? fmt(ny) : 'Y'}) × 100 = {ok ? fmt(r) : '?'}%</code>
      </HowBox>
      <ClearBtn onClick={() => { sx(''); sy(''); }} />
    </Card>
  );
}

function C2() {
  const [x, sx] = useState(''); const [y, sy] = useState('');
  const nx = parse(x), ny = parse(y);
  const ok = !isNaN(nx) && !isNaN(ny);
  const r = ok ? (nx / 100) * ny : NaN;
  return (
    <Card id="valor" icon={DollarSign} iconBg="bg-green-500" title="Quanto é X% de Y?" subtitle="Calcule o valor exato de uma porcentagem">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Porcentagem (X)</label>
          <div className="relative">
            <input type="text" inputMode="decimal" value={x} onChange={e => sx(e.target.value)} className={inp} placeholder="Ex: 20" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold pointer-events-none">%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Valor total (Y)</label>
          <input type="text" inputMode="decimal" value={y} onChange={e => sy(e.target.value)} className={inp} placeholder="Ex: 500" />
        </div>
      </div>
      <Result value={ok ? fmt(r) : '—'} label={ok ? `${fmt(nx)}% de ${fmt(ny)} é ${fmt(r)}` : undefined} color="green" />
      <HowBox>
        <p className="mb-1">Multiplicamos Y pela porcentagem dividida por 100.</p>
        <code className="text-green-600 font-semibold">({ok ? fmt(nx) : 'X'} ÷ 100) × {ok ? fmt(ny) : 'Y'} = {ok ? fmt(r) : '?'}</code>
      </HowBox>
      <ClearBtn onClick={() => { sx(''); sy(''); }} />
    </Card>
  );
}

function C3() {
  const [p, sp] = useState(''); const [orig, sorig] = useState('');
  const np = parse(p), no = parse(orig);
  const ok = !isNaN(np) && !isNaN(no);
  const desc = ok ? (np / 100) * no : NaN;
  const final = ok ? no - desc : NaN;
  return (
    <Card id="desconto" icon={Tag} iconBg="bg-purple-500" title="Preço com desconto" subtitle="Calcule o preço final após aplicar um desconto percentual">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Preço original (R$)</label>
          <input type="text" inputMode="decimal" value={orig} onChange={e => sorig(e.target.value)} className={inp} placeholder="Ex: 250,00" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Desconto (%)</label>
          <div className="relative">
            <input type="text" inputMode="decimal" value={p} onChange={e => sp(e.target.value)} className={inp} placeholder="Ex: 30" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold pointer-events-none">%</span>
          </div>
        </div>
      </div>
      {ok && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
            <p className="text-xs text-red-400 font-semibold uppercase mb-1">Economia</p>
            <p className="text-2xl font-extrabold text-red-600">{fmtR(desc)}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-center">
            <p className="text-xs text-purple-400 font-semibold uppercase mb-1">Preço final</p>
            <p className="text-2xl font-extrabold text-purple-600">{fmtR(final)}</p>
          </div>
        </div>
      )}
      {!ok && <Result value="—" color="purple" />}
      <HowBox>
        <p className="mb-1">Calculamos o desconto e subtraímos do preço original.</p>
        <code className="text-purple-600 font-semibold">{ok ? fmtR(no) : 'R$ orig.'} − ({ok ? fmt(np) : 'X'}% ÷ 100 × {ok ? fmtR(no) : 'R$ orig.'}) = {ok ? fmtR(final) : '?'}</code>
      </HowBox>
      <ClearBtn onClick={() => { sp(''); sorig(''); }} />
    </Card>
  );
}

function C4() {
  const [x, sx] = useState(''); const [y, sy] = useState('');
  const nx = parse(x), ny = parse(y);
  const ok = !isNaN(nx) && !isNaN(ny) && nx !== 0;
  const warn = ok && ny < nx;
  const r = ok ? ((ny - nx) / nx) * 100 : NaN;
  return (
    <Card id="aumento" icon={TrendingUp} iconBg="bg-emerald-500" title="Aumento percentual" subtitle="Calcule em quantos % um valor cresceu">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Valor inicial (X)</label>
          <input type="text" inputMode="decimal" value={x} onChange={e => sx(e.target.value)} className={inp} placeholder="Ex: 100" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Valor final (Y)</label>
          <input type="text" inputMode="decimal" value={y} onChange={e => sy(e.target.value)} className={inp} placeholder="Ex: 150" />
        </div>
      </div>
      {warn && <div className="text-orange-600 bg-orange-50 border border-orange-200 px-4 py-3 rounded-xl mb-6 text-sm font-medium">⚠️ O valor final é menor que o inicial — use a calculadora de diminuição.</div>}
      <Result value={ok && !warn ? `+${fmt(r)}%` : '—'} label={ok && !warn ? `De ${fmt(nx)} para ${fmt(ny)}` : undefined} color="emerald" />
      <HowBox>
        <p className="mb-1">Diferença entre os valores dividida pelo inicial, vezes 100.</p>
        <code className="text-emerald-600 font-semibold">({ok ? fmt(ny) : 'Y'} − {ok ? fmt(nx) : 'X'}) ÷ {ok ? fmt(nx) : 'X'} × 100 = {ok && !warn ? fmt(r) : '?'}%</code>
      </HowBox>
      <ClearBtn onClick={() => { sx(''); sy(''); }} />
    </Card>
  );
}

function C5() {
  const [x, sx] = useState(''); const [y, sy] = useState('');
  const nx = parse(x), ny = parse(y);
  const ok = !isNaN(nx) && !isNaN(ny) && nx !== 0;
  const warn = ok && ny > nx;
  const r = ok ? ((nx - ny) / nx) * 100 : NaN;
  return (
    <Card id="diminuicao" icon={TrendingDown} iconBg="bg-orange-500" title="Diminuição percentual" subtitle="Calcule em quantos % um valor caiu">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Valor inicial (X)</label>
          <input type="text" inputMode="decimal" value={x} onChange={e => sx(e.target.value)} className={inp} placeholder="Ex: 150" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Valor final (Y)</label>
          <input type="text" inputMode="decimal" value={y} onChange={e => sy(e.target.value)} className={inp} placeholder="Ex: 120" />
        </div>
      </div>
      {warn && <div className="text-orange-600 bg-orange-50 border border-orange-200 px-4 py-3 rounded-xl mb-6 text-sm font-medium">⚠️ O valor final é maior que o inicial — use a calculadora de aumento.</div>}
      <Result value={ok && !warn ? `−${fmt(r)}%` : '—'} label={ok && !warn ? `De ${fmt(nx)} para ${fmt(ny)}` : undefined} color="orange" />
      <HowBox>
        <p className="mb-1">Diferença entre os valores dividida pelo inicial, vezes 100.</p>
        <code className="text-orange-600 font-semibold">({ok ? fmt(nx) : 'X'} − {ok ? fmt(ny) : 'Y'}) ÷ {ok ? fmt(nx) : 'X'} × 100 = {ok && !warn ? fmt(r) : '?'}%</code>
      </HowBox>
      <ClearBtn onClick={() => { sx(''); sy(''); }} />
    </Card>
  );
}

function C6() {
  const [p, sp] = useState(''); const [orig, sorig] = useState('');
  const np = parse(p), no = parse(orig);
  const ok = !isNaN(np) && !isNaN(no);
  const acr = ok ? (np / 100) * no : NaN;
  const final = ok ? no + acr : NaN;
  return (
    <Card id="acrescimo" icon={BarChart2} iconBg="bg-teal-500" title="Preço com acréscimo" subtitle="Calcule o preço final após aplicar juros ou taxas">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Preço original (R$)</label>
          <input type="text" inputMode="decimal" value={orig} onChange={e => sorig(e.target.value)} className={inp} placeholder="Ex: 400,00" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Acréscimo (%)</label>
          <div className="relative">
            <input type="text" inputMode="decimal" value={p} onChange={e => sp(e.target.value)} className={inp} placeholder="Ex: 10" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold pointer-events-none">%</span>
          </div>
        </div>
      </div>
      {ok && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-center">
            <p className="text-xs text-teal-400 font-semibold uppercase mb-1">Acréscimo</p>
            <p className="text-2xl font-extrabold text-teal-600">+{fmtR(acr)}</p>
          </div>
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-center">
            <p className="text-xs text-teal-400 font-semibold uppercase mb-1">Preço final</p>
            <p className="text-2xl font-extrabold text-teal-700">{fmtR(final)}</p>
          </div>
        </div>
      )}
      {!ok && <Result value="—" color="teal" />}
      <HowBox>
        <p className="mb-1">Calculamos o acréscimo e somamos ao preço original.</p>
        <code className="text-teal-600 font-semibold">{ok ? fmtR(no) : 'R$ orig.'} + ({ok ? fmt(np) : 'X'}% ÷ 100 × {ok ? fmtR(no) : 'R$ orig.'}) = {ok ? fmtR(final) : '?'}</code>
      </HowBox>
      <ClearBtn onClick={() => { sp(''); sorig(''); }} />
    </Card>
  );
}

function C7() {
  const [p, sp] = useState(''); const [final, sfinal] = useState('');
  const np = parse(p), nf = parse(final);
  const ok = !isNaN(np) && !isNaN(nf) && np < 100;
  const orig = ok ? nf / (1 - np / 100) : NaN;
  const economia = ok ? orig - nf : NaN;
  return (
    <Card id="original" icon={RefreshCw} iconBg="bg-rose-500" title="Qual era o valor original?" subtitle="Descubra o preço antes do desconto a partir do preço final">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Preço com desconto (R$)</label>
          <input type="text" inputMode="decimal" value={final} onChange={e => sfinal(e.target.value)} className={inp} placeholder="Ex: 175,00" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Desconto aplicado (%)</label>
          <div className="relative">
            <input type="text" inputMode="decimal" value={p} onChange={e => sp(e.target.value)} className={inp} placeholder="Ex: 30" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold pointer-events-none">%</span>
          </div>
        </div>
      </div>
      {ok && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
            <p className="text-xs text-rose-400 font-semibold uppercase mb-1">Valor original</p>
            <p className="text-2xl font-extrabold text-rose-600">{fmtR(orig)}</p>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
            <p className="text-xs text-rose-400 font-semibold uppercase mb-1">Economia</p>
            <p className="text-2xl font-extrabold text-rose-700">{fmtR(economia)}</p>
          </div>
        </div>
      )}
      {!ok && <Result value="—" color="rose" />}
      <HowBox>
        <p className="mb-1">Dividimos o preço final por (1 − desconto/100).</p>
        <code className="text-rose-600 font-semibold">{ok ? fmtR(nf) : 'R$ final'} ÷ (1 − {ok ? fmt(np) : 'X'}% ÷ 100) = {ok ? fmtR(orig) : '?'}</code>
      </HowBox>
      <ClearBtn onClick={() => { sp(''); sfinal(''); }} />
    </Card>
  );
}

/* ═══ PRACTICAL EXAMPLES ══════════════════════════════════ */
const examples = [
  {
    icon: ShoppingCart, color: 'bg-purple-100 text-purple-600',
    title: 'Desconto nas compras',
    scenario: 'Uma jaqueta custa R$ 380,00 e está com 25% de desconto.',
    result: 'Desconto de R$ 95,00 → Preço final: R$ 285,00',
    tip: 'Use a calculadora "Preço com desconto" acima.',
  },
  {
    icon: Briefcase, color: 'bg-emerald-100 text-emerald-600',
    title: 'Reajuste de salário',
    scenario: 'Seu salário é R$ 3.200,00 e você recebeu 12% de aumento.',
    result: 'Aumento de R$ 384,00 → Novo salário: R$ 3.584,00',
    tip: 'Use a calculadora "Preço com acréscimo" acima.',
  },
  {
    icon: PiggyBank, color: 'bg-blue-100 text-blue-600',
    title: 'Rendimento de investimento',
    scenario: 'Você investiu R$ 5.000,00 e resgatou R$ 5.650,00 após 1 ano.',
    result: 'O rendimento foi de 13% no período.',
    tip: 'Use a calculadora "Aumento percentual" acima.',
  },
  {
    icon: Tag, color: 'bg-orange-100 text-orange-600',
    title: 'Encontrar o preço original',
    scenario: 'Você viu uma bolsa por R$ 210,00 com 30% de desconto. Quanto custava antes?',
    result: 'Preço original era R$ 300,00.',
    tip: 'Use a calculadora "Qual era o valor original?" acima.',
  },
];

function PracticalExamples() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Exemplos práticos do dia a dia</h2>
      <p className="text-slate-500 mb-6">Veja como usar as calculadoras em situações reais.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {examples.map(({ icon: Icon, color, title, scenario, result, tip }) => (
          <div key={title} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-700">{title}</h3>
            </div>
            <p className="text-sm text-slate-500 mb-2">{scenario}</p>
            <p className="text-sm font-semibold text-slate-700 mb-2">✅ {result}</p>
            <p className="text-xs text-slate-400 italic">{tip}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══ FAQ ═════════════════════════════════════════════════ */
const faqs = [
  {
    q: 'Como calcular 10% de qualquer valor rapidamente?',
    a: 'Basta dividir o número por 10. Por exemplo, 10% de R$ 350,00 é R$ 35,00. Para 5%, divida por 10 e depois por 2. Para 20%, divida por 10 e multiplique por 2.',
  },
  {
    q: 'Como calcular porcentagem de desconto?',
    a: 'Use a fórmula: desconto (%) = (valor do desconto ÷ preço original) × 100. Se um produto custava R$ 200 e agora custa R$ 160, o desconto foi de (40 ÷ 200) × 100 = 20%.',
  },
  {
    q: 'Qual a diferença entre porcentagem e ponto percentual?',
    a: 'Porcentagem expressa uma proporção (ex: 10% de R$ 500 = R$ 50). Ponto percentual é a diferença aritmética entre duas porcentagens: se os juros subiram de 5% para 7%, houve aumento de 2 pontos percentuais, não de 40%.',
  },
  {
    q: 'Como calcular o valor original antes do desconto?',
    a: 'Se você sabe o preço final e o percentual de desconto, use: valor original = preço final ÷ (1 − desconto/100). Exemplo: produto por R$ 140 com 30% de desconto → R$ 140 ÷ 0,70 = R$ 200,00.',
  },
  {
    q: 'O que é porcentagem acumulada?',
    a: 'É a porcentagem total resultante de aplicações sequenciais. Dois descontos de 10% não equivalem a 20% — na prática, 10% sobre R$ 100 = R$ 90, depois mais 10% = R$ 81, equivalendo a 19% de desconto total.',
  },
  {
    q: 'Como calcular porcentagem de lucro?',
    a: 'Margem de lucro (%) = ((preço de venda − custo) ÷ custo) × 100. Se você comprou por R$ 80 e vendeu por R$ 100, o lucro percentual é (20 ÷ 80) × 100 = 25%.',
  },
  {
    q: 'Como converter porcentagem em fração e decimal?',
    a: '15% = 15/100 = 0,15. Para converter % em decimal, divida por 100. Para converter decimal em %, multiplique por 100. Exemplos: 0,75 = 75%; 1/4 = 0,25 = 25%.',
  },
  {
    q: 'Qual é a fórmula geral de porcentagem?',
    a: 'A fórmula base é: porcentagem = (parte ÷ total) × 100. A partir dela derivamos todas as outras: parte = (porcentagem × total) ÷ 100; total = (parte × 100) ÷ porcentagem.',
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Perguntas frequentes</h2>
      <p className="text-slate-500 mb-6">Dúvidas comuns sobre cálculos de porcentagem.</p>
      <div className="space-y-3">
        {faqs.map(({ q, a }, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="pr-4">{q}</span>
              <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <div className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                {a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══ ARTICLES ════════════════════════════════════════════ */
function Articles() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Aprenda sobre porcentagem</h2>
      <p className="text-slate-500 mb-6">Conceitos explicados de forma simples e direta.</p>
      <div className="space-y-4">
        {[
          {
            title: 'O que é porcentagem?',
            body: 'Porcentagem (%) vem do latim per centum — "por cem". Expressa uma proporção em relação a 100 partes. Dizer que algo cresceu 20% significa que, para cada 100 unidades originais, há 20 a mais. Porcentagens estão em finanças, saúde, comércio e praticamente em toda estatística do dia a dia.',
          },
          {
            title: 'Como calcular desconto em porcentagem passo a passo',
            body: 'Produto de R$ 250 com 30% de desconto: (1) divida o desconto por 100 → 30 ÷ 100 = 0,30; (2) multiplique pelo preço → 0,30 × R$ 250 = R$ 75; (3) subtraia → R$ 250 − R$ 75 = R$ 175. Ou use nossa calculadora acima e obtenha o resultado instantâneo.',
          },
          {
            title: 'Porcentagem no mercado financeiro',
            body: 'Juros, rendimentos e inflação são expressos em %. No juro simples, a taxa incide sempre sobre o valor inicial. No juro composto, incide sobre o saldo acumulado — fazendo o dinheiro crescer de forma exponencial. Um rendimento de 1% ao mês equivale a cerca de 12,68% ao ano em juros compostos, não 12%.',
          },
          {
            title: 'Dicas para calcular % de cabeça',
            body: '10%: divida por 10. 5%: divida por 10 e depois por 2. 20%: divida por 5 (ou dobre o de 10%). 25%: divida por 4. 50%: divida por 2. 1%: divida por 100. Combinando esses atalhos você chega a qualquer porcentagem com rapidez.',
          },
        ].map(({ title, body }) => (
          <article key={title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ═══ QUICK NAV ═══════════════════════════════════════════ */
const navItems = [
  { href: '#proporcao', label: 'Proporção %', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
  { href: '#valor',     label: 'Valor de %',  color: 'bg-green-100 text-green-700 hover:bg-green-200' },
  { href: '#desconto',  label: 'Desconto',    color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
  { href: '#aumento',   label: 'Aumento %',   color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
  { href: '#diminuicao',label: 'Queda %',     color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
  { href: '#acrescimo', label: 'Acréscimo',   color: 'bg-teal-100 text-teal-700 hover:bg-teal-200' },
  { href: '#original',  label: 'Valor original', color: 'bg-rose-100 text-rose-700 hover:bg-rose-200' },
];

/* ═══ HERO ════════════════════════════════════════════════ */
function Hero() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #1e40af 0%, #4338ca 100%)' }} className="py-14 px-4 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-1.5 text-sm font-semibold mb-6 text-white/90">
          🧮 7 calculadoras gratuitas
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          Calculadora de<br />
          <span style={{ color: '#bfdbfe' }}>Porcentagem</span>
        </h1>
        <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
          Calcule descontos, aumentos, proporções e muito mais — resultados instantâneos, sem complicação.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {navItems.map(({ href, label, color }) => (
            <a
              key={href}
              href={href}
              className={`${color} rounded-full px-4 py-2 text-sm font-semibold transition-colors`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══ AD SLOT ═════════════════════════════════════════════ */
function Ad() {
  return <div className="ad-slot bg-slate-100 border border-slate-200 rounded-2xl text-slate-400 text-sm text-center py-8">Publicidade</div>;
}

/* ═══ PAGE ════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full bg-slate-50 flex flex-col font-sans">
      <Header />
      <Hero />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10 space-y-8">
        <Ad />
        <C1 />
        <C2 />
        <C3 />
        <Ad />
        <C4 />
        <C5 />
        <C6 />
        <C7 />
        <Ad />
        <PracticalExamples />
        <FAQ />
        <Articles />
      </main>

      <Footer />
    </div>
  );
}
