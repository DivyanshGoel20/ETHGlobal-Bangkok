import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { GlobalWalletExtension } from '@dynamic-labs/global-wallet'

const dynamicEnvId = process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID || "f50ee57e-444d-4b81-89bd-c5e45bc13226";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DynamicContextProvider
      settings={{
        environmentId: dynamicEnvId,
        walletConnectors: [EthereumWalletConnectors],
        walletConnectorExtensions: [GlobalWalletExtension]
      }}
    >
      <App />
    </DynamicContextProvider>
  </StrictMode>,
)
