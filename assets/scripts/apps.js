export const APPS = [
  {
    id: "screen-anywhere",
    name: { ko: "RemoteScreen", en: "RemoteScreen" },
    iconPath: "/screen-anywhere/images/icon.png",
  },
  {
    id: "kiku",
    name: { ko: "키꾸", en: "Kiku" },
    iconPath: "/kiku/images/icon.png",
  },
];

export function findApp(appId) {
  return APPS.find((app) => app.id === appId);
}
