import React from 'react';
import NavIcon from './navIcon';

interface Props {
    to: string;
    text: string;
}
const ChannelIcon = React.memo(({ to, text }: Props) => (
    <NavIcon to={to}>
        <div className="text-sm font-semibold">{text.slice(0, 5)}</div>
    </NavIcon>
));

export default ChannelIcon;
