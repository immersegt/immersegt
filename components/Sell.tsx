import '../styles/index.css';
import '../styles/sell.css';

import {
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
    useMantineTheme,
    Divider
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie } from '@tabler/icons-react';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const mockdata = [
    {
        title: 'Networking',
        description:
            "At ImmerseGT, you will be interacting with other college students like yourself — innovators, builders, engineers, coders, entrepreneurs, and more.",
        icon: IconGauge,
        delay: 0
    },
    {
        title: 'Workshops',
        description:
            "No experience required — even as a beginner, you can get started in the world of XR by attending our many training workshops throughout the weekend.",
        icon: IconUser,
        delay: 100
    },
    {
        title: 'Resources',
        description:
            'All you need is a laptop and an idea. Solo entrants can find teammates at ImmerseGT and we will provide the headsets, tools, and space you need to hack effectively.',
        icon: IconCookie,
        delay: 200
    },
];

const Sell = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    const theme = useMantineTheme();
    const features = mockdata.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className="sellCard" padding="xl" data-aos="fade-up" data-aos-easing="ease-sine" data-aos-anchor-placement="center-bottom" data-aos-once="true" data-aos-delay={feature.delay}>
            <feature.icon
                style={{ width: rem(50), height: rem(50) }}
                stroke={2}
                color={theme.colors.grape[5]}
            />
            <Text fz="lg" fw={500} className="sellCardTitle" mt="md">
                {feature.title}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>
    ));

    return (
        <section className="sellContainer">
            <h2>
                ImmerseGT is More Than Just Coding
            </h2>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
                {features}
            </SimpleGrid>
        </section>
    );
}

export default Sell;