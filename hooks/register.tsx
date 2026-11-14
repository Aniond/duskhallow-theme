import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'
import { PALETTE } from './palette.ts'
import { SCENE } from './scene.ts'

const { theme, problems } = makeColors(PALETTE)

const LOOK: ThemeSetArgs = {
  colors: theme,
  // No tint: the frosted panels take the theme's own colour, so text stays readable in either mode.
  backdrop: { scene: 'duskhallow-night', glass: { blur: 4, opacity: 0.45 } },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if ((e.surface !== 'desktop' && e.surface !== 'mobile') || e.props.scene !== 'duskhallow-night') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return (
      <Svg
        source={SCENE}
        alt="A moonlit Duskhallow night: a gothic chapel and graveyard, a witch's cottage, fog, bats and fireflies"
        isInteractive
      />
    )
  })
}
