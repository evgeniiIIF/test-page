(function () {
	const canvas = document.querySelector("canvas");

	const scrollUpButton = document.querySelector(".scroll-up");
	scrollUpButton.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
		});
	});

	const scrollProgressButton = canvas.getContext("2d");
	class Circle {
		constructor(opts) {
			this.ctx = opts.ctx;
			this.radius = opts.radius;
			this.color = opts.color;
			this.max = opts.max;
			this.x = 0;
			this.pi = Math.PI;
			this.k = (2 * this.pi) / 100;
			this.start = -this.pi / 2;
			this.text = "";
		}

		draw() {
			this.ctx.clearRect(0, 0, 52, 52);

			this.ctx.beginPath();
			this.ctx.arc(
				26,
				26,
				this.radius,
				this.start + this.k * this.x,
				this.start + this.pi * 2,
				false
			);
			this.ctx.lineWidth = 1;
			this.ctx.lineCap = "round";
			this.ctx.strokeStyle = "black";
			this.ctx.stroke();
			this.ctx.closePath();

			this.ctx.beginPath();
			this.ctx.arc(
				26,
				26,
				this.radius,
				this.start,
				this.start + this.k * this.x,
				false
			);
			this.ctx.lineWidth = 1;
			this.ctx.lineCap = "round";
			this.ctx.strokeStyle = this.color;
			this.ctx.stroke();
			this.ctx.closePath();

			if (isMobileMode()) {
				this.ctx.beginPath();
				this.ctx.font = "400 14px Arial";
				this.ctx.fillStyle = "black";
				this.ctx.textAlign = "center";
				this.ctx.fillText(`${this.x}%`, 24, 30);
				this.ctx.closePath();
			}
		}
		hide() {
			this.ctx.clearRect(0, 0, 52, 52);
		}
	}

	const circle = new Circle({
		ctx: scrollProgressButton,
		max: 100,
		radius: 24,
		color: "red",
	});

	showScrollUp();

	window.addEventListener("scroll", () => {
		showScrollUp();
	});

	function showScrollUp() {
		let percent = getScrollPercent();
		if (isMobileMode() && percent > 23) {
			circle.x = percent;
			circle.draw();
		} else if (percent > 50) {
			scrollUpButton.classList.remove("scroll-up--hide");
			scrollUpButton.classList.add("scroll-up--show");
			circle.x = percent;
			circle.draw();
		} else {
			scrollUpButton.classList.remove("scroll-up--show");
			scrollUpButton.classList.add("scroll-up--hide");
			circle.hide();
		}
	}
	function getScrollPercent() {
		let currentPositionBottomPx =
			(window.pageYOffset || document.documentElement.scrollTop) +
			window.innerHeight;
		let percent = Math.floor(
			(currentPositionBottomPx * 100) /
				document.documentElement.scrollHeight
		);
		return percent;
	}
	function isMobileMode() {
		return document.documentElement.classList.contains("no-hover");
	}
})();
