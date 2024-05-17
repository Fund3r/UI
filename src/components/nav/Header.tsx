import { Link, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import Image from 'next/image';
import NextLink from "next/link";
import { useAccount } from 'wagmi';
import { useUser } from '../../features/user/context/UserContext';
import { WalletControlBar } from '../../features/wallet/WalletControlBar';
import logo from '../../images/logos/logo.svg';
import profile from "../../images/logos/profile.svg";

export function Header() {
  const { address } = useAccount();
  const { user, logout } = useUser();

  return (
    <header className="px-2 sm:px-6 lg:px-64 pt-3 pb-2 w-full bg-swamp">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src={logo} width={144} alt="" />
        </Link>

        <div className="flex flex-col items-end md:flex-row md:items-start gap-2">
          {!user?.address && <WalletControlBar />}
          <Menu>
              <MenuButton>
                    <Image src={profile} alt="Profile" />
              </MenuButton>
                <MenuList sx={{ bg: 'white' }}>
                  <MenuGroup>
                      <MenuItem sx={{ bg: 'white' }}>
                          <Link as={NextLink} href={`/profile/${user?.address}`}>My Profile</Link>
                      </MenuItem>
                      <MenuItem sx={{ bg: 'white' }}>
                          <Link as={NextLink} href="/create">Create Project</Link>
                      </MenuItem>
                      {user?.address && (<MenuItem onClick={logout}>
                          Logout
                      </MenuItem>)}
                  </MenuGroup>
              </MenuList>
          </Menu>
        </div>
      </div>
    </header>
  );
}
