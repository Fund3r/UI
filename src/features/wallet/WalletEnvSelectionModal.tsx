import { PropsWithChildren } from 'react';

import { chainMetadata } from '@hyperlane-xyz/sdk';
import { ProtocolType } from '@hyperlane-xyz/utils';
import { ChainLogo } from '@hyperlane-xyz/widgets';

import { Modal as Modals } from '../../components/layout/Modal';

import { useConnectFns } from './hooks/multiProtocol';

export function WalletEnvSelectionModal({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  const connectFns = useConnectFns();
  '0x12BfA5a2B2566e89bF4E32d3B5516c1E010d30f4'
  const onClickEnv = (env: ProtocolType) => () => {
    close();
    const connectFn = connectFns[env];
    if (connectFn) connectFn();
  };

  return (
    <Modals title="Select Login Method" isOpen={isOpen} close={close} width="max-w-sm">
      <div className="pt-4 pb-2 flex flex-col space-y-2.5">
        <EnvButton
          onClick={onClickEnv(ProtocolType.Ethereum)}
          subTitle="an EVM"
          logoChainId={chainMetadata.ethereum.chainId}
        >
          Ethereum
        </EnvButton>
        <SocialButton
          // onClick={SocialOnclick()}
          subTitle="Please login with email"
        >
          I dont have a wallet
        </SocialButton>
      </div>
    </Modals>
  );
}

function EnvButton({
  onClick,
  subTitle,
  logo,
  logoChainId,
  children,
}: PropsWithChildren<{
  subTitle: string;
  logoChainId?: number | string;
  logo?: React.ReactElement;
  onClick?: () => void;
}>) {
  if (!logo) {
    if (!logoChainId) throw new Error('Either logo or logoChainId must be provided');
    if (typeof logoChainId !== 'number') throw new Error('logoChainId must be a number');
    logo = <ChainLogo chainId={logoChainId} size={34} />;
  }
  return (
    <button
      onClick={onClick}
      className="w-full py-3.5 space-y-2.5 flex flex-col items-center rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-200 active:bg-gray-200 transition-all"
    >
      {logo}
      <div className="uppercase text-gray-800 tracking-wide">{children}</div>
      <div className="text-sm text-gray-500">{`Connect to ${subTitle} compatible wallet`}</div>
    </button>
  );
}

function SocialButton({
  onClick,
  subTitle,
  children,
}: PropsWithChildren<{
  subTitle: string;
  onClick?: () => void;
}>) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3.5 space-y-2.5 flex flex-col items-center rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-200 active:bg-gray-200 transition-all"
    >
      {/* {logo} */}
      <div className="uppercase text-gray-800 tracking-wide">{children}</div>
      <div className="text-sm text-gray-500">{`${subTitle}`}</div>
    </button>
  );
}

// function SocialOnclick() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   return (
//     <>
//       {/* <Button onClick={onOpen}>Open Modal</Button> */}
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Modal Title</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             {/* <Lorem count={2} /> */}
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme='blue' mr={3} onClick={onClose}>
//               Close
//             </Button>
//             <Button variant='ghost'>Secondary Action</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   )
// }
