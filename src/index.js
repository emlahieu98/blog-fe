import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './global.css'
import ReactDOM from 'react-dom'
import { QueryClientProvider } from 'react-query'
import client from 'QueryClient'
import { Web3Provider } from './store/web3Store'

ReactDOM.render(
    <>
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <Web3Provider>
                    <App />
                </Web3Provider>
            </BrowserRouter>
            {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        </QueryClientProvider>
    </>,
    document.getElementById('root')
)
