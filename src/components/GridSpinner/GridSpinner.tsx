import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Motion {
    sizeUnit: string;
    x: number;
    y: number;
    size: number;
}

const motion = (props: Motion) => keyframes`
    0% {
        top: ${props.y}${props.sizeUnit};
        left: ${props.x}${props.sizeUnit};
    }
    50% {
        width: ${props.size / 4}${props.sizeUnit};
        height: ${props.size / 4}${props.sizeUnit};
        top: ${props.size / 2 - props.size / 8}${props.sizeUnit};
        left: ${props.size / 2 - props.size / 8}${props.sizeUnit};
    }
    100% {
        top: ${props.y}${props.sizeUnit};
        left: ${props.x}${props.sizeUnit};
    }
`;

interface Wrapper {
    sizeUnit: string;
    size: number;
}

const Wrapper = styled.div<Wrapper>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => `${props.size}${props.sizeUnit}`};
    height: ${(props) => `${props.size}${props.sizeUnit}`};
`;

interface Ball {
    sizeUnit: string;
    x: number;
    y: number;
    size: number;
    color: string;
}

const Ball = styled.div<Ball>`
    position: absolute;
    top: ${(props) => `${props.y}${props.sizeUnit}`};
    left: ${(props) => `${props.x}${props.sizeUnit}`};
    width: ${(props) => `${props.size / 6}${props.sizeUnit}`};
    height: ${(props) => `${props.size / 6}${props.sizeUnit}`};
    border-radius: 50%;
    background-color: ${(props) => props.color};
    animation: ${motion} 1.5s cubic-bezier(0.23, 1, 0.32, 1) infinite;
`;

interface GetBalls {
    countBallsInLine: number;
    color: string;
    size: number;
    sizeUnit: string;
}

const getBalls = ({ countBallsInLine, color, size, sizeUnit }: GetBalls) => {
    const balls: JSX.Element[] = [];
    let keyValue = 0;
    for (let i = 0; i < countBallsInLine; i += 1) {
        for (let j = 0; j < countBallsInLine; j += 1) {
            balls.push(
                <Ball
                    color={color}
                    size={size}
                    x={i * (size / 3 + size / 12)}
                    y={j * (size / 3 + size / 12)}
                    key={keyValue.toString()}
                    sizeUnit={sizeUnit}
                />
            );
            keyValue += 1;
        }
    }
    return balls;
};

interface GridSpinnerProps {
    size?: number;
    color?: string;
    sizeUnit?: string;
}

export function GridSpinner({ size = 40, color = '#fff', sizeUnit = 'px' }: GridSpinnerProps) {
    const countBallsInLine = 3;
    return (
        <Wrapper size={size} sizeUnit={sizeUnit}>
            {getBalls({
                countBallsInLine,
                color,
                size,
                sizeUnit,
            })}
        </Wrapper>
    );
}
