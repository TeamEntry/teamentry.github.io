export const APPS = [
  {
    id: "screen-anywhere",
    name: { ko: "원격 화면", en: "Screen Anywhere" },
    iconPath: "/screen-anywhere/images/icon.png",
  },
];

export function findApp(appId) {
  return APPS.find((app) => app.id === appId);
}
