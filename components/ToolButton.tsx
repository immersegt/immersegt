import '../styles/index.css';
import '../styles/toolbutton.css';

import { UnstyledButton } from '@mantine/core';
import Link from 'next/link';

interface ToolButtonProps {
    title: string,
    description: string,
    image: any,
    href: string,
    disabled: boolean
}

const ToolButton = ({ title, description, image, href, disabled }: ToolButtonProps) => {
    return (href === undefined || href === "") ? (
        <UnstyledButton className={"toolButton" + (!disabled ? " working" : " disabled")} disabled={disabled}>
            <img src={image} className="toolButtonImage" />
            <div className="toolButtonInfo">
                <h3>{title}</h3>
                <p className="small">{description}</p>
            </div>
        </UnstyledButton>
    ) : (
        <Link href={href} className="noLine"><UnstyledButton className={"toolButton" + (!disabled ? " working" : " disabled")} disabled={disabled}>
            <img src={image} className="toolButtonImage" />
            <div className="toolButtonInfo">
                <h3>{title}</h3>
                <p className="small">{description}</p>
            </div>
        </UnstyledButton></Link>
    )
}

export default ToolButton;