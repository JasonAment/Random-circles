//Global vars
var themeView = false, deleteView = false;
//Set a random color for each element
$.fn.randomColor = function() {
	var randColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return this.each(function() {
        $(this).css({"border-color": randColor}).attr("data-color", randColor);
    });
};


//Theme Mode
$('#eTheme').click(function(){
	themeView = !themeView;
	if(themeView){
		$(this).text("Exit Theme Editor");
		$("#showTheme").show();
		$("#container").css("width","74%");
	}
	else{
		$(this).text("Theme Editor");
		$("#showTheme").hide();
		if(!deleteView){
			$("#container").css("width","100%");
		}
	}
});

//Delete Mode
$('#eItems').click(function(){
	deleteView = !deleteView;
	if(deleteView){
		$(this).text("Exit Item Editor");
		$("#showDelete").show();
		$("#container").css("width","74%");
	}
	else{
		$(this).text("Item Editor");
		$('#showDelete').hide();
		if(!themeView){
			$("#container").css("width","100%");
		}
		
	}
});

//if in deleteview remove the item and add it's id to the list, else just display the title.
$(document).on("click","#imgList li",function(){
	if(deleteView){
		var imgId = $(this).find('img').attr("id");
		$('#deleteList').append('<li>'+imgId+'</li>');
		$(this).remove();
	}
	else{
		$('.itemDescription').remove();
		var $img = $(this).find('img');
		var imgTitle = $img.attr('alt');
		var imgSrc = $img.attr('src');
		$('body').prepend("<section class='itemDescription'><img src='" + imgSrc + "' alt='" + imgTitle + "'/><h2>" + imgTitle + "</h2></section>");
		$('.itemDescription').delay(2000).fadeOut();
	}
});

//image slider
$('#slider').change(function(){
	$('#imgList li img').width(this.value);
});
$('#slider').change();

//Theme change
var colorToggle = false;
$('#imgTheme').click(function(){
	$('#imgList li img').each(function(){
		if(!colorToggle){
			$(this).css('border-color', "#314dec");
		}
		else{
			var dataColor = $(this).attr("data-color");
			$(this).css("border-color", dataColor);
		}
	});
	if(!colorToggle){
		$(this).text("Random Colors!");
	}
	else{
		$(this).text("Default Colors");
	}
	colorToggle = !colorToggle;
});



//Load Images
$('#imgLoader').click(function(){
		$.support.cors = true;

		var data;
		var collectionData = $.ajax({
		dataType: "json",
		url: "http://itunes.apple.com/us/rss/topsongs/limit=20/genre=2/json",
		data: data
	}).done(function (data) {
		var collection = collectionData.responseJSON.feed.entry;
		for (i = 0; i < collection.length; i++) {
			var img = collection[i]['im:image'][2].label;
			var title = collection[i]['im:name'].label;
			var id = title.replace(/ /g, "-");
			$("#imgList").append('<li class="image"><img id="'+ id +'" src="' + img + '" alt="' + title + '" style="border:#232323 7px solid"></li>');
		}
		$('#imgLoader, #placeholder').remove();
	}).always(function(){
		$('#imgList li').each(function(){
			var randomTime = Math.random() * 3000;
			$(this).find('img').randomColor();
			$(this).animate({opacity:1}, randomTime);
		});
		$('#secondaryUI').fadeIn();
	});
});


