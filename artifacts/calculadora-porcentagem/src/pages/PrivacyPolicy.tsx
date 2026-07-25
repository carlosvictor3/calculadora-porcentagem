import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-2">
          Política de Privacidade
        </h1>
        <p className="text-muted-foreground mb-10">Última atualização: julho de 2025</p>

        <div className="space-y-8 prose-custom">

          <section className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4">1. Introdução</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Calculadora de Porcentagem (<strong>calculadoradeporcentagem.online</strong>) respeita a sua privacidade e está comprometida em proteger as informações dos usuários. Esta política descreve quais dados são coletados, como são utilizados e quais são os seus direitos.
            </p>
          </section>

          <section className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4">2. Dados que não coletamos</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Todos os cálculos realizados neste site são feitos diretamente no seu navegador (lado do cliente). <strong>Não armazenamos, transmitimos nem temos acesso aos valores que você digita nas calculadoras.</strong> Nenhum dado pessoal é coletado por nós diretamente.
            </p>
          </section>

          <section className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4">3. Google AdSense e cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Este site utiliza o <strong>Google AdSense</strong> para exibir anúncios. O Google, como fornecedor terceirizado, utiliza cookies para exibir anúncios com base nas visitas anteriores do usuário a este e a outros sites.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              O uso de cookies de publicidade pelo Google permite que ele e seus parceiros exibam anúncios aos usuários com base na visita a nosso site e/ou a outros sites na Internet. Os usuários podem desativar a publicidade personalizada acessando as <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Configurações de anúncios do Google</a>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Para mais informações sobre como o Google usa dados de parceiros, consulte a <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Política de Privacidade do Google</a>.
            </p>
          </section>

          <section className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4">4. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Este site pode usar cookies de terceiros (como o Google AdSense) para fins de publicidade e análise. Cookies são pequenos arquivos de texto armazenados no seu navegador que permitem identificar visitas recorrentes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Você pode configurar seu navegador para recusar cookies ou para alertar quando cookies estão sendo enviados. No entanto, se você recusar cookies, algumas partes do site podem não funcionar corretamente.
            </p>
          </section>

          <section className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4">5. Links externos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nosso site pode conter links para sites externos. Não somos responsáveis pelas práticas de privacidade ou pelo conteúdo desses sites. Recomendamos que você leia as políticas de privacidade de qualquer site que visitar.
            </p>
          </section>

          <section className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4">6. Seus direitos</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Como não coletamos dados pessoais diretamente, não há dados para acessar, corrigir ou excluir em nossos sistemas. Para dados coletados pelo Google AdSense, você pode exercer seus direitos diretamente pelas ferramentas do Google.
            </p>
          </section>

          <section className="bg-card text-card-foreground rounded-2xl shadow-sm border border-card-border p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4">7. Alterações nesta política</h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você a revise regularmente. A data da última atualização está sempre indicada no topo desta página.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
