# Design

## Design Direction

“在数字荒原里，构建你的庇护所”。视觉应像一张安静的数字地形图：浅色荒原、深色边界、矿物蓝标记、少量苔绿生命感。整体克制、耐读、带一点私人据点的温度。

## Color

- Canvas: `oklch(0.985 0.007 230)`
- Surface: `oklch(0.965 0.01 220)`
- Raised surface: `oklch(0.995 0.005 230)`
- Text: `oklch(0.22 0.035 245)`
- Muted text: `oklch(0.48 0.03 235)`
- Border: `oklch(0.84 0.025 225)`
- Accent blue: `oklch(0.45 0.08 235)`
- Shelter green: `oklch(0.54 0.07 155)`
- Warm signal: `oklch(0.68 0.08 75)`

Use restrained color. Accents should mark routes, tags, actions and focus states, not flood the whole interface.

## Typography

Use the existing system stack for body text. Express hierarchy through size, weight and measure:

- Hero: strong, compact Chinese display text with tight but not negative spacing.
- Section headings: 24-32px, weight 700.
- Article titles: 20-24px on desktop, 18-20px mobile.
- Body text: 16-18px, line-height 1.75, measure 65-75ch.

## Layout

Use asymmetric but stable grids. Home hero should have one dominant text block and one visual “shelter panel” motif. Article lists should feel like a magazine index, not repeated floating cards. Sidebars are quiet reference panels.

## Components

- Nav: solid readable bar with subtle border, brand left, routes right.
- Hero: slogan, positioning copy, two actions, map/grid motif.
- Article item: cover thumbnail, title, excerpt, tags, date, subtle hover.
- Tags: compact topic chips in a sticky panel.
- Markdown: calm long-form reading with minimal decoration.

## Motion

Use short ease-out motion only: fade and 8-12px vertical travel. Avoid wobble, bounce, elastic and layout-property animation. Reduced motion should remain comfortable.
