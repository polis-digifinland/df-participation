import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './[id]/df/theme.css';

export default async function NotFound() {
  return (
    <>
      <Header />
      <div id="NotFound" className="text-primary select-none mt-md mx-auto max-w-screen-sm">
        <h1 className="font-primary text-3xl font-bold">Virhe</h1>
        <div className="font-secondary mt-sm">
            <p>Pyydettyä resurssia ei löytynyt</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

