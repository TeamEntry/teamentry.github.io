import { findApp } from "./apps.js";
import { alternateLocale, alternateLocalePath, currentLocale, localizePath } from "./locale.js";
import { BRAND_NAME, STRINGS } from "./strings.js";

const APP_PAGES = [
  { id: "overview", path: "", hiddenOnCompact: true },
  { id: "support", path: "support/" },
  { id: "privacy", path: "privacy/" },
];

function renderLocaleSwitch(locale) {
  const targetLocale = alternateLocale(locale);
  const href = alternateLocalePath(window.location.pathname, locale);

  return `
    <a class="locale-switch" href="${href}" hreflang="${targetLocale}" lang="${targetLocale}">
      ${STRINGS[targetLocale].localeName}
    </a>
  `;
}

function renderAppLink({ page, app, locale, currentPageId }) {
  const href = localizePath(`/${app.id}/${page.path}`, locale);
  const currentAttribute = page.id === currentPageId ? ' aria-current="page"' : "";
  const compactClass = page.hiddenOnCompact ? " is-hidden-on-compact" : "";

  return `
    <a class="site-header__link${compactClass}" href="${href}"${currentAttribute}>
      ${STRINGS[locale][page.id]}
    </a>
  `;
}

function renderAppHeader({ app, locale, currentPageId }) {
  const appLinks = APP_PAGES
    .map((page) => renderAppLink({ page, app, locale, currentPageId }))
    .join("");

  return `
    <div class="container site-header__inner">
      <a class="site-header__brand is-hidden-on-compact" href="${localizePath("/", locale)}">
        ${BRAND_NAME}
      </a>
      <a class="site-header__app" href="${localizePath(`/${app.id}/`, locale)}">
        <img src="${app.iconPath}" alt="" width="24" height="24">
        ${app.name[locale]}
      </a>
      <nav class="site-header__nav" aria-label="${app.name[locale]}">
        ${appLinks}
        ${renderLocaleSwitch(locale)}
      </nav>
    </div>
  `;
}

function renderHomeHeader({ locale }) {
  return `
    <div class="container site-header__inner">
      <a class="site-header__brand" href="${localizePath("/", locale)}">${BRAND_NAME}</a>
      <nav class="site-header__nav" aria-label="${BRAND_NAME}">
        <a class="site-header__link" href="${localizePath("/#apps", locale)}">${STRINGS[locale].apps}</a>
        ${renderLocaleSwitch(locale)}
      </nav>
    </div>
  `;
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const locale = currentLocale();
    const app = findApp(this.getAttribute("app"));
    const currentPageId = this.getAttribute("page");

    this.innerHTML = app
      ? renderAppHeader({ app, locale, currentPageId })
      : renderHomeHeader({ locale });
  }
}

customElements.define("site-header", SiteHeader);
