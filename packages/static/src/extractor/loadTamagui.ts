import { join } from 'path'

import type { StaticComponent, TamaguiInternalConfig } from '@tamagui/core'
import { createTamagui } from '@tamagui/core-node'

let loadedTamagui: any = null

export function loadTamagui(props: { components: string[]; config: string }): {
  components: Record<string, StaticComponent>
  tamaguiConfig: TamaguiInternalConfig
} {
  if (loadedTamagui) {
    return loadedTamagui
  }

  // lets shim require and avoid importing react-native + react-native-web
  // we just need to read the config around them
  process.env.IS_STATIC = 'is_static'
  const proxyWorm = require('@tamagui/fake-react-native')
  const Mod = require('module')
  const og = Mod.prototype.require
  Mod.prototype.require = function (path: string) {
    if (path.startsWith('react-native')) {
      return proxyWorm
    }
    return og.apply(this, arguments)
  }

  // import config
  const tamaguiConfigExport = require(join(process.cwd(), props.config))
  // TODO validate its the right config
  const tamaguiConfig = (tamaguiConfigExport['default'] ||
    tamaguiConfigExport) as TamaguiInternalConfig

  // import components
  const components = {}
  for (const module of props.components) {
    const exported = require(module)
    // TODO check if overwriting and warn
    Object.assign(components, exported)
  }

  // undo shims
  process.env.IS_STATIC = undefined
  Mod.prototype.require = og

  // set up core-node
  createTamagui(tamaguiConfig)

  loadedTamagui = {
    components,
    tamaguiConfig,
  }

  return loadedTamagui
}
