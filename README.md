# Points Points! website

A complete static website for GitHub Pages. No build step, package installation,
database, account system, analytics, or external fonts are needed.

## Publish on GitHub Pages

1. Unzip `Points-Points-Website.zip` on your computer.
2. Create a dedicated public GitHub repository, such as `points-points-website`.
   This repository holds only the website, not your private app source code.
3. Upload the **contents** of this folder to the repository. `index.html` must be
   at the repository's top level, beside the `assets` folder. Do not upload the
   ZIP itself or put everything inside an extra folder.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**, select
   **main**, select **/(root)**, and save.
6. Wait for GitHub's deployment to finish, then open the URL shown in Pages.

`.nojekyll` is included. It may be hidden by your computer's file browser. Include
it when uploading if possible. The pages are plain HTML and need no Jekyll features.

Official instructions:
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Connect pointspoints.app

This package is configured for https://pointspoints.app/:
- `CNAME` contains `pointspoints.app`.
- Canonical URLs, social-preview URLs, sitemap.xml and robots.txt use that domain.
- The general contact address remains hello@pointspoints.app.

1. In your GitHub account Settings → Pages, add and verify `pointspoints.app` using the TXT record GitHub provides. Keep that TXT record after verification.
2. Upload this folder’s contents to a dedicated website repository. Keep index.html, CNAME, .nojekyll and assets at its top level.
3. In the repository’s Settings → Pages, select Deploy from a branch, main, /(root), then Save.
4. Set Custom domain to `pointspoints.app` and save before pointing DNS to GitHub.
5. At the company managing the domain’s DNS, add these records. Replace YOUR-USERNAME with the GitHub user or organization hosting the repository; omit the repository name.

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR-USERNAME.github.io |

