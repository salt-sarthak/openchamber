# OpenChamber UI/UX Audit Report

## Anti-Patterns Verdict
**PASS.** Clear intentional aesthetic: warm sand/golden monospace dev tool. OKLCH color system, 50+ themes, monospace-first typography. No AI slop detected.

## Summary: 33 issues (4 Critical, 9 High, 12 Medium, 8 Low) | Score: 7.2/10

## Fixes Applied

| # | Issue | Fix |
|---|-------|-----|
| C1 | Focus-visible nuke | Replaced `*:focus-visible { outline: none !important }` with narrow `:focus:not(:focus-visible)` suppression + default focus-visible ring for buttons/links/tabindex elements in `design-system.css` |
| C2 | Dialog has no animation | Added shadcn Drawer component (`packages/ui/src/components/ui/drawer.tsx`) using vaul. Feature code should migrate dialogs with animation needs to Drawer. Dialog remains unchanged. |
| C3 | FadeInOnReveal disabled | Flipped `FADE_ANIMATION_ENABLED = true` in `FadeInOnReveal.tsx` |
| C4 | hsl() on OKLCH + hardcoded borders | Removed hardcoded `rgba(194,151,77,0.2)` / `rgba(57,56,54,0.5)` border overrides and `hsl(var(--background))` wrappers in `design-system.css` |
| H3 | Checkbox snap between states | Added `transition-all duration-150 ease-out` with scale+opacity on check/uncheck |
| H5 | Collapsible animation keyframes undefined | Added `@keyframes collapsible-down` and `collapsible-up` using `var(--radix-collapsible-content-height)` + `@theme inline` registration in `index.css` |
| H6 | Dropdown items snap on hover | Added `transition-colors duration-100` to DropdownMenuItem |
| M4 | Button missing press effect | Added `active:scale-[0.97]` + `transform` to transitions in `button.tsx` |
| M8 | Toggle missing color transition | Added `background-color` to transition list + `duration-150` |

**New dependency**: `vaul@1.1.2` (shadcn Drawer backing library).



## Critical Issues

| # | Issue | Location | WCAG |
|---|-------|----------|------|
| C1 | Global CSS nukes `focus-visible` with `!important` on all non-input elements | `design-system.css:184-193` | 2.4.7 (AA) |
| C2 | Dialog has ZERO open/close animation | `ui/dialog.tsx:48-95` | -- |
| C3 | `FadeInOnReveal` globally disabled (`FADE_ANIMATION_ENABLED = false`) | `chat/message/FadeInOnReveal.tsx:13` | -- |
| C4 | `hsl()` used on OKLCH vars + hardcoded rgba border overrides break themes | `design-system.css:102-111` | -- |

## High Issues

| # | Issue | Location |
|---|-------|----------|
| H1 | Touch targets <44px (StatusChip 28px, ScrollToBottom 32px, mobile min 36px) | Multiple |
| H2 | Hardcoded Tailwind colors (green-500, amber-500, etc.) in 15+ components | CommandAutocomplete, VoiceStatus, etc. |
| H3 | Checkbox/Radio instant icon swap, no transition | `ui/checkbox.tsx`, `ui/radio.tsx` |
| H4 | No page/view transitions -- hard cuts between views | `components/views/*` |
| H5 | Collapsible references undefined animation keyframes | `ui/collapsible.tsx:26` |
| H6 | Dropdown/Select items have no hover transition duration | `ui/dropdown-menu.tsx`, `ui/select.tsx` |
| H7 | Resize handles are pointer-only, no keyboard support | `Sidebar.tsx`, `SettingsView.tsx` |
| H8 | Mobile CSS uses `*` + `!important` overrides, breaks overflow-hidden | `mobile.css:54-78` |
| H9 | Inconsistent focus ring patterns (ring-1 vs ring-2 vs ring-inset) | `input.tsx` vs `textarea.tsx` vs `dialog.tsx` |

## Medium Issues

| # | Issue |
|---|-------|
| M1-M4 | No smooth scrolling, no list stagger, skeleton pulse-only, no button press effect |
| M5 | ChatEmptyState uses inline style instead of Tailwind class |
| M6 | Hard-coded panel width constants (250/500, 176/280, 400/860px) |
| M7 | MarkdownRenderer missing error boundary |
| M8-M11 | Toggle/Switch missing transitions, PermissionCard uses JS hover, motion library underused |
| M12 | motion library installed but only used in ~5 files |

## Positive Findings
- OKLCH color system, 50+ theme variants, VSCode theme import
- Semantic typography scale with `--padding-scale` density control
- Thorough iOS PWA safe area handling
- Theme-aware agent color system
- Fireworks animation with `prefers-reduced-motion` respect
- CVA + Radix + Tailwind architecture is solid

## Fix Priority
1. `/harden` -- C1, H7, H8, M7, M9 (a11y blockers)
2. `/animate` -- C2, C3, H3-H6, M1-M4, M8, M11-M12 (biggest quality uplift)
3. `/normalize` -- C4, H2, H9, M5, M10 (theming consistency)
4. `/adapt` -- H1, M6 (responsive)
5. `/polish` -- Low issues (details)
