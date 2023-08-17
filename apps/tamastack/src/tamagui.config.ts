import { config } from '@tamagui/config'
import { createTamagui } from '@tamagui/core'

const tamaConf = createTamagui(config)

export type Conf = typeof tamaConf

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaConf
