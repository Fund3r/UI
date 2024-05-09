import { RainbowKitProvider, connectorsForWallets, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
  argentWallet,
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { PropsWithChildren, useMemo } from 'react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { ProtocolType } from '@hyperlane-xyz/utils';

import { APP_NAME } from '../../../consts/app';
import { config } from '../../../consts/config';
import { getWarpCore } from '../../../context/context';
import { Color } from '../../../styles/Color';
import { getWagmiChainConfig } from '../../chains/metadata';
import { tryGetChainMetadata } from '../../chains/utils';

import { ParticleNetwork } from '@particle-network/auth';
import { particleWallet } from '@particle-network/rainbowkit-ext';

const { chains, publicClient } = configureChains(getWagmiChainConfig(), [publicProvider()]);

new ParticleNetwork({
  appId: process.env.NEXT_PUBLIC_APP_ID as string,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
})

const popularWallets = {
  groupName: "Popular",
  wallets: [
    particleWallet({ chains, authType: "google" }),
    particleWallet({ chains, authType: "email" }),
    particleWallet({ chains }),
    injectedWallet({ chains }),
    rainbowWallet({ chains, projectId: "walletconnect project id" }),
    coinbaseWallet({ appName: "RainbowKit demo", chains }),
    metaMaskWallet({ chains, projectId: "walletconnect project id" }),
    walletConnectWallet({ chains, projectId: "walletconnect project id" }),
  ],
}

const connectorConfig = {
  chains,
  publicClient,
  appName: APP_NAME,
  projectId: config.walletConnectProjectId,
};

const connectors = connectorsForWallets([
  popularWallets,
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet(connectorConfig),
      injectedWallet(connectorConfig),
      walletConnectWallet(connectorConfig),
      ledgerWallet(connectorConfig),
    ],
  },
  {
    groupName: 'More',
    wallets: [
      coinbaseWallet(connectorConfig),
      omniWallet(connectorConfig),
      rainbowWallet(connectorConfig),
      trustWallet(connectorConfig),
      argentWallet(connectorConfig),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
});

export function EvmWalletContext({ children }: PropsWithChildren<unknown>) {
  const initialChain = useMemo(() => {
    const tokens = getWarpCore().tokens;
    const firstEvmToken = tokens.filter((token) => token.protocol === ProtocolType.Ethereum)?.[0];
    return tryGetChainMetadata(firstEvmToken?.chainName)?.chainId as number;
  }, []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: Color.primaryBlue,
          borderRadius: 'small',
          fontStack: 'system',
        })}
        initialChain={initialChain}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
