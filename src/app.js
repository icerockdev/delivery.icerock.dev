/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Mozilla Public License 2.0. */

import "./assets/styles/main.scss";
import { tns } from "tiny-slider/src/tiny-slider";
import "tiny-slider/src/tiny-slider.scss";
import "cross-fetch/polyfill";
import Inputmask from "inputmask";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

disableBodyScroll(document.body);

const showModalOnHashChange = () => {
	if (window.location.hash !== "#order-form") return;

	window.showContactModal();
};

window.onload = function () {
	enableBodyScroll(document.body);

	showModalOnHashChange();
	window.addEventListener("hashchange", showModalOnHashChange);

	document.getElementById("preloader").classList.add("preloader_inactive");

	window.setTimeout(() => {
		document.getElementById("preloader").style.display = "none";
	}, 500);
};

// app list
tns({
	container: ".app-carousel__slider",
	items: 3,
	mouseDrag: true,
	slideBy: "page",
	gutter: 0,
	controls: false,
	nav: false,
	center: true,
	loop: false,
	lazyload: false,
	swipeAngle: 45,
	responsive: {
		0: {
			items: 2.4,
			startIndex: 0.4,
			mouseDrag: true,
		},
		768: {
			items: 5,
			startIndex: 1.8,
			mouseDrag: true,
			center: true,
		},
		1331: {
			disable: true,
		},
	},
});

// aboutus persons
tns({
	container: ".aboutus__grid",
	items: 3,
	mouseDrag: true,
	slideBy: "page",
	gutter: 0,
	controls: false,
	nav: false,
	center: true,
	loop: false,
	lazyload: false,
	swipeAngle: 45,
	responsive: {
		0: {
			items: 1.5,
			center: true,
			mouseDrag: true,
			loop: true,
			gutter: 16,
		},
		550: {
			items: 1.75,
			center: true,
			mouseDrag: true,
			loop: true,
		},
		768: {
			items: 3.5,
			center: true,
			loop: true,
			mouseDrag: true,
			startIndex: 1,
		},
		1330: {
			disable: true,
		},
	},
});

tns({
	container: ".showcase__carousel",
	items: 1,
	mouseDrag: true,
	slideBy: "page",
	gutter: 0,
	controls: true,
	nav: false,
	nextButton: ".showcase__arrow_right",
	prevButton: ".showcase__arrow_left",
	lazyload: false,
	swipeAngle: 45,
});

window.hideModalsOnEscape = (event) => {
	if (event.key === "Escape") {
		hideContactModal();
		hideSuccessModal();
	}
};

window.showContactModal = () => {
	disableBodyScroll(document.body);

	if (window.gtag) {
		window.gtag("event", "Открытие окна контакта", {
			event_category: "contact",
			event_action: "open",
		});
	}

	const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
	modal.classList.add("modal_active");
	document.getElementById("contact_modal").querySelector("input").focus();

	window.addEventListener("keyup", hideModalsOnEscape);
};

window.showSuccessModal = () => {
	disableBodyScroll(document.body);

	if (window.gtag) {
		window.gtag("event", "Сообщение отправлено", {
			event_category: "contact",
			event_action: "sent",
		});
	}

	if (window.ym) {
		window.ym(62077537, "reachGoal", "contact_sent");
	}

	const modal = document.getElementById("success_modal");
	modal.style.display = "flex";
	modal.classList.add("modal_active");

	window.addEventListener("keyup", hideModalsOnEscape);
};

window.hideContactModal = () => {
	enableBodyScroll(document.body);
	window.removeEventListener("keyup", hideModalsOnEscape);

	if (grecaptcha.reset) {
		grecaptcha.reset();
	}

	const modal = document.getElementById("contact_modal");
	modal.classList.remove("modal_active");

	const inputs = document
		.getElementById("contact_modal")
		.querySelectorAll("input");
	inputs.forEach((input) => (input.value = ""));

	setTimeout(() => {
		modal.style.display = "none";
	}, 500);

	if (window.location.hash === "#order-form") {
		window.location.hash = "";
	}
};

window.hideSuccessModal = () => {
	enableBodyScroll(document.body);
	window.removeEventListener("keyup", hideModalsOnEscape);

	const modal = document.getElementById("success_modal");
	modal.classList.remove("modal_active");

	if (window.location.hash === "#order-form") {
		window.location.hash = "";
	}

	setTimeout(() => {
		modal.style.display = "none";
	}, 500);
};

// Phone input mask
new Inputmask("+7 (999) 999 99 99", { showMaskOnHover: false }).mask(
	"input_phone"
);

// Input helpers
const onInputFocused = (event) => {
	if (event.target.parentElement.classList.contains("textinput_error")) {
		event.target.parentElement.classList.remove("textinput_error");
	}

	event.target.parentElement.classList.add("textinput_focused");
};

const onInputBlur = (event) => {
	event.target.parentElement.classList.remove("textinput_focused");
};

const onInputChange = (event) => {
	if (event.target.value == "") {
		event.target.parentElement.classList.remove("textinput_filled");
	} else {
		event.target.parentElement.classList.add("textinput_filled");
	}
};

const inputs = document.querySelectorAll(".textinput__input");

inputs.forEach((input) => {
	input.addEventListener("keyup", onInputChange);
	input.addEventListener("change", onInputChange);
	input.addEventListener("focus", onInputFocused);
	input.addEventListener("blur", onInputBlur);
});

function getCookie(name) {
	var matches = document.cookie.match(
		new RegExp(
			"(?:^|; )" +
				name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
				"=([^;]*)"
		)
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

window.getGa = () => {
	if (window.ga && window.ga.getAll && window.ga.getAll().length) {
		return window.ga.getAll()[0].get("clientId");
	}

	return (
		(getCookie("_ga") && getCookie("_ga").replace(/^[^\.]+\.[^\.]+\./, "")) ||
		""
	);
};

const onFormSubmit = (event) => {
	event.preventDefault();
	const nameInput = document.getElementById("input_name");
	const phoneInput = document.getElementById("input_phone");
	const commentInput = document.getElementById("input_comment");
	const captchaInput = document.getElementById("input_captcha");

	const name = nameInput.value;
	const phone = phoneInput.value.replace(/[^\d\+]/gi, "");
	const comment = commentInput.value;
	const captcha = captchaInput.value;

	let hasError = false;

	if (name.length < 2) {
		nameInput.parentElement.classList.add("textinput_error");
		hasError = true;
	}

	if (phone.length != 12) {
		phoneInput.parentElement.classList.add("textinput_error");
		hasError = true;
	}

	if (!captcha) {
		captchaInput.parentElement.classList.add("captcha_error");
		hasError = true;
	}

	if (hasError) return;

	fetch("https://icerockdev.com/landing-sendmail.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			name,
			phone,
			comment,
			captcha,
			googleId: window.getGa(),
		}),
	})
		.then(() => {
			window.hideContactModal();
			window.showSuccessModal();
		})
		.catch((error) => {
			window.hideContactModal();
			window.showSuccessModal();
		});
};

document
	.getElementById("contact_form")
	.addEventListener("submit", onFormSubmit);
