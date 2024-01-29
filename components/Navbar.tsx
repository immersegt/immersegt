'use client';

import '../styles/index.css';
import '../styles/navbar.css';

import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBrandDiscord,
  IconUserPlus,
  IconUsersGroup,
  IconUsers,
  IconChevronDown,
} from '@tabler/icons-react';

import Link from 'next/link';

import UserButton from '../components/UserButton';

import Logo from '../public/ImmerseGTLogo.svg';

const mockdata = [
  {
    icon: IconUsers,
    title: 'My Team',
    description: 'Your team\'s hub for inviting and reviewing teammates',
    link: "/team"
  },
  {
    icon: IconUsersGroup,
    title: 'Join a Team',
    description: 'Search existing teams to find your crew or join up with friends',
    link: "/team/formation"
  },
  {
    icon: IconUserPlus,
    title: 'Search for Members',
    description: 'Look at other participant profiles and invite individuals to your team',
    link: "/team/individual"
  },
  {
    icon: IconBrandDiscord,
    title: 'Network on Discord',
    description: 'Talk to fellow participants on the ImmerseGT Discord',
    link: "https://discord.com/"
  },
];

const LinkStyle = {
  padding: "0.625rem 1rem"
}

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { login, setRegistered, setName, setTeamId as setUserTeamId } from 'features/userSlice';

import supabase from '../utils/Supabase';

import { useEffect } from 'react';

import { getUser } from '../utils/Utils';

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const team = useAppSelector((state) => state.team);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function updateUserData(id: string) {
      getUser(id).then((value) => {
        if (value != null) {
          dispatch(setRegistered(value.registered));
          dispatch(setName(value.name));
          dispatch(setUserTeamId(value.team_id));
        }
      });
      getTeam(id).then((value) => {
        if (value != null) {
          dispatch(setTeamId(value.id));
          dispatch(setTeamName(value.name));
          dispatch(setTeamDescription(value.description));
          dispatch(setMembers(value.members));
          dispatch(setDeclared(value.declared));
        } else {
          dispatch(clearTeam());
        }
      });
      getUsers().then((value) => {
        if (value != null){
          dispatch(loadUsers(value));
        }
      });
      getTeams().then((value) => {
        if (value != null){
          dispatch(loadTeams(value));
        }
      });

    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(login(session));
      if (session?.user.id != "") {
        updateUserData(session?.user.id || "");
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(login(session));
      if (session?.user.id != "") {
        updateUserData(session?.user.id || "");
      }
    })


    return () => subscription.unsubscribe()
  }, []);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item, ind) => (
    <Link href={item.link} onClick={closeDrawer} key={ind}><UnstyledButton className="subLink" key={item.title} style={LinkStyle}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.grape[5]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500} c="rgb(200, 200, 200)">
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton></Link>
  ));

  return (
    <Box>
      <header id="header" className="header">
        <Group justify="space-between" h="100%">
          <Link className="title noLine headerSideItem" href="/">
            <img src={Logo.src} width="30px" />
            <span><b>ImmerseGT</b></span>
          </Link>
          <Group h="100%" gap={0} visibleFrom="md">
            <Link href="/" className="link">
              Home
            </Link>
            <Link href="/apply" className="link">
              Apply
            </Link>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <Link href="/team" className="link">
                  <Center inline>
                    <Box component="span" mr={5}>
                      Team
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.grape[5]}
                    />
                  </Center>
                </Link>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }} className="dropdown">
                <Text fw={500}>Team Formation</Text>
                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className="dropdownFooter">
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        New to ImmerseGT?
                      </Text>
                      <Text size="xs" c="dimmed">
                        Make sure to fill out your applicant information so we can help you find a team.
                      </Text>
                    </div>
                    <Button variant="default" component="a" href="/apply">Apply</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <Link href="/schedule" className="link">
              Schedule
            </Link>
          </Group>
          {user.session == null ? (
            <Group visibleFrom="md" justify="flex-end" className="headerSideItem">
              <Link href="/account"><Button variant="default">Log in</Button></Link>
              <Link href="/account"><Button color="grape.5">Sign up</Button></Link>
            </Group>
          ) : (
            <Group visibleFrom="md" justify="flex-end" className="headerSideItem">
              <UserButton />
            </Group>
          )}


          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link href="/" className="link" onClick={closeDrawer}>
            Home
          </Link>
          <Link href="/apply" className="link" onClick={closeDrawer}>
            Apply
          </Link>
          <UnstyledButton className="link" pl={15} pr={5} onClick={toggleLinks}>
            <Center inline>
              <span>
                Team
              </span>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <Link href="/schedule" className="link" onClick={closeDrawer}>
            Schedule
          </Link>

          <Divider my="sm" />

          {user.session == null ? (
            <Group visibleFrom="md">
              <Link href="/account"><Button variant="default">Log in</Button></Link>
              <Link href="/account"><Button color="grape.5">Sign up</Button></Link>
            </Group>
          ) : (
            <Box ml={15}>
              <UserButton />
            </Box>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
export default Navbar;