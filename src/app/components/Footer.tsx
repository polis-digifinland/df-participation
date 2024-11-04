import Image from 'next/image'
import dflogo from '../dflogo_valkoinen.png'

export default function Footer() {
  return (
    <>
      <footer className="text-white font-secondary bg-theme-footer-background mt-xl py-12 px-6 sm:px-[120px] absolute left-0 w-full select-none">
        <div className="mx-auto  max-w-screen-xl flex flex-wrap justify-evenly items-start text-white text-sm relative bottom-0 py-5">
          <div className="flex flex-col w-1/3 min-w-[300px]">
            <h3 className="text-lg font-bold">Polis</h3>
            <p>DigiFinland ja Sitra ovat tuoneet Suomeen avoimeen lähdekoodiin perustuvan Polis-verkkoalustan. Poliksen tarkoituksena on mahdollistaa suurien ryhmien osallistuminen rakentavaan mielipiteiden vaihtoon, valitun aihepiirin ympärillä.</p>
            <p>Polis-verkkoalusta on kokeiluvaiheessa eikä vielä täytä kaikkia vaatimuksia saavutettavuuden ja käytettävyyden osalta.</p>
          </div>
            <ul className="flex flex-col w-1/3 list-none lg:px-12">
              <li className="m-2.5"><a target="_blank" rel="noreferrer" className="text-white border-0" href="https://digifinland.fi/tietosuoja/">Tietosuoja</a></li>
              <li className="m-2.5"><a target="_blank" rel="noreferrer" className="text-white border-0" href="https://digifinland.fi/toimintamme/polis-kansalaiskeskustelualusta/">Lisätietoja</a></li>
              <li className="m-2.5"><a target="_blank" rel="noreferrer" className="text-white border-0" href="https://compdemocracy.org/Welcome/">The Computational Democracy Project</a></li>
              <li className="m-2.5"><a target="_blank" rel="noreferrer" className="text-white border-0" href="https://github.com/polis-digifinland/polis-digifinland">Lähdekoodi</a></li>
            </ul>
            <ul className="flex flex-col w-1/3 list-none">
              <li><h3 className="text-lg font-bold m-0">Palveluntuottaja</h3></li>
              <li><p className="m-0">DigiFinland Oy</p></li>
              <li><p className="m-0">Siltasaarenkatu 8-10</p></li>
              <li><p className="m-0">00530 Helsinki</p></li>
            </ul>
        </div>
        <div className='flex justify-center'>
          <Image
            src={dflogo}
            alt="DigiFinland Oy footer logo"
            width={129}
            height={41}
            priority
          />
        </div>
        <div className='flex justify-center text-white text-sm flex-col sm:flex-row'>
          <div className="sm:w-1/3 text-center sm:text-right">Versio: {process.env.VERSION}</div>
          <div className="mx-6 hidden sm:block"> | </div>
          <div className="sm:w-1/3 text-center sm:text-left">Julkaistu: {process.env.PUBLISHED_DATE}</div>
        </div>
      </footer>
    </>
  )
}