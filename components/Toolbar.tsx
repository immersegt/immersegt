import '../styles/index.css';
import '../styles/toolbar.css';

import { Pagination, Select, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import { IconArrowsShuffle } from '@tabler/icons-react';
import classes from 'styles/searchbox.module.css';

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
                <Select radius="md" data={['10', '25', '50']} defaultValue="10" withCheckIcon={false} allowDeselect={false} classNames={classes} className="toolCount" />
                <p className="toolbarText">Teams/Page</p>
            </div>
        </div>
    )
}

export default Toolbar;