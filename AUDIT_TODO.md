# OpenChamber Audit — Remaining Work

Tracks unfixed issues from `AUDIT.md`. Items checked off are already landed.

## Critical

- [x] **C1** Remove global `focus-visible` nuke — `design-system.css`
- [x] **C2a** `ResponsiveDialog` wrapper — `packages/ui/src/components/ui/responsive-dialog.tsx`. Routes to `Drawer` (bottom sheet) on mobile/tablet/touch and keeps `Dialog` on desktop via `useDeviceInfo()`. Exposes `ResponsiveDialog`, `ResponsiveDialogContent`, `ResponsiveDialogHeader`, `ResponsiveDialogFooter`, `ResponsiveDialogTitle`, `ResponsiveDialogDescription`.
- [x] **C2b** First batch migrated to `ResponsiveDialog`: `StashDialog`, `OpenCodeStatusDialog`, `AboutDialog`, `HelpDialog`, `ConflictDialog`
- [ ] **C2c** Remaining dialogs to migrate:
  - Batch 2 (medium, no mobile fork): `TimelineDialog`, `ProjectEditDialog`, `AddCatalogDialog`, `InstallConflictsDialog`, `GitIdentityEditorDialog`, `ToolOutputDialog`, `UpdateDialog`
  - Batch 3 (nested dialog parents): `InstallSkillDialog`, `SessionDialogs`, `BranchPickerDialog`
  - Batch 4 (existing `MobileOverlayPanel` replacements — need `keyboardAvoid` parity check): `DirectoryExplorerDialog`, `GitHubIssuePickerDialog`, `GitHubPrPickerDialog`
  - Batch 5 (largest): `NewWorktreeDialog` — multi-step wizard with nested `GitHubIntegrationDialog`
  - Dead-code check during follow-up: `BranchPickerDialog`, `TimelineDialog`, `InstallFromRepoDialog` had no importers during exploration — delete rather than migrate if confirmed unused
- [x] **C3** Enable `FadeInOnReveal` — `FadeInOnReveal.tsx`
- [x] **C4** Remove hardcoded `rgba()` border overrides + `hsl()` wrappers — `design-system.css`

## High

- [ ] **H1** Increase touch targets to 44×44 px minimum on mobile
  - [ ] `StatusChip.tsx:46-48` — 28 px → 44 px
  - [ ] `ScrollToBottomButton.tsx:24` — `h-8 w-8` → `h-11 w-11` on mobile
  - [ ] `SettingsView.tsx:669` — `h-9 w-9` → `h-11 w-11` on mobile
  - [ ] `PermissionCard.tsx:382` — `min-h-[32px]` → `min-h-[44px]` on mobile
  - [ ] `mobile.css:82-86` — bump global `min-height: 36px` → `44px`
- [ ] **H2** Replace hardcoded Tailwind color classes with theme tokens
  - [ ] `chat/CommandAutocomplete.tsx` — `text-green-500`, `text-orange-500`, `text-purple-500`, `text-cyan-500`, `text-yellow-500`
  - [ ] `session/DirectoryTree.tsx:759,848` — `text-green-600`
  - [ ] `voice/BrowserVoiceButton.tsx:344` — `text-green-400`
  - [ ] `voice/VoiceStatusIndicator.tsx:86,125` — `text-green-500`, `bg-green-500`
  - [ ] `chat/message/MessageBody.tsx:1444` — `text-green-500`
  - [ ] `views/agent-manager/AgentManagerSidebar.tsx:91` — `text-amber-500`
  - [ ] `views/agent-manager/AgentGroupDetail.tsx:45,46,160` — `bg-amber-400`, `bg-amber-500`, `text-amber-500`
  - [ ] `chat/PermissionRequest.tsx:47` — `bg-amber-100/50`, `dark:bg-amber-800/30`, `text-amber-800`, `dark:text-amber-200`
- [x] **H3** Checkbox state transition — `ui/checkbox.tsx`
- [ ] **H3** Radio state transition — `ui/radio.tsx` (same pattern as checkbox fix)
- [ ] **H4** Add page/view transitions between `ChatView`, `PlanView`, `GitView`, `SettingsView`, `FilesView`, `TerminalView`, `DiffView`, `MultiRunWindow`, `AgentManagerView` — wrap in `AnimatePresence` with ~150 ms cross-fade
- [x] **H5** Collapsible keyframes — `index.css`
- [x] **H6** Dropdown item hover transition — `ui/dropdown-menu.tsx`
- [ ] **H6** Add same transition to `ui/select.tsx` and `ui/command.tsx` menu items
- [ ] **H7** Keyboard support for resize handles
  - [ ] `layout/Sidebar.tsx:140-147` — add `onKeyDown` with arrow-key step resize
  - [ ] `views/SettingsView.tsx:758-765` — same
