export const APPS = [
  {
    id: "screen-sharing",
    name: { ko: "화면 공유", en: "Screen Sharing" },
    iconPath: "/screen-sharing/images/icon.png",
  },
];

export function findApp(appId) {
  return APPS.find((app) => app.id === appId);
}
