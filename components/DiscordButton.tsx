import { Button, ButtonProps } from '@mantine/core';
import { DiscordIcon } from '@mantine/ds';

export function DiscordButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
  return <Button leftSection={<DiscordIcon width='1rem' height='1rem' />} variant="default" {...props} />;
}
