import Header from "./../../components/Header"
import Conversation from "./../../components/Conversation"
import ProgressBar from "./../../components/ProgressBar"
import Cards from "./../../components/Cards"
import Suggestions from "./../../components/Suggestions"
import Results from "./../../components/Results"
import Footer from "./../../components/Footer"

import "./theme.css";

export default async function Page({
  params,
}: {
  params: { id: string },
}) {
  let data = null;

  try {
    // Construct absolute URL
    const baseUrl = process.env.INTERNAL_API_BASE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/participationInit?conversation_id=${params.id}`;
    console.log(`Internal API URL: ${url}`);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
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

  return (
    <>
      <Header />
      <main>
        <Conversation
          topic={data ? data.externalApiResponse.conversation.topic : 'Topic failed to load'}
          description={data ? data.externalApiResponse.conversation.description : 'Description failed to load'}
        />
        <ProgressBar
          total={data ? data.externalApiResponse.nextComment.total : 0}
          remaining={data ? data.externalApiResponse.nextComment.remaining : 0}
        />
        <Cards 
          tid={data ? data.externalApiResponse.nextComment.tid : null}
          txt={data ? data.externalApiResponse.nextComment.txt : 'Comment failed to load'}
        />
        <Suggestions />
        <Results />
      </main>
      <Footer />
    </>
  );
}