/**
 * Runs before first paint (inlined in <head>) so the page never flashes the
 * wrong theme: a saved choice wins, otherwise the system preference.
 */
export const themeScript = `(function(){var r=document.documentElement,t;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}r.dataset.theme=t})();`;
