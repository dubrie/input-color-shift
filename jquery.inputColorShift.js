(function($){

$.fn.inputColorShift = function(options) {
	var defaults = {
		maxlength: 100,
		startColor: '#66FF00',
		endColor: '#FF3333',
		barRightOffset: 20
	};
    
	var options = $.extend(defaults, options);
	    
	return this.each(function() {
		var o = options;

		obj = $(this);
		obj.addClass('inputColorShift');

		clearEl = $(document.createElement('div')).addClass('inputColorShiftClearElement');
		obj.after(clearEl);

		num = $(document.createElement('div')).html(o.maxlength);
		num.addClass('charCount');
		obj.after(num);
	
		barwidth = parseInt(obj.css('width')) - o.barRightOffset;
		bar = $(document.createElement('div')).css('width',barwidth);
		bar.css('background-color',o.startColor);
		bar.addClass('dumpbar');
		obj.after(bar);


		obj.keydown(function() {
			inputLength = $(this).val().length
			if(o.maxlength - inputLength >= 0) {
				$(this).parent().find(".dumpbar").css('background-color',calculateBarColor(inputLength,o));
				$(this).parent().find('.charCount').html(o.maxlength - inputLength);
			} else {
				// discard input stroke
				contents = $(this).val();
				$(this).focus().val(contents.substr(0, o.maxlength));
			}
		});

		obj.keyup(function(){
			inputLength = $(this).val().length
			if(o.maxlength - inputLength >= 0) {
				$(this).parent().find(".dumpbar").css('background-color',calculateBarColor(inputLength,o));
				$(this).parent().find('.charCount').html(o.maxlength - inputLength);
				
				origWidth = parseInt($(this).css('width')) - o.barRightOffset;
				textPercent = 1 - (inputLength / o.maxlength);
				$(this).parent().find(".dumpbar").css('width',origWidth*textPercent);
			} else {
				// discard input stroke
				contents = $(this).val();
				$(this).focus().val(contents.substr(0, o.maxlength));
			}
		
		});
	});
};
})(jQuery);

function calculateBarColor(txtLength, options) {

	var widthPercent = (txtLength/options.maxlength);
	var startHex = new Array();
	
	for(var i=1; i <= 6; i++) {
		endHex = getColorNumber(options.endColor[i]) - getColorNumber(options.startColor[i]);
		hexNumber = ( getColorNumber(options.startColor[i]) + Math.floor(endHex * widthPercent) );
		startHex[i] = getHexColorValue(hexNumber);
	}

	var newBGcolor = '#'+ startHex.join("");
	
	return newBGcolor;
}

function getHexColorValue(val) {
	var hexArray = new Array();
	hexArray[0] = 0;
	hexArray[1] = 1;
	hexArray[2] = 2;
	hexArray[3] = 3;
	hexArray[4] = 4;
	hexArray[5] = 5;
	hexArray[6] = 6;
	hexArray[7] = 7;
	hexArray[8] = 8;
	hexArray[9] = 9;
	hexArray[10] = 'A';
	hexArray[11] = 'B';
	hexArray[12] = 'C';
	hexArray[13] = 'D';
	hexArray[14] = 'E';
	hexArray[15] = 'F';

	return hexArray[val];
}
function getColorNumber(val) {
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

	return hexArray[val.toUpperCase()];
}
