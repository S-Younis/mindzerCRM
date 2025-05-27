import React from 'react'
import Svg, { Path } from 'react-native-svg'

type MicrosoftProps = {
    marginRight?: number;
    marginLeft?: number;
    marginTop?: number;
    marginBottom?: number;
    width?: number;
    height?: number;
}
export const Microsoft = ({ marginRight, marginLeft, marginTop, marginBottom, width, height }: MicrosoftProps) => {
    return (
        <Svg
            width={width || 22}
            height={height || 22}
            style={{ marginRight, marginLeft, marginTop, marginBottom }}
            fill="none"
            viewBox="0 0 32 32"
        >
            <Path fill="#FEBA08" d="M17 17h10v10H17z" />
            <Path fill="#05A6F0" d="M5 17h10v10H5z" />
            <Path fill="#80BC06" d="M17 5h10v10H17z" />
            <Path fill="#F25325" d="M5 5h10v10H5z" />
        </Svg>
    )
}

