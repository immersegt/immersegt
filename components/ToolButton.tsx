import '../styles/index.css';
import '../styles/toolbutton.css';

import { UnstyledButton } from '@mantine/core';

interface ToolButtonProps {
    title: string,
    description: string,
    image: any
}

const ToolButton = ({ title, description, image }: ToolButtonProps) => {
    return (
        <UnstyledButton className="toolButton">
            <img src={image} className="toolButtonImage" />
            <div className="toolButtonInfo">
                <h3>{title}</h3>
                <p className="small">{description}</p>
            </div>
        </UnstyledButton>
    )
}

export default ToolButton;