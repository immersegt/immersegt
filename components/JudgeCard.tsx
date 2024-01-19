import '../styles/index.css';
import '../styles/judgecard.css';

import { Skeleton } from '@mantine/core';

interface judgeCardProps {
    name: string,
    company: string,
    image: any
}

const JudgeCard = ({ name, company, image }: judgeCardProps) => {
    return name == "" ? (
        <section className="judgeCard">
            <Skeleton height={175} circle />
            <h2 className="nameColor"><b><i>Coming Soon</i></b></h2>
            <Skeleton height={12} mt={6} radius="xl" width="45%" />
        </section>
    ) : (
        <section className="judgeCard">
            {image == null ? (
                <Skeleton height={175} circle />
            ) : (
                <img src={image} className="judgeCardImage" />
            )}

            <h2 className="nameColor"><b>{name}</b></h2>
            <p>{company}</p>
        </section>
    )
}

export default JudgeCard;