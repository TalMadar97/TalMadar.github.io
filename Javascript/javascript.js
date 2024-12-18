document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !phone) {
      formMessage.style.display = "block";
      formMessage.style.color = "red";
      formMessage.textContent = "Please fill out all required fields!";
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      formMessage.style.display = "block";
      formMessage.style.color = "red";
      formMessage.textContent = "Please enter a valid email address.";
      return;
    }

    formMessage.style.display = "none";

    formMessage.style.display = "block";
    formMessage.style.color = "green";
    formMessage.textContent = "Your message has been sent successfully!";

    contactForm.reset();
  });
});