Optional IPv6: add four AAAA records at @, with values `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, and `2606:50c0:8003::153`.

Replace conflicting default website/parking records for @ or www. Preserve email MX and email-verification TXT records. DNS setup for the website does not create the hello@pointspoints.app mailbox.

6. Wait for GitHub’s DNS check and certificate, then enable Enforce HTTPS. DNS propagation and HTTPS availability can each take up to 24 hours. With both domain variants configured, www.pointspoints.app redirects to pointspoints.app.

Official instructions:
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages

## Add the App Store link

The download page currently says **Coming to iPhone**, because a verified App
Store listing URL was not supplied. The site doesn't link to an invented listing.

Open `assets/site-config.js` and paste your public App Store URL into
`appStoreUrl`, between the quotation marks. Leave the surrounding punctuation.
Commit the change to GitHub. All buttons marked as app download links will use it,
and the download page will show its App Store button.

## Refresh domain metadata or add the App Store URL

The domain metadata is already configured. To regenerate it later, run:

```sh
python3 configure-site.py --site-url https://pointspoints.app
```

You can also supply `--app-store-url` with your verified public App Store listing. The helper uses only built-in Python libraries and makes no network requests. The website itself needs no Python or build step.

## Pages included

- `index.html` — Home, arrival-alert feature, app screenshots, privacy and referral explanation.
- `how-it-works.html` — Capabilities overview with app screens and optional arrival suggestions.
- `features.html` — Comparisons, points, benefits, and recommendation explanations.
- `support.html` — Frequently asked questions and self-service help.
- `about.html` — Purpose, free access, and privacy-first approach.
- `get-the-app.html` — Download availability and configurable App Store button.
- `privacy.html` — Website and app privacy disclosures.
- `app-analytics.html` — Dedicated app analytics details and opt-out instructions.
- `terms.html` — Informational terms and reward-estimate limitations.
- `404.html` — Page-not-found screen.

All normal navigation and asset paths are relative, so the site works on a
GitHub repository URL as well as your own domain. You can preview locally by
opening `index.html` in your browser. For a local HTTP preview, run
`python3 -m http.server 8000` from this folder and open http://localhost:8000.

## Privacy and publication notes

- The website has no PostHog, cookies, analytics, third-party fonts, remote
  scripts, or sign-up forms.
- The app is different: you confirmed retaining its limited PostHog integration.
  The privacy page describes the documented foreground and external-link events,
  random installation/session identifiers, and limited app/device metadata. It
  does not call these fully anonymous or claim the app transmits no data.
- The policy describes analytics as enabled by default for new installations
  without an existing choice, with controls during setup and in Wallet.
- GitHub Pages logs IP addresses for security; the privacy page links to its
  official disclosure. This is separate from website analytics.
- Before publishing the app policy, verify the operator details and the actual
  PostHog retention/IP-handling settings.
  These were not available in the supplied app materials, and no values have
  been invented. Confirm that the text matches your launch build and practices.
- Terms and privacy content are editable starting points based on your app
  materials, not a certification of legal compliance.

## Assets and editing

The sage-and-forest app icon is used throughout the website, with resized copies for the header/footer, notification illustrations, browser favicon and saved-site icon. The social preview uses the matching forest pin. Versioned asset URLs refresh cached icons after upload.
Five real app screenshots from the verified green-theme build are optimized as WebP images.
Search, Wallet, and Explore show sage Light mode; the Features page also compares
the same Overview screen in sage Light and forest Dark modes. Screens show example
setup states.

Main styling: `assets/styles.css`.
Local interactions: `assets/site.js`.
Launch links: `assets/site-config.js`.

Changing a shared header/footer requires updating the HTML pages where it
appears. No runtime framework is used. There is no pricing page.

Arrival-alert previews are explicitly labeled HTML/CSS illustrations, not app screenshots. Background notifications require user permission, automatic recommendations, supported context and iOS delivery. The website itself never requests location or notification access.

Home and Features include a code-rendered iPhone Lock Screen illustration; the setup walkthrough pairs the same view with arrival permissions. The widget is circular, matching the app’s supported Lock Screen family, with its PLAT label based on the app’s compact-label format for Platinum Card. The figure is explicitly illustrative, not an actual device screenshot.

## Privacy and referral copy — October 15, 2026

Home, About, FAQ, Privacy and Terms now disclose the planned affiliate-network and partnership referral model, no sale of user data, and ranking independence. Every page footer repeats the no-sale/independence promise. Personal-details language names identity/contact/payment details and preserves the existing pseudonymous app analytics, hosting, and optional-service disclosures. No partner or network is invented, no affiliate URL is added, and planned income is described as planned.

The interactive rewards preview and its entry link, calculator code/styles, and obsolete demo FAQ/privacy/terms references were removed at the owner’s request.

## Goals emphasis

The homepage hero links to a prominent goals section before arrival alerts. Goal-setting is step two of getting started and the walkthrough. Goals and personalization lead the Features page using the existing Wallet screenshot. FAQ explains the actual Wallet → Goals & Benefits path, active-goal versus pinned-goal distinction, and manual progress. Supported goals can shape relevant recommendations; no guaranteed outcome or automated account tracking is implied.

## No-collection emphasis

The homepage, About, FAQ, Privacy, Terms, download page and shared footers explicitly state that identity/contact details and personal wallet/rewards data are not collected. No-sale and referral-independence commitments remain. Existing pseudonymous app analytics and hosting/third-party connection disclosures are preserved; this website-copy change does not disable those services or claim zero data transmission of every kind.

Company attribution: “Points Points! is a product of Hazard Partners LLC.” appears in the shared footer and the About page. No unprovided company address or registration information was added.

## Card terminology

Each page introduces the product category as “credit card” or “credit cards” at its first card reference, then uses “card” or “cards” for later references. The 404 page has no card references. Keep this convention when editing page copy.

## General contact

The general contact address is hello@pointspoints.app. Clickable email links appear in every standard page footer, the FAQ contact section, and the 404 page.

## Concise product copy — October 16, 2026

Marketing pages focus on capabilities and outcomes rather than setup steps or in-app navigation. Goals, card comparisons, perks, travel/entertainment, arrival suggestions and themes remain. Required permission conditions, estimate limitations, privacy disclosures and analytics controls remain available.


## Current app screenshots

Refreshed October 16, 2026 from the running iOS app: Overview in Sage and Forest,
Wallet, Search, Explore, and an example personal goal. Wallet cards and goal
progress are demonstration data. Screens are resized and exported as lossless
WebP; the interface content is not redrawn.
