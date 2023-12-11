import { ele, renderMails, toggleModal } from "./script/ui.js";
import { getDate } from "./script/helpers.js";

const strmails = localStorage.getItem("mails");
let mailData = JSON.parse(strmails);

ele.menu.addEventListener("click", () => {
  ele.nav.classList.toggle("hide");
});

document.addEventListener("DOMContentLoaded", () => {
  renderMails(mailData);

  if (window.innerWidth < 1200) {
    ele.nav.classList.add("hide");
  }
});

ele.createBtn.addEventListener("click", () => toggleModal(true));
ele.closeBtn.addEventListener("click", () => toggleModal(false));

ele.modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-wrapper")) {
    toggleModal(false);
  }
});

ele.modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const reciever = e.target[1].value;
  const title = e.target[2].value;
  const message = e.target[3].value;

  if (!reciever || !title || !message) {
    alert("Lütfen bütün alanları doldurun");
  } else {
    const newMail = {
      id: new Date().getTime(),
      sender: "Ümüt",
      reciever: reciever,
      title: title,
      message: message,
      date: getDate(),
    };

    mailData.unshift(newMail);
    localStorage.setItem("mails", JSON.stringify(mailData));
    renderMails(mailData);

    toggleModal(false);
  }
});

const handleClick = (e) => {
  const mail = e.target.closest(".mail");
  const mailId = mail.dataset.id;

  if (e.target.id === "delete" && confirm("Maili silmek istiyor musunuz?")) {
    mailData = mailData.filter((mail) => mail.id !== Number(mailId));

    localStorage.setItem("mails", JSON.stringify(mailData));

    mail.remove();
  }

  if (e.target.id === "star") {
    const found = mailData.find((item) => item.id === Number(mailId));

    found.isStared = !found.isStared;

    localStorage.setItem("mails", JSON.stringify(mailData));

    renderMails(mailData);
  }
};

ele.mailsArea.addEventListener("click", handleClick);

ele.nav.addEventListener("click", (e) => {
  console.log(e.target.id);

  if (e.target.id == "cat2") {
    const filtred = mailData.filter((mail) => mail.isStared === true);
    renderMails(filtred);
  } else {
    renderMails(mailData);
  }
});
