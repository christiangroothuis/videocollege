import React from 'react';
import { useParams } from 'react-router-dom';

import { PlayerWrapper } from '../../components/Player/PlayerWrapper';

export function Player() {
    const { id: presentationId } = useParams();

    return <PlayerWrapper presentationId={presentationId!} />;
}
