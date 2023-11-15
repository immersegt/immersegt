'use client';
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
  import { MantineLogo } from '@mantine/ds';
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
  import '../styles/navbar.css';
  
  const mockdata = [
    {
      icon: IconCode,
      title: 'My Team',
      description: 'Your team\'s hub for inviting and reviewing teammates',
    },
    {
      icon: IconCoin,
      title: 'Join a Team',
      description: 'Search existing teams to find your crew or join up with friends',
    },
    {
      icon: IconBook,
      title: 'Search for Members',
      description: 'Look at other participant profiles and invite individuals to your team',
    },
    {
      icon: IconFingerprint,
      title: 'Network on Discord',
      description: 'Talk to fellow participants on the ImmerseGT Discord',
    },
  ];
  
  const Navbar = () => {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();
  
    const links = mockdata.map((item) => (
      <UnstyledButton className="subLink" key={item.title}>
        <Group wrap="nowrap" align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    ));
  
    return (
      <Box>
        <header className="header">
          <Group justify="space-between" h="100%">
            <div className="title"><b>ImmerseGT</b> Event Platform</div>
  
            <Group h="100%" gap={0} visibleFrom="sm">
              <a href="#" className="link">
                Home
              </a>
              <a href="#" className="link">
                Register
              </a>
              <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                <HoverCard.Target>
                  <a href="#" className="link">
                    <Center inline>
                      <Box component="span" mr={5}>
                        Team
                      </Box>
                      <IconChevronDown
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.blue[6]}
                      />
                    </Center>
                  </a>
                </HoverCard.Target>
  
                <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                  <Group justify="space-between" px="md">
                    <Text fw={500}>Team Formation</Text>
                  </Group>
  
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
                      <Button variant="default">Register</Button>
                    </Group>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
              <a href="#" className="link">
                Schedule
              </a>
            </Group>
  
            <Group visibleFrom="sm">
              <Button variant="default">Log in</Button>
              <Button color="grape.6">Sign up</Button>
            </Group>
  
            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>
  
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />
  
            <a href="#" className="link">
              Home
            </a>
            <a href="#" className="link">
              Register
            </a>
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
            <a href="#" className="link">
              Schedule
            </a>
  
            <Divider my="sm" />
  
            <Group justify="center" grow pb="xl" px="md">
              <Button variant="default">Log in</Button>
              <Button color="grape.6">Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    );
  }
  export default Navbar;