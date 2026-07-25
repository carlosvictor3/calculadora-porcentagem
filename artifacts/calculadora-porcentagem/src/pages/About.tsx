import { Calculator, Target, Shield, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            Sobre a Calculadora de Porcentagem
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Uma ferramenta gratuita, simples e precisa para todos os cálculos de porcentagem do seu dia a dia.
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4">Nossa missão</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A Calculadora de Porcentagem nasceu com um propósito simples: tornar os cálculos matemáticos do cotidiano mais fáceis e acessíveis para todos. Seja para calcular um desconto nas compras, o aumento do salário, a variação de preços ou qualquer outra situação que envolva porcentagens, nossa ferramenta foi projetada para fornecer respostas rápidas e precisas.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Acreditamos que todo mundo merece ter acesso a ferramentas matemáticas confiáveis, sem precisar lembrar de fórmulas ou recorrer a apps complicados. Por isso, mantemos a calculadora gratuita e sem cadastro.
            </p>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-card rounded-2xl border border-card-border p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Rápida</h3>
              <p className="text-sm text-muted-foreground">Resultados em tempo real, conforme você digita. Sem precisar clicar em "calcular".</p>
            </div>
            <div className="bg-card rounded-2xl border border-card-border p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Precisa</h3>
              <p className="text-sm text-muted-foreground">Cálculos matematicamente corretos, com explicação detalhada de cada operação.</p>
            </div>
            <div className="bg-card rounded-2xl border border-card-border p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Gratuita</h3>
              <p className="text-sm text-muted-foreground">100% gratuita, sem cadastro, sem anúncios invasivos. Apenas a ferramenta que você precisa.</p>
            </div>
          </div>

          <section className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4">O que você pode calcular</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-foreground">Proporção percentual</strong> — Descubra quanto por cento um valor representa em relação a outro. Útil para calcular a participação de uma parcela em um total.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-foreground">Valor de uma porcentagem</strong> — Calcule o valor exato que corresponde a uma determinada porcentagem. Ideal para descontos e comissões.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-foreground">Aumento percentual</strong> — Saiba em quantos por cento um valor cresceu de um período para outro. Ótimo para analisar reajustes e valorizações.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-foreground">Diminuição percentual</strong> — Calcule a queda percentual entre dois valores. Perfeito para entender descontos, depreciações e reduções.
                </div>
              </li>
            </ul>
          </section>

          <section className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4">Tecnologia e privacidade</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Todos os cálculos são realizados diretamente no seu navegador — nenhum dado é enviado para servidores. Isso significa que suas informações ficam completamente privadas.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              O site utiliza o Google AdSense para exibir anúncios relevantes, que nos ajudam a manter a ferramenta gratuita. Para saber mais sobre como seus dados são tratados, consulte nossa{' '}
              <a href="/politica-de-privacidade" className="text-primary hover:underline">Política de Privacidade</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
