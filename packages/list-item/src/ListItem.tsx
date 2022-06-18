import {
  FontSizeTokens,
  GetProps,
  ReactComponentWithRef,
  Spacer,
  ThemeableProps,
  getSize,
  getVariableValue,
  styled,
  themeable,
  withStaticProperties,
} from '@tamagui/core'
import { getFontSize } from '@tamagui/font-size'
import {
  TextParentStyles,
  useGetThemedIcon,
  wrapStringChildrenInText,
} from '@tamagui/helpers-tamagui'
import { ThemeableStack, YStack } from '@tamagui/stacks'
import { SizableText } from '@tamagui/text'
import React, { FunctionComponent, forwardRef } from 'react'
import { View } from 'react-native'

// bugfix esbuild strips react jsx: 'preserve'
React['createElement']

type ListItemIconProps = { color?: string; size?: number }
type IconProp = JSX.Element | FunctionComponent<ListItemIconProps> | null

export type ListItemProps = Omit<TextParentStyles, 'TextComponent'> &
  GetProps<typeof ListItemFrame> &
  ThemeableProps & {
    // add icon before, passes color and size automatically if Component
    icon?: IconProp
    // add icon after, passes color and size automatically if Component
    iconAfter?: IconProp
    // adjust icon relative to size
    // default: -1
    scaleIcon?: number
    // make the spacing elements flex
    spaceFlex?: number | boolean
    // adjust internal space relative to icon size
    scaleSpace?: number
    // title
    title?: React.ReactNode
    // subtitle
    subTitle?: React.ReactNode
  }

export const ListItemFrame = styled(ThemeableStack, {
  name: 'ListItem',
  tag: 'li',
  alignItems: 'center',
  flexWrap: 'nowrap',
  width: '100%',
  borderColor: '$borderColor',
  maxWidth: '100%',
  overflow: 'hidden',
  flexDirection: 'row',

  variants: {
    size: {
      '...size': (val, { tokens }) => {
        return {
          minHeight: tokens.size[val],
          paddingHorizontal: tokens.space[val],
        }
      },
    },

    active: {
      true: {
        hoverStyle: {
          backgroundColor: '$background',
        },
      },
      false: {},
    },

    disabled: {
      true: {
        opacity: 0.5,
        // TODO breaking types
        pointerEvents: 'none' as any,
      },
      false: {},
    },
  },

  defaultVariants: {
    size: '$4',
  },
})

export const ListItemText = styled(SizableText, {
  color: '$color',
  selectable: false,
  flexGrow: 1,
  flexShrink: 1,
  ellipse: true,
})

export const ListItemSubtitle = styled(ListItemText, {
  color: '$colorPress',
  size: '$3',
})

const ListItemComponent = forwardRef((props: ListItemProps, ref) => {
  // careful not to desctructure and re-order props, order is important
  const {
    children,
    icon,
    iconAfter,
    noTextWrap,
    theme: themeName,
    space,
    spaceFlex,
    scaleIcon = 1,
    scaleSpace = 1,
    subTitle,

    // text props
    color,
    fontWeight,
    letterSpacing,
    fontSize,
    fontFamily,
    textAlign,
    textProps,
    title,
    ...rest
  } = props as ListItemProps

  const size = props.size || '$4'
  const subtitleSizeToken = getSize(size, -3)
  const subtitleSize = `$${subtitleSizeToken.key}` as FontSizeTokens
  const iconSize = getFontSize(size) * scaleIcon
  const getThemedIcon = useGetThemedIcon({ size: iconSize, color })
  const [themedIcon, themedIconAfter] = [icon, iconAfter].map(getThemedIcon)
  const spaceSize = getVariableValue(iconSize) * scaleSpace
  const contents = wrapStringChildrenInText(ListItemText, props)

  return (
    <ListItemFrame fontFamily={fontFamily} ref={ref as any} {...rest}>
      {themedIcon || themedIconAfter ? (
        <>
          {themedIcon ? (
            <>
              {themedIcon}
              <Spacer size={spaceSize} />
            </>
          ) : null}
          {/* helper for common title/subtitle pttern */}
          {!!(title || subTitle) && (
            <YStack flex={1}>
              <ListItemText>{title}</ListItemText>
              {subTitle ? (
                typeof subTitle === 'string' ? (
                  // TODO can use theme but we need to standardize to alt themes
                  // or standardize on subtle colors in themes
                  <ListItemSubtitle marginTop="$-2" opacity={0.65} size={subtitleSize}>
                    {subTitle}
                  </ListItemSubtitle>
                ) : (
                  subTitle
                )
              ) : null}
            </YStack>
          )}
          {contents}
          {themedIconAfter ? (
            <>
              <Spacer flex size={spaceSize} />
              {themedIconAfter}
            </>
          ) : null}
        </>
      ) : (
        contents
      )}
    </ListItemFrame>
  )
})

const ListItemInner: ReactComponentWithRef<ListItemProps, HTMLLIElement | View> =
  ListItemFrame.extractable(themeable(ListItemComponent as any) as any, {
    inlineProps: new Set([
      // text props go here (can't really optimize them, but we never fully extract listItem anyway)
      'color',
      'fontWeight',
      'fontSize',
      'fontFamily',
      'letterSpacing',
      'textAlign',
    ]),
  })

export const ListItem = withStaticProperties(ListItemInner, {
  Text: ListItemText,
  Subtitle: ListItemSubtitle,
})
