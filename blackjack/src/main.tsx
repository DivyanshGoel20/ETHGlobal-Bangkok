import { useEffect } from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DynamicContextProvider, mergeNetworks } from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { GlobalWalletExtension } from '@dynamic-labs/global-wallet'

const dynamicEnvId = process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID || "f50ee57e-444d-4b81-89bd-c5e45bc13226";

const BackgroundMusic = () => {
  useEffect(() => {
    const audio = new Audio('/background-music.mp3');
    audio.loop = true;
    audio.play();
  }, []);

  return null;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BackgroundMusic />
    <DynamicContextProvider
      settings={{
        cssOverrides: <link rel='stylesheet' href='/index.css' />, // pass JSX element to be included in the shadow DOM
        environmentId: dynamicEnvId,
        walletConnectors: [EthereumWalletConnectors],
        walletConnectorExtensions: [GlobalWalletExtension],
        overrides: {
          evmNetworks: (networks) => mergeNetworks([{
            blockExplorerUrls: ['	https://explorer.oasis.io/testnet/sapphire'],
            chainId: 23295,
            chainName: 'Oasis Sapphire',
            iconUrls: ['https://icons.llamao.fi/icons/chains/rsz_oasis.jpg'],
            name: 'Oasis',
            nativeCurrency: {
              decimals: 18,
              name: 'Rose',
              symbol: 'ROSE',
              iconUrl: 'https://icons.llamao.fi/icons/chains/rsz_oasis.jpg',
            },
            networkId: 23295,

            rpcUrls: ['https://testnet.sapphire.oasis.io'],
            vanityName: 'Oasis Sapphire',
          },], networks)
        }
      }}
    >
      <App />
    </DynamicContextProvider>
  </StrictMode>,
)
