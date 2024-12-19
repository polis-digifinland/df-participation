import Image from 'next/image'
import dflogo from '../dflogo_valkoinen.png'
import initTranslations from '@/i18n';

interface FooterProps {
  locale: string;
}

export default async function Footer({ locale }: FooterProps) {

  const { t } = await initTranslations(locale, ['common']);

  return (
    <>
      <footer className="text-footer font-secondary bg-theme-footer-background w-full mt-xl py-12 px-6 sm:px-[120px] left-0 select-none">
        <div className="mx-auto  max-w-screen-xl flex flex-wrap justify-evenly items-start text-sm relative bottom-0 py-5">
          <div className="flex flex-col w-full sm:w-1/3 min-w-[300px]">
            <h2 className="text-2xl font-bold">{t('footer.title')}</h2>
            <p>{t('footer.desc')}</p>
            <p>{t('footer.disclaimer')}</p>
          </div>
            <ul className="flex flex-col w-full sm:w-1/3 list-none lg:px-12">
              <li><h2 className="text-2xl font-bold m-0">{t('footer.links.title')}</h2></li>
              <li className="m-2.5"><a target="_blank" rel="noreferrer" className="border-0" href="https://digifinland.fi/tietosuoja/">{t('footer.links.privacy')}</a></li>
              <li className="m-2.5"><a target="_blank" rel="noreferrer" className="border-0" href="https://digifinland.fi/toimintamme/polis-kansalaiskeskustelualusta/">{t('footer.links.info')}</a></li>
              <li className="m-2.5"><a target="_blank" rel="noreferrer" className="border-0" href="https://compdemocracy.org/Welcome/">The Computational Democracy Project</a></li>
              <li className="m-2.5"><a target="_blank" rel="noreferrer" className="border-0" href="https://github.com/polis-digifinland/polis-digifinland">{t('footer.links.source')}</a></li>
            </ul>
            <ul className="flex flex-col w-full sm:w-1/3 list-none">
              <li><h2 className="text-2xl font-bold m-0">{t('footer.provider')}</h2></li>
              <li><p className="m-0">DigiFinland Oy</p></li>
              <li><p className="m-0">Siltasaarenkatu 8-10</p></li>
              <li><p className="m-0">00530 Helsinki</p></li>
            </ul>
        </div>
        <div className='flex justify-center'>
          <Image
            src={dflogo}
            alt="DigiFinland Oy logo"
            width={129}
            height={41}
            priority
          />
        </div>
        <div className='flex justify-center text-sm flex-col sm:flex-row'>
          <div className="sm:w-1/3 text-center sm:text-right">{t('footer.version')}: {process.env.BUILD_VERSION}</div>
          <div className="mx-6 hidden sm:block"> | </div>
          <div className="sm:w-1/3 text-center sm:text-left">{t('footer.released')}: {process.env.BUILD_DATE}</div>
        </div>
      </footer>
    </>
  )
}

