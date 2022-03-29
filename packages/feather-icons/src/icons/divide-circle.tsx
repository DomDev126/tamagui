import PropTypes from 'prop-types'
import React, { memo } from 'react'
import {
  Defs,
  Ellipse,
  G,
  Line,
  LinearGradient,
  Path,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Svg,
  Symbol,
  Text,
  Use,
  Circle as _Circle,
} from 'react-native-svg'

import { IconProps } from '../IconProps'
import { themed } from '../themed'

export const DivideCircle = memo<IconProps>(
  themed((props) => {
    const { color = 'black', size = 24, ...otherProps } = props
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={`${color}`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...otherProps}
      >
        <Line
          x1="8"
          y1="12"
          x2="16"
          y2="12"
          fill="none"
          stroke={`${color}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line
          x1="12"
          y1="16"
          x2="12"
          y2="16"
          fill="none"
          stroke={`${color}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line
          x1="12"
          y1="8"
          x2="12"
          y2="8"
          fill="none"
          stroke={`${color}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <_Circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke={`${color}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  })
)
