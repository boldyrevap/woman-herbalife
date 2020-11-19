import $ from 'jquery';
import WOW from 'wowjs';

function fillGraphs(elem, fill) {
	const time = 2000;
	for (let k = 0; k < fill; k++) {
		$(elem[k]).delay(k * (time / fill)).queue(function () {
			$(this).addClass('graph__item_fill');
		});
	}
}

$(() => {
	$('.banner__btn').on('click', function () {
		$('html, body').animate({
			scrollTop: $('.eat-or-stop__title').offset().top - 50
		}, 500);
	});

	$('.js-exp-show-more').on('click', function (e) {
		e.preventDefault();

		$('.expert-comment').addClass('active');
	});

	$('.js-exp-hide-more').on('click', function (e) {
		e.preventDefault();

		$('.expert-comment').removeClass('active');
	});

	$('.js-show-more').on('click', function (e) {
		e.preventDefault();
		const target = $(this).data('target');
		const more = $(`.${target}-more`);
		more.addClass('active');
	});

	$('.js-hide-more').on('click', function (e) {
		e.preventDefault();
		const target = $(this).data('target');
		const more = $(`.${target}-more`);
		more.removeClass('active');
		$('html, body').animate({
			scrollTop: $(`.${target}`).offset().top
		}, 500);
	});

	$('.js-circle-path').on('click', function () {
		const index = $(this).index();
		const circle = $(this).closest('.circle').data('circle');
		const item = $(this).closest('.circle').find('.circle__item');
		const image = $(this).closest('.circle').find('.circle__image img');
		const current = $(item[index]);

		item.removeClass('active');
		current.addClass('active');
		image.attr('src', './images/c' + circle + '-' + index + '.png');
	});


	$(document).on('scroll', function () {
		const scrollTop = $(this).scrollTop();
		$('.js-interview').each((i, item) => {
			if (scrollTop >= $(item).offset().top - ($(item).height() / 2) && !$(item).hasClass('animate')) {
				$(item).addClass('animate');
				const graphs = $(item).find('.graph');
				$(graphs).each((index, graph) => {
					const fill = $(graph).data('fill');
					const elem = $(graph).find('.graph__item');
					fillGraphs(elem, fill);
				});
			}
		});
	});

	const wow = new WOW.WOW({
		boxClass: 'wow'
	});

	wow.init();
});
