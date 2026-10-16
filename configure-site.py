#!/usr/bin/env python3
"""Optional, offline launch configuration. The published site needs no Python."""
import argparse
import html
import json
import re
from pathlib import Path
from urllib.parse import urlsplit, urljoin
from xml.sax.saxutils import escape

root = Path(__file__).resolve().parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--site-url', required=True, help='Full site URL, including any repository path')
parser.add_argument('--app-store-url', help='Your verified public apps.apple.com listing')
args = parser.parse_args()
site = urlsplit(args.site_url)
if site.scheme != 'https' or not site.hostname or site.query or site.fragment or site.username or site.password:
    parser.error('--site-url must be a complete HTTPS URL without credentials, query, or fragment')
base = args.site_url.rstrip('/') + '/'
config_path = root / 'assets' / 'site-config.js'
config_source = config_path.read_text()
old_store = re.search(r'appStoreUrl:\s*("(?:[^"\\]|\\.)*")', config_source)
config = {
    'appStoreUrl': json.loads(old_store.group(1)) if old_store else '',
}
if args.app_store_url:
    listing = urlsplit(args.app_store_url)
    if listing.scheme != 'https' or listing.hostname != 'apps.apple.com' or listing.username or listing.password:
        parser.error('--app-store-url must point to https://apps.apple.com/')
    config['appStoreUrl'] = args.app_store_url
pages = sorted(p for p in root.glob('*.html') if p.name != '404.html')
for page in pages:
    source = page.read_text()
    canonical = urljoin(base, '' if page.name == 'index.html' else page.name)
    for pattern in [r'<link rel="canonical"[^>]*>', r'<meta property="og:url"[^>]*>']:
        source = re.sub(pattern, '', source)
    source = re.sub(r'<meta property="og:image" content="[^"]*">',
                    '<meta property="og:image" content="' + html.escape(urljoin(base, 'assets/social-preview.png?v=inverted-solid-20261016'), quote=True) + '">', source)
    source = source.replace('</head>', '<link rel="canonical" href="' + html.escape(canonical, quote=True) + '"><meta property="og:url" content="' + html.escape(canonical, quote=True) + '"></head>')
    page.write_text(source)
config_path.write_text('/* Optional launch configuration. */\nwindow.POINTS_POINTS = Object.freeze({\n' +
    ',\n'.join('  ' + key + ': ' + json.dumps(value) for key, value in config.items()) + '\n});\n')
locations = [urljoin(base, '' if p.name == 'index.html' else p.name) for p in pages]
(root / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    '\n'.join('  <url><loc>' + escape(url) + '</loc></url>' for url in locations) + '\n</urlset>\n')
(root / 'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: ' + urljoin(base, 'sitemap.xml') + '\n')
print('Updated launch configuration, page metadata, sitemap.xml, and robots.txt. No network requests made.')
