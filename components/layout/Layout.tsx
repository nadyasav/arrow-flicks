import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import appShellclasses from "./appShellclasses.module.css";
import Link from "next/link";
import { NavMenu } from "../navMenu/NavMenu";
import Image from 'next/image';
import styles from './Layout.module.css';

interface ILayout {
    children: React.ReactNode;
}

export const Layout = ({ children }: ILayout) => {
const [opened, { toggle }] = useDisclosure();

  return(
    <AppShell
    classNames={appShellclasses}
    navbar={{
      width: 280,
      breakpoint: 'sm',
      collapsed: { mobile: !opened },
    }}
    >
      <AppShell.Header>
        <Burger
        opened={opened}
        onClick={toggle}
        hiddenFrom="sm"
        size="sm"
        />
      </AppShell.Header>
      <AppShell.Navbar>
        <Link href='/'>
          <div className={styles.imgBox}>
            <Image alt='logo' src='/img/logo.svg' width="100" height="100" layout="responsive" objectFit="contain"></Image>
          </div>
        </Link>
        <div className={styles.navMenu}>
          <NavMenu />
        </div>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
)};
