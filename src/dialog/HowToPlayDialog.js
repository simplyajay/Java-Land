export default class HowToPlayDialog {

	constructor() {



	}

	showDialog(scene) {

		this.setHowToPlayDialogFunctions(scene);

		var howToPlayBox = document.getElementById('how-to-play-box');

		howToPlayBox.style.display = "inline-block";

		scene.pause();

	}

	hideDialog(scene) {

		var howToPlayBox = document.getElementById('how-to-play-box');

		howToPlayBox.style.display = "none";

		scene.resume();

	}

	setHowToPlayDialogFunctions(scene) {

		var howToPlayBox = document.getElementById('how-to-play-box');

		var slide1 = document.getElementById('slide-1');
		var slide2 = document.getElementById('slide-2');
		var slide3 = document.getElementById('slide-3');

		var prevButton = document.getElementById("prev-button");
		var nextButton = document.getElementById("next-button");

		var item1 = document.getElementById('item-1');
		var item2 = document.getElementById('item-2');
		var item3 = document.getElementById('item-3');

		var image2 = document.getElementById('image-2');

		var currentSlide = slide1;

		var closeBtn = document.getElementById('how-to-play-close-button');

		let isImage2Enlarged = false;

		slide1.onclick = function () {

			slide1.ariaCurrent = "true";
			slide1.className = "active";
			slide2.ariaCurrent = "false";
			slide2.className = "";
			slide3.ariaCurrent = "false";
			slide3.className = "";

			item1.className = "carousel-item active";
			item2.className = "carousel-item";
			item3.className = "carousel-item";

			currentSlide = slide1;

			image2.style.transform = "scale(1)";
			isImage2Enlarged = false;

		}

		slide2.onclick = function () {

			slide2.ariaCurrent = "true";
			slide2.className = "active";
			slide1.ariaCurrent = "false";
			slide1.className = "";
			slide3.ariaCurrent = "false";
			slide3.className = "";

			item1.className = "carousel-item ";
			item2.className = "carousel-item active";
			item3.className = "carousel-item";

			currentSlide = slide2;

			image2.style.transform = "scale(1)";
			isImage2Enlarged = false;

		}

		slide3.onclick = function () {

			slide3.ariaCurrent = "true";
			slide3.className = "active";
			slide1.ariaCurrent = "false";
			slide1.className = "";
			slide2.ariaCurrent = "false";
			slide2.className = "";

			item1.className = "carousel-item ";
			item2.className = "carousel-item ";
			item3.className = "carousel-item active";

			currentSlide = slide3;

			image2.style.transform = "scale(1)";
			isImage2Enlarged = false;

		}

		prevButton.onclick = function () {

			if (currentSlide == slide1) {

				slide3.click();

			} else if (currentSlide == slide2) {

				slide1.click();

			} else if (currentSlide == slide3) {

				slide2.click();

			}

		}

		nextButton.onclick = function () {

			if (currentSlide == slide1) {

				slide2.click();

			} else if (currentSlide == slide2) {

				slide3.click();

			} else if (currentSlide == slide3) {

				slide1.click();

			}

		}

		closeBtn.onclick = function () {

			slide1.click();
			howToPlayBox.style.display = "none";

			scene.resume();

		}

		image2.onclick = function () {

			if (!isImage2Enlarged) {

				image2.style.transform = "scale(1.5)";
				image2.style.transition = "transform 0.25s ease";
				isImage2Enlarged = true;

			}else{

				image2.style.transform = "scale(1)";
				image2.style.transition = "transform 0.25s ease";
				isImage2Enlarged = false;

			}

		}

	}

}