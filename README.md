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

## Add your own domain

Verify domain ownership in your GitHub account's **Settings → Pages** first.
Then add the custom domain in the repository's **Settings → Pages** before
pointing DNS at GitHub. Configure both the root domain and `www`, then enable
**Enforce HTTPS** after GitHub's certificate is available.

Use GitHub's current DNS instructions:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

No domain or `CNAME` has been invented for this package. Add your actual domain
through GitHub's Pages settings when you are ready.

## Add the App Store link

The download page currently says **Coming to iPhone**, because a verified App
Store listing URL was not supplied. The site doesn't link to an invented listing.

Open `assets/site-config.js` and paste your public App Store URL into
`appStoreUrl`, between the quotation marks. Leave the surrounding punctuation.
Commit the change to GitHub. All buttons marked as app download links will use it,
and the download page will show its App Store button.

## Optional: configure social previews and the final URL

`assets/social-preview.png` is included. The initial HTML uses a relative image
address because your final domain is not yet known. Some social platforms need
an absolute address. Once you know your site's URL, this optional helper adds
absolute social-image URLs, canonical page URLs, a sitemap, and robots.txt:

```sh
python3 configure-site.py --site-url https://YOUR-DOMAIN.example
```

For a GitHub project URL, include the repository path:

```sh
python3 configure-site.py --site-url https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

You can also set launch links in the same command:

```sh
python3 configure-site.py --site-url https://YOUR-DOMAIN.example --app-store-url "YOUR-PUBLIC-APP-STORE-URL"
```

Replace the example values with your actual values. Run the command from this
folder, then upload the updated files. The helper uses only built-in Python
libraries and makes no network requests. It is optional; the website itself
runs without Python. You can omit `configure-site.py` from the published repo.

## Pages included

- `index.html` — Home, arrival-alert feature, app screenshots, privacy and referral explanation.
- `how-it-works.html` — Four-step walkthrough with app screens and optional arrival-alert setup.
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

The original app logo and icon are used, with resized copies for the web.
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
