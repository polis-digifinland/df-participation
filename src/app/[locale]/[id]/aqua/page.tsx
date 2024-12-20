import CookiesAndData from "@/lib/CookiesAndData"
import Header from "@/components/Header"
import Conversation from "@/components/Conversation"
import Voting from "@/components/Voting"
import Suggestions from "@/components/Suggestions"
import Results from "@/components/Results"
import Footer from "@/components/Footer"
import { notFound } from 'next/navigation';
import initTranslations from '@/i18n';
import TranslationsProvider from '@/components/TranslationsProvider';

// Import here the CSS file for the theme that is in the same folder as this file
// This will allow Next.js to include the CSS file in the build and use SSR.
import "./theme.css";


// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = parseInt(process.env.REVALIDATE_TIME || '60', 10);

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

//export async function generateStaticParams() {
//  return [{ theme: 'df' }, { theme: 'basic' }, { theme: 'dark' }]
//}

export default async function Page({ params }: { params: { locale: string, id: string, theme: string } }) {

  const i18nNamespaces = ['common'];
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  const baseUrl = process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL;
  let data = null;

  //if (params.id === undefined || params.id === null || params.id === 'sitemap.xml') {
  //  return notFound();
  //}


  // Participation initial data at server side
  try {
    // Construct absolute URL to API
    const url = `${baseUrl}/api/v3/participationInit?conversation_id=${params.id}`;
    //console.log(`participationInit API URL: ${url}`);

    const response = await fetch(url.toString(), {
      method: "GET",
      next: { revalidate }, // Next.js will revalidate the data at defined interval
      credentials: 'include', // This will include cookies in the request
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${revalidate}, stale-while-revalidate=${revalidate}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json(); // Get the JSON response
    } else {
      throw new Error("Received non-JSON response");
    }
  } catch (error) {
    return notFound();
    console.error("Error fetching participation initial data:", error);
  }

  return (
    <>
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={params.locale}
      resources={resources}>
      <CookiesAndData
        conversation_id={params.id ? params.id : t('status.loadError.topic')}
        locale={params.locale}
      />
      <Header />
      <main className="mx-auto px-md w-full max-w-screen-sm flex-1">
        <Conversation
          topic={data ? data.conversation.topic : t('status.loadError.topic')}
          description={data ? data.conversation.description : t('status.loadError.desc')}
        />
        <Voting
          failed_to_load={data ? false : true}
          is_active={data ? data.conversation.is_active : false}
          conversation_id={params.id ? params.id : t('status.loadError.topic')}
          InitialTotal={data ? data.nextComment.total : 0}
          locale={params.locale}
        />
        <Suggestions
          is_active={data ? data.conversation.is_active : false}
          write_type={data ? data.conversation.write_type : 0}
          conversation_id={params.id ? params.id : t('status.loadError.topic')}
          locale={params.locale}
        />
        <Results
          is_active={data ? data.conversation.is_active : false}
          vis_type={data ? data.conversation.vis_type : 0}
          conversation_id={params.id ? params.id : t('status.loadError.topic')}
          locale={params.locale}
        />
      </main>
      <Footer locale={params.locale} />
    </TranslationsProvider>
    </>
  );
}

