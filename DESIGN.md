# Design

## Design Direction

“在数字荒原里，构建你的庇护所”。视觉应像一份克制的独立杂志：纸质底色、清晰墨色层级、细边线与栏宽建立秩序。整体耐读、紧凑，带一点私人编辑部的温度。

## Color

- Canvas: `oklch(0.985 0.004 240)`
- Surface: `oklch(0.97 0.006 235)`
- Raised surface: `oklch(0.995 0.003 240)`
- Text: `oklch(0.2 0.025 250)`
- Muted text: `oklch(0.46 0.02 240)`
- Border: `oklch(0.88 0.012 235)`
- Accent blue: `oklch(0.42 0.07 245)`
- Shelter green: `oklch(0.5 0.055 155)`
- Warm signal: `oklch(0.62 0.06 75)`

Use restrained color. Accents mark routes, tags, actions and focus states — never flood the interface. Prefer borders and type weight over fills and gradients.

## Typography

Use the existing system stack for body text. Hierarchy comes from size, weight and measure:

- Masthead: compact Chinese display, ~1.85–2.85rem, weight 800, tight tracking.
- Section headings: 20–24px, weight 800.
- Article titles: 16–19px on index, stronger on article pages.
- Body text: 16–18px, line-height 1.65–1.75, measure 52–65ch.

## Layout

- Page max width ~1120px for editorial measure.
- Home masthead: short intro block + featured lead (latest article), not a full-viewport landing hero.
- No empty decorative panels.
- Article lists read as a magazine index: index/date rail, title, excerpt, small thumb.
- Sidebars are quiet reference columns, visible on mobile below the list.

## Components

- Nav: flat bar, brand left, text routes with underline active state.
- Masthead: slogan + short positioning + featured lead.
- Article item: rail (number + date), title/excerpt/tags, optional square thumb.
- Tags: compact rectangular chips in an index column + archive link.
- Markdown: calm long-form reading with minimal decoration.
- Footer: colophon row, not a heavy site footer.

## Motion

Use short ease-out motion only: fade and 8–12px vertical travel. Avoid scale zooms, bounce, elastic and layout-property animation. Reduced motion should remain comfortable.
