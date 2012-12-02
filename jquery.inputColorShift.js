(function($){

$.fn.inputColorShift = function(options) {
	var defaults = {
		length: 100,
		startColor: '#66FF00',
		endColor: '#FF3333'
	};
    
	var options = $.extend(defaults, options);
	    
	return this.each(function() {
		var o = options;

		obj = $(this);
		obj.addClass('inputColorShift');

		clearEl = $(document.createElement('div')).addClass('inputColorShiftClearElement');
		obj.after(clearEl);

		num = $(document.createElement('div')).html(o.length);
		num.addClass('charCount');
		obj.after(num);
	
		barwidth = parseInt(obj.css('width')) - 20;
		bar = $(document.createElement('div')).css('width',barwidth);
		bar.css('background-color',o.startColor);
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

	var endR1HexDiff = getColorNumber(options.endColor[1]) - getColorNumber(options.startColor[1]);
	var endR2HexDiff = getColorNumber(options.endColor[2]) - getColorNumber(options.startColor[2]);
	var endG1HexDiff = getColorNumber(options.endColor[3]) - getColorNumber(options.startColor[3]);
	var endG2HexDiff = getColorNumber(options.endColor[4]) - getColorNumber(options.startColor[4]);
	var endB1HexDiff = getColorNumber(options.endColor[5]) - getColorNumber(options.startColor[5]);
	var endB2HexDiff = getColorNumber(options.endColor[6]) - getColorNumber(options.startColor[6]);

	var widthPercent = (txtLength/options.length);
	
	var R1hex = ( getColorNumber(options.startColor[1]) + Math.floor(endR1HexDiff * widthPercent) );
	var R2hex = ( getColorNumber(options.startColor[2]) + Math.floor(endR2HexDiff * widthPercent) );
	var G1hex = ( getColorNumber(options.startColor[3]) + Math.floor(endG1HexDiff * widthPercent) );
	var G2hex = ( getColorNumber(options.startColor[4]) + Math.floor(endG2HexDiff * widthPercent) );
	var B1hex = ( getColorNumber(options.startColor[5]) + Math.floor(endB1HexDiff * widthPercent) );
	var B2hex = ( getColorNumber(options.startColor[6]) + Math.floor(endB2HexDiff * widthPercent) );

	var newBGcolor = '#';
	newBGcolor = newBGcolor + getHexColorValue(R1hex) + getHexColorValue(R2hex)
	newBGcolor = newBGcolor + getHexColorValue(G1hex) + getHexColorValue(G2hex)
	newBGcolor = newBGcolor + getHexColorValue(B1hex) + getHexColorValue(B2hex)
	
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

	return hexArray[val];
}
