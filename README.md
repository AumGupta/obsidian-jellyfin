<div align="center">

# [Abyss](https://aumgupta.github.io/abyss-jellyfin/) for Jellyfin

![GitHub License](https://img.shields.io/github/license/AumGupta/abyss-jellyfin?style=for-the-badge&color=1a1a1a)
![GitHub Release](https://img.shields.io/github/v/release/AumGupta/abyss-jellyfin?style=for-the-badge&color=1a1a1a)
![GitHub repo size](https://img.shields.io/github/repo-size/AumGupta/abyss-jellyfin?style=for-the-badge)

<img alt="Abyss Logo" src="docs/assets/favicon/apple-touch-icon.png" style="width: 72px;">

A clean and minimal theme for [Jellyfin](https://jellyfin.org): frosted glass surfaces, refined typography, smooth transitions, and a minimal aesthetic drawing from iOS and macOS design language.

</div>

<div align="center">
  <a href="https://aumgupta.github.io/abyss-jellyfin/">
    <img src="https://img.shields.io/badge/Preview%20%26%20Install-→-f5f5f7?style=for-the-badge&labelColor=1a1a1a" alt="Preview & Install" width="220" />
  </a>
</div>

## Quick Install

Paste this single line into **Dashboard > Branding > Custom CSS** and save:

```css
@import url('https://cdn.jsdelivr.net/gh/AumGupta/abyss-jellyfin@main/abyss.css');
```

## Preview

### Home
<table>
  <tr>
    <td colspan="2"><img src="docs/assets/images/1.png" style="width:100%;border-radius:8px"/></td>
  </tr>
  <tr>
    <td width="19.5%"><img src="docs/assets/images/2.png" style="width:100%;border-radius:8px"/></td>
    <td width="71%"><img src="docs/assets/images/3.png" style="width:100%;border-radius:8px"/></td>
  </tr>
</table>

### Cards & UI Details
<table>
  <tr>
    <td rowspan="2" width="40%"><img src="docs/assets/images/5.png" style="width:100%;border-radius:8px"/></td>
    <td><img src="docs/assets/images/6.png" style="width:100%;border-radius:8px"/></td>
  </tr>
  <tr>
    <td><img src="docs/assets/images/4.png" style="width:100%;border-radius:8px"/></td>
  </tr>
</table>

### Libraries
<table>
  <tr>
    <td width="50%"><img src="docs/assets/images/movies-1.png" style="width:100%;border-radius:8px"/></td>
    <td width="50%"><img src="docs/assets/images/shows-1.png" style="width:100%;border-radius:8px"/></td>
  </tr>
  <tr>
    <td width="50%"><img src="docs/assets/images/movies-2.png" style="width:100%;border-radius:8px"/></td>
    <td width="50%"><img src="docs/assets/images/shows-2.png" style="width:100%;border-radius:8px"/></td>
  </tr>
</table>

### Music
<table>
  <tr>
    <td width="50%"><img src="docs/assets/images/music1.png" style="width:100%;border-radius:8px"/></td>
    <td width="50%"><img src="docs/assets/images/music2.png" style="width:100%;border-radius:8px"/></td>
  </tr>
  <tr>
    <td width="50%"><img src="docs/assets/images/music3.png" style="width:100%;border-radius:8px"/></td>
    <td width="50%"><img src="docs/assets/images/music4.png" style="width:100%;border-radius:8px"/></td>
  </tr>
</table>


## Features

- **Frosted glass UI**: header, drawer, dialogs, and footer all use `backdrop-filter` blur
- **Refined typography**: Google Sans throughout, with even weight and spacing
- **Smooth transitions**: most interactions use `cubic-bezier(0.25, 0.46, 0.45, 0.94)` ease curve at 150ms
- **Floating sidebar**: pill-shaped drawer with rounded corners and a subtle border
- **Pill tab bar**: active tab highlighted with a filled pill indicator
- **Clean home page**: My Media section shows covers only, no text labels **\***
- **Responsive**: mobile layout tweaks, ultrawide support, and cast thumbnail scaling across all breakpoints
- **Customisable**: three CSS variables let you retheme without touching the rest of the file

> [!CAUTION]
> **\*** Make sure that you set `My Media` as your "Home screen section 1". If not, go to `Settings > Home > Home screen` and set section 1 to `My Media`. This is required because Abyss hides the card text of the first section.

## Customisation

Override any of these variables at the top of your **Custom CSS** field, after the `@import` line:

```css
@import url('https://cdn.jsdelivr.net/gh/AumGupta/abyss-jellyfin@main/abyss.css');

:root {
    /* Accent colour: R, G, B only, no rgb() wrapper */
    --abyss-accent: 245, 245, 247;   /* default: near-white */

    /* Corner rounding applied globally */
    --abyss-radius: 12px;            /* default: 12px */

    /* Episode count / indicator pill background */
    --abyss-indicator: 55, 55, 55;   /* default: dark grey (Not changed with accent for better UX)*/
}
```

### Example accent colours

| Look | Value |
|---|---|
| Default (near-white) | `245, 245, 247` |
| Warm white | `255, 250, 240` |
| Soft blue | `100, 160, 255` |
| Teal | `50, 200, 180` |
| Rose | `255, 100, 120` |

> [!NOTE]
> You can also change the font by adding a *Google Fonts* (or any other source) `@import` and overriding the `body` font-family after your theme import. For example, to use [Inter](https://fonts.google.com/specimen/Inter):
> ```css
> @import url('https://cdn.jsdelivr.net/gh/AumGupta/abyss-jellyfin@main/abyss.css');
> @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
>
> body {
>     font-family: "Inter", sans-serif;
>     font-optical-sizing: auto;
>     font-style: normal;
>     font-variation-settings: "GRAD" 0;
> }
> ```
> Browse fonts at [fonts.google.com](https://fonts.google.com) and replace `"Inter"` with any family name you pick.

---

## Compatibility

| Jellyfin version | Status |
|---|---|
| 10.10.x | ✅ Tested |
| 10.9.x | ✅ Should work |
| Earlier | ⚠️ Untested |

> Abyss targets the **desktop web client**. Mobile layout tweaks are included but the experience is optimised for desktop.

<details>
<summary>Notes</summary>

- The **Jellyfin admin dashboard** (`/dashboard`) is a separate React app and does not load Custom CSS. Abyss styles the main client only (home, libraries, detail pages, player).
- The `section0` selector hides card text specifically in the **My Media** row. If you reorder your home sections, update this selector to match the new position.
- Backdrop blur requires `backdrop-filter` support: Chrome, Edge, Safari, and Firefox 103+.

</details>

## Contributing & Support

Pull requests are welcome. For suggestions, feature requests, or bug reports, open an issue on the [Issues](https://github.com/AumGupta/abyss-jellyfin/issues) page. Please include your Jellyfin version and a screenshot where relevant.

## License

Abyss Jellyfin is licensed under the [MIT License](https://github.com/AumGupta/abyss-jellyfin?tab=MIT-1-ov-file).

## Credits

- Built with inspiration from [Ultrachromic](https://github.com/CTalvio/Ultrachromic) by CTalvio.
- [Google Sans](https://fonts.google.com/specimen/Google+Sans) by Google, served via Google Fonts.
- [Material Icons Round](https://fonts.google.com/icons) by Google, served via jsDelivr.