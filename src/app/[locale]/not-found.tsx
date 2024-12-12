import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './[id]/df/theme.css';
import initTranslations from '@/i18n';

export default async function NotFound() {

  const locale = "fi";
  const { t } = await initTranslations(locale, ['common']);

  return (
    <>
      <Header />
      <div id="NotFound" className="text-primary select-none mt-md mx-auto max-w-screen-sm">
        <h1 className="font-primary text-3xl font-bold">{t('status.error')}</h1>
        <div className="font-secondary mt-sm">
            <p>{t('status.notFound')}</p>
        </div>
      </div>
      <Footer locale={locale} />
    </>
  );
}

