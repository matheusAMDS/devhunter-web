import 'bootstrap/dist/css/bootstrap.min.css'
import { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useRef } from "react"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const queryClientRef = useRef<QueryClient>()

  if (!queryClientRef.current)
    queryClientRef.current = new QueryClient()

  return (
    <QueryClientProvider client={queryClientRef.current}>
      {/* <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate> */}
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
