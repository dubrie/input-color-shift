(function($){

$.fn.inputColorShift = function(options) {
	var defaults = {
		length: 10,
		startColor: '#66FF00',
		endColor: '#FF3333'
	};
    
	var options = $.extend(defaults, options);
	    
	return this.each(function() {
		var o = options;

		obj = $(this);
		num = $(document.createElement('div')).html(o.length);
		num.css('display','table-cell');
		num.addClass('charCount');
		obj.after(num);
		
		bar = $(document.createElement('div')).css('width',obj.css('width'));
		bar.html('&nbsp;');
		bar.css('background-color',o.startColor);
		bar.css('display','table-cell');
		bar.addClass('dumpbar');
		obj.after(bar);

		obj.keydown(function() {
			inputLength = $(this).val().length
			if(o.length - inputLength >= 0) {
				barColor = calculateBarColor(inputLength, o);
				$(this).parent().find(".dumpbar").css('background-color',barColor);
				$(this).parent().find('.charCount').html(o.length - inputLength);
			} else {
				// discard input stroke
				contents = $(this).val();
				$(this).val(contents.substr(0, o.length));
			}
		});

		obj.keyup(function(){
			inputLength = $(this).val().length
			if(o.length - inputLength >= 0) {
				barColor = calculateBarColor(inputLength, o);
				$(this).parent().find(".dumpbar").css('background-color',barColor);
				$(this).parent().find('.charCount').html(o.length - inputLength);
			} else {
				// discard input stroke
				contents = $(this).val();
				$(this).val(contents.substr(0, o.length));
			}
		
		});
	});
};
})(jQuery);

function calculateBarColor(txtLength, options) {

	var hexArray = new Array();
	hexArray["0"] = 0;
	hexArray["1"] = 1;
	hexArray["2"] = 2;
	hexArray["3"] = 3;
	hexArray["4"] = 4;
	hexArray["5"] = 5;
	hexArray["6"] = 6;
	hexArray["7"] = 7;
	hexArray["8"] = 8;
	hexArray["9"] = 9;
	hexArray["A"] = 10;
	hexArray["B"] = 11;
	hexArray["C"] = 12;
	hexArray["D"] = 13;
	hexArray["E"] = 14;
	hexArray["F"] = 15;

	var widthPercent = (txtLength/options.length);
	var Rhex = ( hexArray[options.startColor[1]] + Math.floor(9  * widthPercent) );
	var Ghex = ( hexArray[options.startColor[3]] - Math.floor(12 * widthPercent) );
	var Bhex = ( hexArray[options.startColor[5]] + Math.floor(3  * widthPercent) );

	var newBGcolor = '#';
	for(i in hexArray) {
		if(hexArray[i] == Rhex) {
			newBGcolor = newBGcolor + i;
		}
	}
	for(j in hexArray) {
		if(hexArray[j] == Ghex) {
			newBGcolor = newBGcolor + j;
		}
	}
	for(k in hexArray) {
		if(hexArray[k] == Bhex) {
			newBGcolor = newBGcolor + k;
		}
	}

	return newBGcolor;
}

