$(function() {
    if ($('#auto-slideshow img').size() > 1) {
        $('#auto-slideshow').mobilyslider({
            children: 'img',
            transition: 'fade',
            animationSpeed: 800,
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnHover: true,
            bullets: false,
            arrows: false
        });
    }
    $(document).ready(function() {
        $(".gallery a").each(function () {
            $(this)
                .attr('rel', 'gallery')
                .attr('title', $('.caption', this).html())
                .fancybox();
        });
    });
});

$(function() {
    var selectedID = $('#categories .selected').attr('id');
    if (selectedID === undefined)
        selectedID = $('#categories span').first().addClass('selected').attr('id');
    $('#cost-' + selectedID).addClass('selected');
    $('#driving-' + selectedID).addClass('selected');

    $('#categories li').click(function() {
        var $el = $(this).children('span');
        if ($el.hasClass('selected')) return;
        $('#cost .selected, #driving-hours .selected, #categories .selected').removeClass('selected');
        $el.addClass('selected');
        $('#cost-' + $el.attr('id')).addClass('selected');
        $('#driving-' + $el.attr('id')).addClass('selected');
        $('#summary-result').text('');
    });

    $('#compute-cost button').click(function() {
        var sum = 0;
        $('.selected .price').each(function() {
            sum += Number($(this).html());
        });
        $('#cost .selected. .hour-price').each(function() {
            var elID = $(this).attr('id');
            var val = Number($('#input-' + elID).val());
            if (isNaN(val) || val % 1 != 0 || val < 0) {
                $('#input-' + elID).val('0');
                return;
            }
            if (val > 10000) {
                val = 10000;
                $('#input-' + elID).val('10000');
            }
            sum += Number($(this).html()) * val;
        });
        $('#summary-result').text(sum + ' руб.');
    });
});

$(function() {
  $('.application-form #id_is_license').change(function() {
    if ($(this).is(":checked")) {
      $('.application-form .intake-group').hide();
      $('.application-form .group-group').hide();
    } else {
      $('.application-form .intake-group').show();
      $('.application-form .group-group').show();
    }
  });

  function option(name, value, selected, count) {
    var opt = $('<option>').attr('value', value).text(name + ', осталось мест: ' + count).addClass('tmp');
    if (value == selected)
      opt.attr('selected', 'selected');
    return opt;
  }

  function load(id, selected) {
    if (!$('#id_group').length)
      return;
    var intakes = INTAKES[id];
    var group = $('#id_group');
    group.find('.tmp').remove();
    if (intakes) {
      if (intakes.morning > 0)
        group.append(option('утренняя — с 10 часов', 'morning', selected, intakes.morning));
      if (intakes.midday > 0)
        group.append(option('дневная — с 14 часов', 'midday', selected, intakes.midday));
      if (intakes.evening > 0)
        group.append(option('вечерняя — c 18.30 часов', 'evening', selected, intakes.evening));
      if (intakes.days_off > 0)
        group.append(option('группа выходного дня, утро — с 10 часов', 'days_off', selected, intakes.days_off));
      if (intakes.days_off2 > 0)
        group.append(option('группа выходного дня, день — с 14 часов', 'days_off2', selected, intakes.days_off2));
    }
  }

  $('.application-form #id_application_intake').change(function() {
    load($(this).val());
  });

  var initialID = $('#id_application_intake').val();
  if (initialID != '') {
    load(initialID, $('#id_group').attr('data-val'));
  }
});

/*
 * Dynamically load blog posts
 */
$(function() {
  $('#download-posts').click(function() {
    $.get('/news/load-posts/', {
      offset: $('.post').size(),
    }, function(data) {
      if (data.posts)
        $('.news').append(data.posts);
      if (!data.show_more)
        $('#download-posts').remove();
    }, 'json', false);

    return false;
  });
});

/**
 * Add reviews
 */
$(function() {
  if (typeof REVIEWS === 'undefined') {
    return;
  }

  var el = $('#reviews-after-this');
  if (!el.length)
    return;

  var wrapper = $('<div>');

  for (var i = 0; i < REVIEWS.length; i++) {
    var review = REVIEWS[i];
    wrapper.append('<br />');
    wrapper.append('<br />');
    wrapper.append(
      $('<p>')
        .append(
          $('<span>')
            .attr('style', 'font-size: medium;')
            .append(
              $('<span>')
                .attr('style', 'color: #339966;')
                .text(review.user_name)
            )
            .append(
              ', ' + review.posted_at
            )
        )
    );
    wrapper.append(
      $('<p>')
        .attr('style', 'text-align: justify;')
        .append(
          $('<span>')
            .attr('style', 'font-size: medium;')
            .html('&nbsp; &nbsp;' + review.message)
        )
    );
  }

  el.append(wrapper);
});
