import React from 'react';

interface AboutProps {
    visible: boolean;
    onClose: () => void;
}

function About(props: AboutProps) {
    console.log(props);
    return (
        <div>About</div>
    );
}

export default About;
