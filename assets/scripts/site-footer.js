import { findApp } from "./apps.js";
import { currentLocale, localizePath } from "./locale.js";
import { BRAND_NAME, COPYRIGHT_YEAR, STRINGS } from "./strings.js";

function footerLinks({ app, locale }) {
  const strings = STRINGS[locale];

  if (!app) {
    return [{ label: strings.apps, path: "/#apps" }];
  }

  return [
    { label: strings.support, path: `/${app.id}/support/` },
    { label: strings.privacyPolicy, path: `/${app.id}/privacy/` },
    { label: strings.moreApps, path: "/" },
  ];
}

function renderFooter({ app, locale }) {
  const links = footerLinks({ app, locale })
    .map(({ label, path }) => `<a href="${localizePath(path, locale)}">${label}</a>`)
    .join("");

  return `
    <div class="container site-footer__inner">
      <p class="site-footer__copyright">
        Copyright © ${COPYRIGHT_YEAR} ${BRAND_NAME}. All rights reserved.
      </p>
      <nav class="site-footer__nav">${links}</nav>
    </div>
  `;
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const locale = currentLocale();
    const app = findApp(this.getAttribute("app"));

    this.innerHTML = renderFooter({ app, locale });
  }
}

customElements.define("site-footer", SiteFooter);
