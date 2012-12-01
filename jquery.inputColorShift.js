(function($){

$.fn.inputColorShift = function(options) {
	var defaults = {
		length: 100,
		startColor: '66FF00',
		endColor: 'FF3333'
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
		bar.css('background-color','#66FF00');
		bar.css('display','table-cell');
		bar.addClass('dumpbar');
		obj.after(bar);
	
		obj.keyup(function(){
			inputLength = $(this).val().length
			if(o.length - inputLength > 0) {
				$('#dumpbar1').css('background-color', '#66FF00');
				dumpbar = $('.dumpbar').css('background-color');
//$(this).children(":first").css('background-color','#00FF66');
				$('.charCount').html(o.length - inputLength);
			} else {
				// discard input stroke
			}
		
		});
	});
};
})(jQuery);

function calcDumpBar(txtlen) {
	var newWidth = 100 - (Math.ceil((txtlen/maxLength) * 100));
	$("#dumpBarLeft").width(newWidth+"%");

	// now the hard part, change the color
	var widthPercent = (newWidth / 100);
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

	var widthPercent = (txtlen/maxLength);
	var Rhex = ( hexArray['6'] + Math.floor(9  * widthPercent) );
	var Ghex = ( hexArray['F'] - Math.floor(12 * widthPercent) );
	var Bhex = ( hexArray['0'] + Math.floor(3  * widthPercent) );

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

	$("#dumpBarLeft").css({'background-color' : newBGcolor});
	$("#dumpBarRight").text(maxLength - txtlen);
}

$("#dd_input").keydown(function(){
		var ddi = $("#dd_input").val();
		// validate that it is 200 or lower
		if(ddi.length > maxLength) {
			ddi = ddi.substring(0,(maxLength));
			$("#dd_input").val(ddi);
		}
		calcDumpBar(ddi.length);
});
$("#dd_input").keyup(function(){
		var ddi = $("#dd_input").val();
		if(ddi.length > maxLength) {
			ddi = ddi.substring(0,(maxLength));
			$("#dd_input").val(ddi);
		}
		// validate that it is 200 or lower
		$("#charsRemaining").text( (maxLength - ddi.length) );
		calcDumpBar(ddi.length);
});
