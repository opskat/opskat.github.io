import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

if (ExecutionEnvironment.canUseDOM) {
  const STORAGE_KEY = "opskat_locale_redirected";

  // Only redirect on first visit and if on the default (en) locale root
  if (
    !localStorage.getItem(STORAGE_KEY) &&
    (window.location.pathname === "/" || window.location.pathname === "")
  ) {
    localStorage.setItem(STORAGE_KEY, "1");

    const lang = navigator.language || navigator.languages?.[0] || "";
    if (lang.startsWith("zh")) {
      window.location.replace("/zh-CN/");
    }
  }
}
