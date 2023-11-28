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
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';

import Link from 'next/link';

const mockdata = [
  {
    icon: IconCode,
    title: 'My Team',
    description: 'Your team\'s hub for inviting and reviewing teammates',
    link: "/team"
  },
  {
    icon: IconCoin,
    title: 'Join a Team',
    description: 'Search existing teams to find your crew or join up with friends',
    link: "/team/formation"
  },
  {
    icon: IconBook,
    title: 'Search for Members',
    description: 'Look at other participant profiles and invite individuals to your team',
    link: "/team/individual"
  },
  {
    icon: IconFingerprint,
    title: 'Network on Discord',
    description: 'Talk to fellow participants on the ImmerseGT Discord',
    link: "https://discord.com/"
  },
];

const LinkStyle = {
  padding: "0.625rem 1rem"
}

const Navbar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <Link href={item.link}><UnstyledButton className="subLink" key={item.title} style={LinkStyle}>
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
          <Link className="title noLine" href="/"><b>ImmerseGT</b> Event Platform</Link>

          <Group h="100%" gap={0} visibleFrom="md">
            <Link href="/" className="link">
              Home
            </Link>
            <Link href="/register" className="link">
              Register
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
                    <Button variant="default" component="a" href="/register">Register</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <Link href="/schedule" className="link">
              Schedule
            </Link>
          </Group>

          <Group visibleFrom="md">
            <Link href="/account"><Button variant="default">Log in</Button></Link>
            <Link href="/account"><Button color="grape.6">Sign up</Button></Link>
          </Group>

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

          <Link href="/" className="link">
            Home
          </Link>
          <Link href="/register" className="link">
            Register
          </Link>
          <UnstyledButton className="link" onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Team
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <Link href="/schedule" className="link">
            Schedule
          </Link>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Link href="/account"><Button variant="default">Log in</Button></Link>
            <Link href="/account"><Button color="grape.6">Sign up</Button></Link>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
export default Navbar;