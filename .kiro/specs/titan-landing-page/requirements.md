# Requirements Document

## Introduction

This feature replaces the existing gym landing page in its entirety and rebuilds it from scratch to faithfully reproduce the provided "TITAN" gym landing page reference design. The page is composed top-to-bottom of a dark rounded hero block (header/nav, hero headline, stats/cards row), a "Welcome" section, and a dark "Features bento" grid section.

The page MUST be built as a composition of reusable React components, using only the project's design-system tokens (primary/accent/neutral color families, the four typography roles, 4px-multiple spacing, `max-w-8xl` centered layout) and the Satoshi font. The implementation targets the project's modified Next.js (App Router), React 19, Tailwind CSS v4, TypeScript, and lucide-react for icons.

## Glossary

- **Landing_Page**: The complete, single-page composition rendered at the application root route, replacing the previous gym landing page.
- **Design_System**: The constrained set of tokens defined in `src/app/globals.css` and documented in `.kiro/steering/design-system.md`, comprising the `primary`, `accent`, and `neutral` color families, four typography roles (`text-heading`, `text-subheading`, `text-body`, `text-normal`), 4px-multiple spacing, and the `max-w-8xl` layout cap.
- **Component**: A reusable React component exported from `src/components/` that renders a discrete piece of the Landing_Page.
- **Header**: The navigation bar Component containing the ".TITAN" logo, navigation links, "Log in" link, and "Try for free" pill button.
- **Hero**: The Component rendering the headline text, supporting buttons, and background image inside the dark rounded hero block.
- **Stats_Row**: The Component rendering the three-card row (satisfied-clients card, sleep-tip card, free-trial card).
- **Welcome_Section**: The Component rendering the "Sport center" tag, welcome heading, "More" button, and the two zone image cards with carousel controls.
- **Features_Bento**: The Component rendering the dark bento grid of feature tiles over a gym background image with the lime ".T" overlay mark.
- **Hero_Block**: The dark rounded container that visually groups the Header, Hero, and Stats_Row.
- **Zone_Card**: A reusable Component rendering a tagged, captioned image card with a circular arrow control, used for the Power zone and Cardio zone.
- **Feature_Tile**: A reusable Component rendering a single tile within the Features_Bento grid (text tile or statistic tile).
- **Satoshi_Font**: The local font registered in `layout.tsx` via `next/font/local` and exposed through the `--font-satoshi` CSS variable.

## Requirements

### Requirement 1: Replace the existing landing page

**User Story:** As a site owner, I want the previous gym landing page replaced entirely, so that visitors only see the new TITAN design.

#### Acceptance Criteria

1. WHEN a visitor requests the application root route, THE Landing_Page SHALL render as the sole page composition returned, with no markup from the previous gym landing page present in the rendered output.
2. THE Landing_Page SHALL compose the Header, Hero, Stats_Row, Welcome_Section, and Features_Bento Components, each rendered exactly once, in the top-to-bottom document order: Header, then Hero, then Stats_Row, then Welcome_Section, then Features_Bento.
3. WHERE a previous landing page Component is no longer referenced by the Landing_Page, THE Landing_Page SHALL exclude that Component from the rendered output.
4. IF any of the five composed Components (Header, Hero, Stats_Row, Welcome_Section, Features_Bento) fails to render, THEN THE Landing_Page SHALL omit only the failed Component while rendering all remaining successfully composed Components in their defined order.

### Requirement 2: Reusable component composition

**User Story:** As a developer, I want every section of the page implemented as reusable components, so that the page is maintainable and consistent.

#### Acceptance Criteria

1. THE Landing_Page SHALL render each distinct visual section (header, hero, welcome, zone-card section, features bento, and free-trial section) through a separate Component exported from `src/components/`, such that no visual section is rendered by inline markup placed directly in the page rather than a Component.
2. THE Zone_Card SHALL accept an image source, a tag label of 1 to 40 characters, and caption text of 1 to 200 characters as props, and a single Zone_Card Component definition SHALL render both the Power zone card and the Cardio zone card by supplying different prop values.
3. THE Feature_Tile SHALL accept its displayed text content (1 to 200 characters) and image or icon source as props, and a single Feature_Tile Component definition SHALL render each of the 2 to 8 tiles within the Features_Bento by supplying different prop values.
4. WHERE a button appears in more than one section, THE Landing_Page SHALL render every such button through one shared reusable button Component rather than through more than one button implementation.
5. IF a required prop (image source, tag label, or caption for Zone_Card; text content or image/icon source for Feature_Tile) is missing or empty, THEN THE affected Component SHALL render the remaining provided content without failing to render, and SHALL display a visible placeholder in place of the missing prop.

### Requirement 3: Design-system compliance

**User Story:** As a design-system owner, I want the page to use only approved tokens, so that the visual language stays consistent.

#### Acceptance Criteria

1. THE Landing_Page SHALL apply color only through utilities belonging to the `primary`, `accent`, or `neutral` color families defined in the Design_System, and SHALL NOT use any color utility resolving to a hue outside those three families (no blues, reds, or non-lime greens) and SHALL NOT use raw hex or arbitrary color values (e.g., `#000`, `#fff`, `bg-[#1a1a1a]`).
2. THE Landing_Page SHALL set text size only through the `text-heading`, `text-subheading`, `text-body`, or `text-normal` typography roles, and SHALL NOT apply any raw font-size utility (e.g., `text-lg`, `text-3xl`, `text-[20px]`).
3. THE Landing_Page SHALL express every spacing value as an integer Tailwind spacing step that is a multiple of 4px (e.g., `p-1`=4px, `gap-6`=24px), and SHALL NOT use fractional steps (e.g., `p-0.5`, `gap-1.5`) or arbitrary values that are not multiples of 4px.
4. THE Landing_Page SHALL cap each section's content width at `max-w-8xl` (96rem).
5. THE Landing_Page SHALL horizontally center each capped section container using `mx-auto`.
6. WHERE text is placed on a `primary` (lime) surface, THE Landing_Page SHALL apply a `*-foreground` dark-neutral text token and SHALL NOT apply a white or `neutral-50` text token.
7. THE Landing_Page SHALL render all text using the Satoshi_Font applied through the `--font-satoshi` variable.

### Requirement 4: Header and navigation

**User Story:** As a visitor, I want a navigation bar at the top of the page, so that I can identify the brand and reach key destinations.

#### Acceptance Criteria

1. THE Header SHALL display the ".TITAN" logo with a lime dot accent.
2. THE Header SHALL display exactly five navigation links labeled "Services", "Schedule", "Gallery", "Plans", and "Contacts", in that left-to-right order.
3. THE Header SHALL display a "Log in" link.
4. THE Header SHALL display a "Try for free" button styled as a white pill.
5. THE Header SHALL render inside the dark rounded Hero_Block.
6. WHEN a visitor activates one of the navigation links, THE Header SHALL move the viewport to the page section corresponding to that link's label, completing the transition within 1 second.
7. WHEN a visitor activates the "Try for free" button or the "Log in" link, THE Header SHALL navigate to that control's designated destination and present the destination view within 1 second.
8. WHILE the viewport width is below 768 pixels, THE Header SHALL collapse the five navigation links into a single toggleable menu control that reveals all five links when activated.

### Requirement 5: Hero headline and actions

**User Story:** As a visitor, I want a prominent hero headline with clear actions, so that I understand the offering and can act on it.

#### Acceptance Criteria

1. WHEN the landing page loads, THE Hero SHALL display the headline text "Be helthier. Be stronger. Be confident." in white (`neutral-50`) using the `text-heading` role.
2. WHEN the landing page loads, THE Hero SHALL render the headline over the `public/images/hero-runner.jpg` background image within the dark Hero_Block, with the image scaled to cover the Hero_Block area without stretching or distorting its aspect ratio.
3. IF the `public/images/hero-runner.jpg` background image fails to load, THEN THE Hero SHALL retain the dark Hero_Block background so that the headline and buttons remain fully visible and legible.
4. THE Hero SHALL display a lime (`primary`) pill-shaped "Try for free" button containing an arrow icon, rendered as a keyboard-focusable interactive control with a visible focus ring and an accessible label of "Try for free".
5. THE Hero SHALL display a dark (`neutral`) "More about Titan" button, rendered as a keyboard-focusable interactive control with a visible focus ring and an accessible label of "More about Titan".

### Requirement 6: Stats and cards row

**User Story:** As a visitor, I want a row of summary cards, so that I can quickly absorb social proof and offers.

#### Acceptance Criteria

1. WHILE the viewport width is 1024px or greater, THE Stats_Row SHALL display exactly three cards arranged horizontally in a single row with equal vertical alignment.
2. THE Stats_Row SHALL render a white card containing the exact text "10,000+ satisfied clients", an avatar group displaying between 1 and 5 avatars, and supporting text.
3. THE Stats_Row SHALL render a dark card containing a left/right arrow control, the exact text "Your muscles grow while you sleep. Make 7-9 hours your secret weapon for maximum progress.", and a footer showing the exact text "Moscow, Russia" and "Nov.20".
4. THE Stats_Row SHALL render a lime card containing the exact text "Get 14 days for free", the exact text "Just give us a call or message us in the chat", and a circular arrow button.
5. WHERE text is placed on the lime card, THE Stats_Row SHALL apply a dark-neutral `*-foreground` text token and SHALL NOT apply white text on the lime surface.
6. WHILE the viewport width is below 1024px, THE Stats_Row SHALL stack the three cards vertically in the order white, dark, lime with no horizontal overflow.

### Requirement 7: Welcome section

**User Story:** As a visitor, I want a welcome section describing the center, so that I understand what the facility offers.

#### Acceptance Criteria

1. THE Welcome_Section SHALL display a "Sport center" pill tag.
2. THE Welcome_Section SHALL display the heading "Welcome to the Titan Fitness Center, where people work on strengthening both body and mind." using the `text-heading` typography role in the `text-foreground` (dark neutral) token.
3. THE Welcome_Section SHALL display a "More" pill button with a `neutral-950` surface and `neutral-50` label text.
4. THE Welcome_Section SHALL render a Power zone Zone_Card whose image source is `public/images/power-zone.jpg`, including its "Power zone" tag and the Zone_Card caption.
5. THE Welcome_Section SHALL render a Cardio zone Zone_Card whose image source is `public/images/cardio-zone.jpg`, including its "Cardio zone" tag and the Zone_Card caption.
6. THE Welcome_Section SHALL display the caption "Space for working with free weights" on each rendered Zone_Card.
7. THE Welcome_Section SHALL render exactly one circular arrow control on each Zone_Card, positioned within the bounds of that Zone_Card.
8. THE Welcome_Section SHALL display one left and one right circular carousel control button anchored at the bottom-right corner of the section.
9. WHEN a visitor activates the right carousel control button, THE Welcome_Section SHALL advance the Zone_Card sequence to display the next Zone_Card, completing the transition within 500 milliseconds.
10. WHEN a visitor activates the left carousel control button, THE Welcome_Section SHALL move the Zone_Card sequence to display the previous Zone_Card, completing the transition within 500 milliseconds.
11. IF a carousel control button is activated while no further Zone_Card exists in the requested direction, THEN THE Welcome_Section SHALL keep the currently displayed Zone_Card unchanged and present the actioned control button in a visibly disabled state.

### Requirement 8: Features bento section

**User Story:** As a visitor, I want a feature grid highlighting amenities, so that I can see what the gym provides at a glance.

#### Acceptance Criteria

1. THE Features_Bento SHALL render a grid composed of all nine Feature_Tile Components defined in criteria 2 and 3 over a single gym background image.
2. THE Features_Bento SHALL render, on the left group, Feature_Tile content for "Professional coaches each with at least 5 years of experience", "The medical professional's office", a statistic Feature_Tile displaying the value "4 sports zones", and "A bar serving wholesome drinks".
3. THE Features_Bento SHALL render, on the right group, Feature_Tile content for "Wi-Fi Free", "Tanning bed", "Fitness trackers and smart analysis", "Various kinds of massage", and a statistic Feature_Tile displaying the value "500 M²".
4. THE Features_Bento SHALL overlay a lime ".T" mark horizontally and vertically centered over the gym background image, layered above the background and behind the Feature_Tile Components.
5. IF the gym background image fails to load, THEN THE Features_Bento SHALL render a solid neutral background in its place and SHALL continue to render all nine Feature_Tile Components and the ".T" mark.

### Requirement 9: Responsive layout integrity

**User Story:** As a visitor on any device, I want the layout to hold together, so that the page remains usable across screen sizes.

#### Acceptance Criteria

1. WHILE the viewport width is greater than or equal to 1024px, THE Landing_Page SHALL render all Stats_Row cards in a single horizontal row with no card wrapping to a second line.
2. WHILE the viewport width is less than or equal to 767px, THE Landing_Page SHALL stack all Stats_Row cards in a single vertical column, one card per row.
3. WHILE the viewport width is between 768px and 1023px inclusive, THE Landing_Page SHALL render the Stats_Row cards without overlap and without clipping any card content.
4. WHILE the viewport width is less than or equal to 767px, THE Header SHALL keep the ".TITAN" logo and the "Try for free" button fully visible within the viewport, with neither element clipped nor overlapping the other.
5. WHILE the viewport width is greater than or equal to 320px, THE Landing_Page SHALL fit its content within the viewport width without producing a horizontal scrollbar.

### Requirement 10: Build and platform conventions

**User Story:** As a developer, I want the page to follow the project's platform conventions, so that it builds and runs correctly.

#### Acceptance Criteria

1. THE Landing_Page SHALL render every image through the framework `next/image` component as documented in `node_modules/next/dist/docs/`.
2. THE Landing_Page SHALL set a non-empty `alt` value on every informative image and an empty `alt` (`alt=""`) on every decorative image.
3. THE Landing_Page SHALL set explicit `width` and `height` props, or the `fill` property, on every rendered image so that layout dimensions are reserved before the image loads.
4. THE Landing_Page SHALL render every icon using the `lucide-react` icon library, without raw inline SVG, icon fonts, or image files used as icons.
5. WHEN the project build command is run, THE Landing_Page SHALL compile and the build process SHALL complete successfully with zero TypeScript type errors.
6. IF the build process reports one or more TypeScript type errors, THEN the build SHALL terminate with a non-zero exit status and SHALL report each error with its file name and source location.
