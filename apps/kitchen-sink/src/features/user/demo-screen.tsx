import * as Demos from '@tamagui/demos'
import React from 'react'
import { createParam } from 'solito'
import { H1, Spacer, YStack } from 'tamagui'

const { useParam } = createParam<{ id: string }>()

const nameMap = {
  Inputs: 'Forms',
}

const NativeDemos = {
  ...Demos,
  // DrawerDemo,
  // no children
  AnimationsDemo: (props) => (
    <>
      <Demos.AnimationsDemo {...props}>
        <></>
      </Demos.AnimationsDemo>
      <Spacer />
      <Demos.AnimationsEnterDemo>
        <></>
      </Demos.AnimationsEnterDemo>
    </>
  ),
  ThemesDemo: () => {
    return (
      <YStack space>
        <Demos.AddThemeDemo />
        <Demos.UpdateThemeDemo />
      </YStack>
    )
  },
}

export function DemoScreen() {
  const [id] = useParam('id')
  const name = id!
    .split('-')
    .map((segment) => {
      return segment[0].toUpperCase() + segment.slice(1)
    })
    .join('')
  const demoName = `${nameMap[name] || name}Demo`
  const DemoComponent = NativeDemos[demoName] ?? NotFound

  return (
    <YStack bc="$backgroundStrong" f={1} jc="center" ai="center" space>
      <YStack miw={200} maw={340} ai="center" bc="$background" p="$10" br="$6">
        <DemoComponent />
      </YStack>
    </YStack>
  )
}

const NotFound = () => <H1>Not found!</H1>
