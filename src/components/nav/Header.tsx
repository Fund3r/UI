import { Avatar, Link, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import Image from 'next/image';
import NextLink from "next/link";
import { useAccount } from 'wagmi';
import { WalletControlBar } from '../../features/wallet/WalletControlBar';
import Logo from '../../images/logos/app-logo.svg';
import Name from '../../images/logos/app-name.svg';
import Title from '../../images/logos/app-title.svg';

export function Header({ pathName }: { pathName: string }) {
  const { address } = useAccount();

  // const navLinkClass = (path?: string) =>
  //   path && pathName === path ? styles.navLink + ' underline' : styles.navLink;

  return (
    <header className="px-2 sm:px-6 lg:px-64 pt-3 pb-2 w-full">
      <div className="flex items-start justify-between">
        <Link href="/" className="py-2 flex items-center">
          <Image src={Logo} width={24} alt="" />
          <Image src={Name} width={130} alt="" className="hidden sm:block mt-0.5 ml-2" />
          <Image src={Title} width={210} alt="" className="mt-0.5 ml-2 pb-px" />
        </Link>

        {/* <nav className="sm:flex sm:space-x-8 py-2 flex items-center">
          <Link href="/explorer" className={navLinkClass('/explorer')}>
            Explorer
          </Link>
          <Link href="/create" className={navLinkClass('/create')}>
            Create Project
          </Link>
        </nav> */}

        <div className="flex flex-col items-end md:flex-row-reverse md:items-start gap-2">
          <WalletControlBar />
          {address && (
              <Menu>
                  <MenuButton>
                      <Avatar src="https://bit.ly/broken-link" ml={"20px"} />
                  </MenuButton>
                  <MenuList>
                      <MenuGroup>
                          <MenuItem>
                              <Link as={NextLink} href={`/profile/${address}`}>My Profile</Link>
                          </MenuItem>
                          <MenuItem>
                              <Link as={NextLink} href="/create">Create Project</Link>
                          </MenuItem>
                      </MenuGroup>
                  </MenuList>
              </Menu>
          )}
        </div>
      </div>
    </header>
  );
}

const styles = {
  navLink:
    'flex items-center font-medium text-white tracking-wide hover:underline active:opacity-80 decoration-4 decoration-pink-500 underline-offset-[2px] transition-all',
};
