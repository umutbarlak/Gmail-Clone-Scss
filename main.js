import { ele, renderMails } from "./script/ui.js";
import { mailData } from "./script/constants.js";

console.log(ele);

ele.menu.addEventListener("click", () => {
  ele.nav.classList.toggle("hide");
});

document.addEventListener("DOMContentLoaded", () => {
  renderMails(mailData);
});
