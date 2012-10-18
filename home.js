var maxLength = 140;

function calcDumpBar(txtlen) {
	// first the easy part, width
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

$(document).ready(function(){
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
	$("#dump").click(function(){
		$(".error").hide();
		var hasError	= false;
		var ddValue	= $("#dd_input").val();
		var userID	= $("#user_id").val();

		if(ddValue == '') {
			$("#dd_input").after('<span class="error">You forgot to type something!</span>');
			hasError = true;	
		}
		
		if(hasError == false) {
			$(this).hide();

			$.ajax({
				type: "POST",
				data: {
					ddInput: ddValue,
					userID: userID,
					txType: 'dump'
				},
				cache: false,
				dataType: 'html',
				url: '/ajaxincs/home.php',
				timeout: 2000,
				error: function() {
					alert('Whoops! Looks like there was a problem with your submission, try it again in a few seconds.');
				},
				success: function(data) {
					$("#noitemstoday").fadeOut(200);
					$("#today_list").prepend('<li>'+data+'</li>');
					$("#dd_input").val('');
					calcDumpBar(0);
				}
			});
				
			$(this).show();
		}

		return false;
	});

	$(".sourceUpdateLink").click(function(){
		var linkID = "#"+$(this).attr("id");
		var sourceID = linkID.substring(2).split("_",1);
		return sourceUpdate(sourceID);
	});
	
/*	grabNewTC($("#user_id").val());
	$.doTimeout('newTC', 45000, function() {
		var userID	= $("#user_id").val();
		return grabNewTC(userID);
	});
*/	
	if(uAcc == 1) {
		for ( var sId in aAcc ) {
			sourceUpdate(aAcc[sId]);
		}
	}
});

function grabNewTC(userID) {
	var retVal	= true;

	$.ajax({
		type: "POST",
		data: {
			userID: userID,
			txType: 'newTC'
		},
		cache: false,
		dataType: 'html',
		url: '/ajaxincs/home.php',
		timeout: 2000,
		error: function() {
			$.doTimeout( 'newTC' );
			$("#curCapsuleBlock").html('Hmm, there seems to be a problem with this.  Check back in a few seconds.');
			retVal = false;
		},
		success: function(data) {
			$("#curCapsuleBlock").fadeOut(600, function(){
			$("#curCapsuleBlock").html(data);
			$("#curCapsuleBlock").fadeIn(600);
			});
			retVal = true;
		}
	});

	return retVal;		
}

function sourceUpdate(sourceID) {
	var linkID = "s"+sourceID+"_updateLink";
	var loaderID = "s"+sourceID+"miniloader";
	var updateID = "s"+sourceID+"_updated";
	var userID	= $("#user_id").val();

	$("#"+linkID).hide();
	$("#"+loaderID).show();
	// upload this account specifically...
	$.ajax({
		type: "POST",
		data: {
			sourceID: sourceID,
			action: 'update'
		},
		cache: false,
		dataType: 'html',
		url: '/ajaxincs/account.php',
		timeout: 5000,
		error: function() {
			alert('Something went wrong while updating your account.  Please try again in a few minutes');
			$("#"+loaderID).hide();
			$("#"+linkID).show();
		},
		success: function(data) {
			$.ajax({
				type: "POST",
				data: {
					dateType: 'timeAgo'
				},
				dataType: 'html',
				url: 'ajaxincs/fancydate.php',
				timeout: 2000,
				error: function() {
					$("#"+loaderID).hide();
					$("#"+linkID).show();
				},
				success: function(data2) {
					$("#"+updateID).html(data2);
				}
			});
			$.ajax({
				type: "POST",
				data: {
					txType: 'updateToday',
					userID: userID
				},
				dataType: 'html',
				url: 'ajaxincs/home.php',
				timeout: 2000,
				error: function() {
					//alert('Problem updating Today list, please refresh the page');
					$("#"+loaderID).hide();
					$("#"+linkID).show();
				},
				success: function(data3) {
					if(data3 != '') {
						$("#today_list").html(data3);
					}
					$("#"+loaderID).hide();
					$("#"+linkID).show();
				}	
			});
			$.ajax({
				type: "POST",
				data: {
					txType: 'updatePast',
					userID: userID
				},
				dataType: 'html',
				url: 'ajaxincs/home.php',
				timeout: 2000,
				error: function() {
					//alert('Problem updating Past list, please refresh the page');
					$("#"+loaderID).hide();
					$("#"+linkID).show();
				},
				success: function(data4) {
					$("#past_entries").html(data4);
					$("#"+loaderID).hide();
					$("#"+linkID).show();
				}	
			});
		}
	});
}


