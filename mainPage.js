const sidebar = document.getElementById("sidebar");
const menuIcon = document.querySelector(".menu-icon");
const closeBtn = document.getElementById("closeBtn");

menuIcon.addEventListener("click", () => {
  sidebar.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("open");
});

document.addEventListener("click", (e) => {
  if (
    sidebar.classList.contains("open") &&
    !sidebar.contains(e.target) &&
    !menuIcon.contains(e.target)
  ) {
    sidebar.classList.remove("open");
  }
});
const clubBtn  = document.getElementById("clubBtn");
const aboutBtn = document.querySelector(".about-btn");
if (clubBtn) {
  clubBtn.addEventListener("click", () => {
    window.location.href = "login.html";  
  });
}
if (aboutBtn) {
  aboutBtn.addEventListener("click", () => {
    window.location.href = "blog.html";        
  });
}

