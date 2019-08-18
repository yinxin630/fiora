import React from 'react';

interface RewardProps {
    visible: boolean;
    onClose: () => void;
}

function Reward(props: RewardProps) {
    console.log(props);
    return (
        <div>Reward</div>
    );
}

export default Reward;
