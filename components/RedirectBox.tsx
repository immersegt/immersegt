import '../styles/index.css';
import '../styles/redirectbox.css';

import { UnstyledButton } from '@mantine/core';

interface RedirectBoxProps {
    title: string,
    description: string,
    buttonText: string,
    href: string,
    selected: boolean,
    position: number
}

const types = [" left", " center", " right"]

const RedirectBox = ({title, description, buttonText, href, selected, position}:RedirectBoxProps) => {
    return (
        <div className={"redirectBox" + types[position] + (selected ? " selected" : "")} >
            <p className="redirectSubtitle">STEP {position+1}</p>
            <h3 className="redirectTitle">{title}</h3>
            <p className="redirectDescription">{description}</p>
            <UnstyledButton className="redirectButton" component="a" href={href}>{buttonText}</UnstyledButton>
        </div>
    )
}

export default RedirectBox;