- [ ] **H8** Scope `mobile.css:54-78` overrides without `*` + `!important`. Target specific component classes instead of descendant wildcard; stop forcing `.overflow-hidden { overflow-y: auto }` globally
- [ ] **H9** Standardize focus ring pattern across `input.tsx`, `textarea.tsx`, `dialog.tsx`. Pick one (e.g. `ring-1 ring-primary/50`) and apply consistently

## Medium

- [ ] **M1** Add `scroll-behavior: smooth` globally or via `.smooth-scroll` utility
- [ ] **M2** List stagger animations on session list, file tree, message list entry
- [ ] **M3** Add shimmer skeleton variant to `ui/skeleton.tsx` (gradient sweep, not just `animate-pulse`)
- [x] **M4** Button press effect — `ui/button.tsx`
- [ ] **M5** Replace inline `style={{ color: textColor }}` with `text-muted-foreground` class — `chat/ChatEmptyState.tsx:10-11`
- [ ] **M6** Make panel widths responsive
  - [ ] `layout/Sidebar.tsx:6-8` — `SIDEBAR_CONTENT_WIDTH`, `SIDEBAR_MAX_WIDTH`
  - [ ] `views/SettingsView.tsx:72` — `SETTINGS_NAV_MIN_WIDTH`, `SETTINGS_NAV_MAX_WIDTH`
  - [ ] `layout/MainLayout.tsx:32-33` — `DESKTOP_RIGHT_SIDEBAR_MIN_WIDTH`, `DESKTOP_RIGHT_SIDEBAR_MAX_WIDTH`
- [ ] **M7** Wrap `chat/MarkdownRenderer.tsx` in an error boundary with markdown fallback
- [x] **M8** Toggle color transition — `ui/toggle.tsx`
- [ ] **M9** Add `focus-visible:ring-2 focus-visible:ring-primary` to retry button — `onboarding/OnboardingScreen.tsx:271-279`
- [ ] **M10** Replace `onMouseEnter`/`onMouseLeave` JS hover with CSS `:hover` / `data-[state]` — `chat/PermissionCard.tsx:358-457`
- [ ] **M11** Switch track + thumb coordinated transition — `ui/switch.tsx` (add `background-color` to transition list alongside `transform`)
- [ ] **M12** Broaden `motion` library usage beyond 5 files (currently only `TextLoop`, `text`, `MainLayout`, `useDrawerSwipe`). Candidates: page transitions, message list stagger, modal springs

## Low

- [ ] **L1** Change `<div>` wrapper → `<article>` or `<section>` — `chat/PermissionCard.tsx:317`
- [ ] **L2** Replace `title` attribute with `aria-label` for model info — `chat/StatusChip.tsx:42`
- [ ] **L3** Use `<pre><code>` structure for code blocks — `onboarding/OnboardingScreen.tsx:20-38`
- [ ] **L4** Remove empty comment placeholders `{}` — `chat/PermissionCard.tsx:321,342,356`
- [ ] **L5** Flatten nested ternaries using render helpers — `chat/ChatContainer.tsx:640-773`
- [ ] **L6** Slider thumb transitions for Firefox (currently webkit-only) — `ui/slider.tsx`
- [ ] **L7** Bump `OpenChamberLogo` opacity from `0.20` to a visible value — `chat/ChatEmptyState.tsx:14`
- [ ] **L8** Add `@media (prefers-color-scheme: dark)` CSS fallback instead of JS-only theme switching

## Follow-ups Discovered During Fixes

- [ ] Verify `@theme inline` collapsible animation registration in `index.css` actually emits `animate-collapsible-up/down` utilities in Tailwind v4 — may need explicit utility definition instead
- [ ] Audit other Radix components using `data-[state=*]` animations to confirm none rely on undefined keyframes
- [ ] The new default focus ring in `design-system.css` uses `var(--ring)` + `outline-offset: 2px` — verify contrast on all 50+ themes

## Command Routing

| Command | Addresses |
|---------|-----------|
| `/harden` | H7, H8, M7, M9 |
| `/animate` | C2 (migration), H4, H6 (select/command), M1, M2, M3, M11, M12 |
| `/normalize` | H2, H9, M5, M10 |
| `/adapt` | H1, M6 |
| `/polish` | L1, L2, L3, L4, L5, L6, L7, L8 |
