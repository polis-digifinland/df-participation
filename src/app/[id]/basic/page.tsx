import Cookies from "./../../components/Cookies"
import Header from "./../../components/Header"
import Conversation from "./../../components/Conversation"
import Voting from "../../components/Voting"
import Suggestions from "./../../components/Suggestions"
import Results from "./../../components/Results"
import Footer from "./../../components/Footer"
//import { cookies } from 'next/headers'
//import { useState } from "react";

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

export default async function Page({ params }: { params: { id: string, theme: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL;
  let data = null;

  // Cookie test, old version
  /*
  try {
    const response = await fetch('https://localhost:3000/api/ct', {
      method: "GET",
      credentials: 'include', // This will include cookies in the request
    });
    if (response.ok) {
      const responseCookies = response.headers.get('set-cookie');
      if (responseCookies) {
        console.log(responseCookies);
      }
    } else {
      console.error('Failed to set cookie');
    }
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
    */

/*
    const cookieStore = await cookies()
    async function createCookie() {
      "use server";
      cookieStore.set({
        name: 'ct',
        value: '1',
        domain: '.polis.local',
    });

    }

    try {
      const CookieTest = cookieStore.get('ct')


      if (CookieTest?.value === "1") {
          console.log("Cookies already tested")
      } else {
        console.log("Cookies tested")
        createCookie()
      }
    } catch (error) {
      console.error('Error setting cookie:', error);
    }*/
  //document.cookie = 'ct=true; Path=/;';


  //const CookieTest = cookies().get('ct') !== undefined;
  //console.log(CookieTest)

  // Participation initial data at server side
  try {
    // Construct absolute URL to API
    //const url = `${baseUrl}/api/participationInit?conversation_id=${params.id}`;
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
    console.error("Error fetching participation initial data:", error);
  }

  //const [participationData, setparticipationData] = useState<object>({});
  //const  [participantID, setParticipantID] = useState<number>(0);

  return (
    <>
      <Cookies
        conversation_id={params.id ? params.id : 'Conv id failed to load'}
      />
      <Header />
      <main>
        <Conversation
          topic={data ? data.conversation.topic : 'Keskustelun latauksessa tapahtui virhe.'}
          description={data ? data.conversation.description : 'Kokeile ladata sivu uudelleen.'}
        />
        <Voting
          failed_to_load={data ? false : true}
          is_active={data ? data.conversation.is_active : false}
          tid={data ? data.nextComment.tid : null}
          pid={-1} // Participant id will always be unknown at SSR, real value will be set at client side
          txt={data ? data.nextComment.txt : 'Comment failed to load'}
          conversation_id={params.id ? params.id : 'Conv id failed to load'}
          InitialTotal={data ? data.nextComment.total : 0}
          remaining={data ? data.nextComment.remaining : 0}
        />
        <Suggestions
          is_active={data ? data.conversation.is_active : false}
          write_type={data ? data.conversation.write_type : 0}
          conversation_id={params.id ? params.id : 'Conv id failed to load'}
        />
        <Results
          is_active={data ? data.conversation.is_active : false}
          vis_type={data ? data.conversation.vis_type : 0}
        />
      </main>
      <Footer />
    </>
  );
}