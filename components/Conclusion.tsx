import '../styles/index.css';
import '../styles/conclusion.css';

import { Button } from '@mantine/core';
import { FaLongArrowAltRight } from "react-icons/fa";

const Conclusion = () => {
    return (

        <section className="ConclusionHolder">
            <div className="ConclusionBanner">
                <h2 className="ConclusionTitle"><b>Don't miss out on ImmerseGT.</b></h2>
                <span className="ConclusionSubtitle">April 23rd-25th @ Georgia Tech</span>
                <p className="ConclusionText">Register for the ImmerseGT hackathon and prepare for three days of building XR projects,
                    networking with other participants, talking to industry leaders and experts, learning about cutting-edge XR technologies at
                    workshops, and more. Plus, you'll be competing for your share of over $20,000 in prizes and various awards sponsored
                    by top companies from around the globe. </p>
                <Button variant="filled" color="gray" size="xl" component="a" href="/register">
                    Register Today&nbsp;<FaLongArrowAltRight />
                </Button>
            </div>
        </section>

    )
}

export default Conclusion;