import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import { PropsWithChildren, useState } from 'react';

import { chainMetadata } from '@hyperlane-xyz/sdk';
import { ProtocolType } from '@hyperlane-xyz/utils';
import { ChainLogo } from '@hyperlane-xyz/widgets';

import { Modal as Modals } from '../../components/layout/Modal';
import { useUser } from '../../features/user/context/UserContext';
import { login } from '../../pages/api';
import { useConnectFns } from './hooks/multiProtocol';

export function WalletEnvSelectionModal({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  const connectFns = useConnectFns();
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);

  const onClickEnv = (env: ProtocolType) => () => {
    close();
    const connectFn = connectFns[env];
    if (connectFn) connectFn();
  };

  const handleEmailModalOpen = () => {
    setEmailModalOpen(true);
    close();
  };

  const handleEmailModalClose = () => {
    setEmailModalOpen(false);
  };

  return (
    <>
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
            onClick={handleEmailModalOpen}
            subTitle="Please login with email"
          >
            I dont have a wallet
          </SocialButton>
        </div>
      </Modals>

      <EmailLoginModal isOpen={isEmailModalOpen} close={handleEmailModalClose} />
    </>
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
      <div className="uppercase text-gray-800 tracking-wide">{children}</div>
      <div className="text-sm text-gray-500">{`${subTitle}`}</div>
    </button>
  );
}

function EmailLoginModal({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, setUser } = useUser();

  const handleSubmit = async () => {
    try {
      setError('');
      const response = await login(email, password);
      console.log('Login successful:', response);
      setUser({
        address: response.data.address,
        email: response.data.email
      });
      close();
    } catch (err) {
      setError('Error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign-in</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error && <Text color="red.500">{error}</Text>}
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
