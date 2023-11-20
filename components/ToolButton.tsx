import { UnstyledButton } from '@mantine/core';
import '../styles/toolbutton.css';

interface ToolButtonProps {
    title: string,
    description: string,
    image: any
}

const ToolButton = ({ title, description, image }: ToolButtonProps) => {
    return (
        <UnstyledButton className="toolButton">
            <div className="toolButtonImageHolder">
                <img src={image} className="toolButtonImage" />
            </div>
            <div className="toolButtonInfo">
                <div className="toolButtonTitle">
                    {title}
                </div>
                <div className="toolButtonDescription">
                    {description}
                </div>
            </div>
        </UnstyledButton>
    )
}

export default ToolButton;