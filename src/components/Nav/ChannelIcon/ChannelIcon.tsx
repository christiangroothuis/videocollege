import React from 'react';
import NavIcon from '../NavIcon';

interface Props {
    to: string;
    text: string;
}
export const ChannelIcon = React.memo(({ to, text }: Props) => (
    <NavIcon to={to}>
        <div className="text-sm font-semibold">{text.slice(0, 5)}</div>
    </NavIcon>
));
