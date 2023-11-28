import '../styles/index.css';
import '../styles/toolbutton.css';

import { UnstyledButton } from '@mantine/core';
import Link from 'next/link';

interface ToolButtonProps {
    title: string,
    description: string,
    image: any,
    href: string
}

const ToolButton = ({ title, description, image, href }: ToolButtonProps) => {
    return href === undefined ? (
        <UnstyledButton className="toolButton">
            <img src={image} className="toolButtonImage" />
            <div className="toolButtonInfo">
                <h3>{title}</h3>
                <p className="small">{description}</p>
            </div>
        </UnstyledButton>
    ) : (
        <Link href={href} className="noLine"><UnstyledButton className="toolButton">
            <img src={image} className="toolButtonImage" />
            <div className="toolButtonInfo">
                <h3>{title}</h3>
                <p className="small">{description}</p>
            </div>
        </UnstyledButton></Link>
    )
}

export default ToolButton;