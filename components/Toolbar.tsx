import '../styles/index.css';
import '../styles/toolbar.css';

import { Pagination, NativeSelect, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import { IconArrowsShuffle } from '@tabler/icons-react';

const Toolbar = () => {
    const [activeRequestPage, setRequestPage] = useState(1);
    return (
        <div className="toolbar">
            <UnstyledButton className="toolbarBox randomize">
                <div className="toolbarIconBox">
                    <IconArrowsShuffle className="toolbarText"/>
                </div>
                <p className="toolbarText">Randomize</p>
            </UnstyledButton>
            <div className="toolbarBox pagination">
                <Pagination value={activeRequestPage} onChange={setRequestPage} total={5} color="grape.5" />

            </div>
            <div className="toolbarBox teamCount">
                <NativeSelect radius="md" data={['10', '25', '50']} />
                <p className="toolbarText">Teams/Page</p>
            </div>
        </div>
    )
}

export default Toolbar;