import classes from '../styles/searchbox.module.css';

import { TextInput, TextInputProps, ActionIcon, useMantineTheme, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';

const SearchBox = (props: TextInputProps) => {
    const theme = useMantineTheme();

    return (
        <TextInput
            classNames={classes}
            radius="xl"
            size="md"
            placeholder="Search participants"
            rightSectionWidth={42}
            leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            rightSection={
                <ActionIcon size={32} radius="xl" color={theme.colors.grape[5]} variant="filled">
                    <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                </ActionIcon>
            }
            {...props}
        />
    );
}

export default SearchBox;