const DEFAULT_LOCALE = "ko";

const PATH_PREFIX_BY_LOCALE = {
  ko: "",
  en: "/en",
};

const ENGLISH_PATH_PATTERN = /^\/en(?=\/)/;

export function currentLocale() {
  return document.documentElement.lang === "en" ? "en" : DEFAULT_LOCALE;
}

export function alternateLocale(locale) {
  return locale === "ko" ? "en" : "ko";
}

export function localizePath(path, locale) {
  return `${PATH_PREFIX_BY_LOCALE[locale]}${path}`;
}

export function alternateLocalePath(pathname, locale) {
  const pathWithoutLocale = pathname.replace(ENGLISH_PATH_PATTERN, "");
  return localizePath(pathWithoutLocale, alternateLocale(locale));
}
