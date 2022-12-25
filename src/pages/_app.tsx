import type { AppProps } from "next/app"
import Head from "next/head"

import "../globals.css"

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container mx-auto">
      <Head>
        <meta name="referrer" content="no-referrer" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}
