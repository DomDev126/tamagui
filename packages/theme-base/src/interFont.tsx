import { createFont } from '@tamagui/core'

export const interFont = createFont({
  family:
    'Inter, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  size: {
    1: 10,
    2: 12,
    3: 14,
    4: 15,
    5: 17,
    6: 18,
    7: 22,
    8: 24,
    9: 30,
    10: 46,
    11: 58,
    12: 68,
  },
  lineHeight: {
    1: 15,
    2: 20,
    3: 25,
    4: 27,
    5: 28,
    6: 30,
    7: 34,
    8: 38,
    9: 42,
    10: 50,
    11: 70,
    12: 80,
  },
  weight: {
    4: '300',
    7: '600',
    8: '700',
  },
  letterSpacing: {
    4: 0,
    7: -1,
    9: -2,
    10: -3,
    12: -4,
  },
})
