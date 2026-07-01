document.addEventListener("DOMContentLoaded", () => {

const skills = document.querySelectorAll(".skill");

skills.forEach(skill => {

	skill.addEventListener("mouseenter", () => {
	
		skill.style.backgroundColor = "pink";
		skill.style.color = "white";
		skill.style.transform = "scale(1.08)";
		skill.style.boxShadow = "0 5px 15px rgba(255,105,180,.4)";
	
	});

	skill.addEventListener("mouseleave", () => {
	
		skill.style.backgroundColor = "";
		skill.style.color = "";
		skill.style.transform = "";
		skill.style.boxShadow = "";
	
	});

});

const hiddenSections = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.2
});

hiddenSections.forEach((section) => {
	observer.observe(section);
});

const text = "Software Development Student @ CCAC";
const typing = document.getElementById("typing");

let index = 0;

function typeText() {

	if (index < text.length) {
	
		typing.textContent += text.charAt(index);
		
		index++;
		
		setTimeout(typeText, 80);
		
	}

}

setTimeout(typeText, 500);

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {

    link.addEventListener("click", function(e) {

        // Ignore links that go to other websites
        if (!this.getAttribute("href").startsWith("#")) {
            return;
        }

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        const navHeight = document.querySelector("nav").offsetHeight;

        const targetPosition =
            target.offsetTop - navHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});

});

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

	document.body.classList.toggle("dark-mode");

	if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }

});

const projectButtons = document.querySelectorAll(".project-card .button");

projectButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert("This project will be available soon! 💖");

    });

});

const socialCards = document.querySelectorAll(".social-card");

const socialMessage = document.getElementById("socialMessage");

socialCards.forEach(card => {

    card.addEventListener("click", () => {

        socialMessage.textContent = card.dataset.message;

    });

});