import { Link, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import Image from 'next/image';
import NextLink from "next/link";
import { useAccount } from 'wagmi';
import { WalletControlBar } from '../../features/wallet/WalletControlBar';
import logo from '../../images/logos/logo.svg';
import profile from "../../images/logos/profile.svg";

export function Header() {
  const { address } = useAccount();

  return (
    <header className="px-2 sm:px-6 lg:px-64 pt-3 pb-2 w-full bg-swamp">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src={logo} width={144} alt="" />
        </Link>

        <div className="sm:flex-row flex flex-col items-end md:flex-row md:items-start gap-2">
          <WalletControlBar />
          
          {address && (
              <Menu>
                  <MenuButton>
                        <Image src={profile} alt="Profile" />
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
