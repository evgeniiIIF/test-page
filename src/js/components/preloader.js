document.addEventListener("DOMContentLoaded", () => {
	const preloaderImage = document.querySelector(".js-preloader__image");

	const allImg = document.body.querySelectorAll("img");

	const offset = 80;
	const path = offset * 2;

	let startX = -offset;
	let startY = offset;

	let loadedImages = 0;
	let percentForOneImage = path / allImg.length;
	let currentPercent = 0;

	for (let i = 0; i < allImg.length; i++) {
		const element = allImg[i];
		const cloneImage = new Image();
		cloneImage.src = element.src;
		cloneImage.onload = loadImage;
		cloneImage.onerror = loadImage;
	}

	function loadImage() {
		loadedImages += 1;
		currentPercent = percentForOneImage * loadedImages;
		startX += percentForOneImage;
		startY -= percentForOneImage;
		preloaderImage.style.transform = `translate(${startX}vw,${startY}vh)`;
		if (currentPercent >= path) {
			let preloader = preloaderImage.closest(".preloader");
			setTimeout(() => {
				preloader.classList.add("preloader--hide");
				let infoText = document.querySelector(".info__text");
				infoText.classList.add("info-text-animate");
				setTimeout(() => {
					preloader.remove();
				}, 1000);
			}, 1000);
		}
	}
});
