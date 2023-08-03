import '../styles/globals.css'
import Navigation from './component/navigation'

export default function App({ Component, pageProps }) {
  return(

    <div>
      {/*
      <Navigation />

      */}

      <Component {...pageProps} />
    </div>

  ) 
}
