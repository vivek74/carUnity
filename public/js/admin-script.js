var removeTextFromInput = function(input){
	var removeThis = document.getElementById(input);
	removeThis.value = "";
};


//category
$(document).ready(function(){
	$("#category_button").on('click',function(event) 
	{	
		event.preventDefault();
		event.stopPropagation();
		var data={new:$("#category_first").val()};
		//console.log(JSON.stringify(data));
		$.ajax({
			beforeSend: function(){
				$('.lodingLogin').css("display", "inline");
			},
			url:"/admin/create-category",
			type:"POST",
			contentType:"application/json",
			data:JSON.stringify(data)
		}).done(function(result){
			//document.getElementById('show_comments').innerHTML=result;
			removeTextFromInput("category_first");
			$('.lodingLogin').css("display", "none");
		})
		.fail(function(err)
		{
			alert(err);
		});
	});
});

//make
$(document).ready(function(){
	$("#make_button").on('click',function(event) 
	{	
		event.preventDefault();
		event.stopPropagation();
		var data={new:{"category": $('#make_form select[name="category_second"]').val(), "make":$("#make_form input[name=make]").val()}};
        //console.log(JSON.stringify(data));
		$.ajax({
			beforeSend: function(){
				$('.lodingLogin').css("display", "inline");
			},
			url:"/admin/create-make",
			type:"POST",
			contentType:"application/json",
			data:JSON.stringify(data)
		}).done(function(result){
			removeTextFromInput("make_frist");
			$('.lodingLogin').css("display", "none");
		})
		.fail(function(err)
		{
			alert(err);
		});
	});
});

//model
$(document).ready(function(){
	$("#model_button").on('click',function(event) 
	{	
		event.preventDefault();
		event.stopPropagation();
		var data={new:{"category": $('#model_form select[name="category_third"]').val(), "make":$('#model_form select[name="make_third"]').val(),"model":$("#model_form input[name=model]").val()}};
        //console.log(JSON.stringify(data));
		$.ajax({
			beforeSend: function(){
				$('.lodingLogin').css("display", "inline");
			},
			url:"/admin/create-model",
			type:"POST",
			contentType:"application/json",
			data:JSON.stringify(data)
		}).done(function(result){
			removeTextFromInput("model_forth");
			$('.lodingLogin').css("display", "none");
		})
		.fail(function(err)
		{
			alert(err);
		});
	});
});

//year
$(document).ready(function(){
	$("#year_button").on('click',function(event) 
	{	
		event.preventDefault();
		event.stopPropagation();
		var data={new:{"model":$('#year_form select[name="model_forth"]').val(),"year":$("#year_form input[name=year]").val()}};
        //console.log(JSON.stringify(data));
		$.ajax({
			beforeSend: function(){
				$('.lodingLogin').css("display", "inline");
			},
			url:"/admin/create-year",
			type:"POST",
			contentType:"application/json",
			data:JSON.stringify(data)
		}).done(function(result){
			removeTextFromInput("year_forth");
			$('.lodingLogin').css("display", "none");
		})
		.fail(function(err)
		{
			alert(err);
		});
	});
});

//trim
$(document).ready(function(){
	$("#trim_button").on('click',function(event) 
	{	
		event.preventDefault();
		event.stopPropagation();
		var data={new:{"year":$('#trim_form select[name="year_forth"]').val(),"trim":$("#trim_form input[name=trim]").val()}};
        //console.log(JSON.stringify(data));
		$.ajax({
			beforeSend: function(){
				$('.lodingLogin').css("display", "inline");
			},
			url:"/admin/create-trim",
			type:"POST",
			contentType:"application/json",
			data:JSON.stringify(data)
		}).done(function(result){
			removeTextFromInput("trim_forth");
			$('.lodingLogin').css("display", "none");
		})
		.fail(function(err)
		{
			alert(err);
		});
	});
});

//retrive category
$(document).ready(function(){
	$("#retrieve-btn-make").on('click',function(event) {	
        $.get(
            "/admin/retrieve_category"
        ).done(data => {
            let html = '<option value="" disabled selected>Select</option>';
            for(i=0;i<data.data.length;i++){
                html += '<option value="'+ data.data[i].text +'">'+ data.data[i].text +'</option>';
            }
            $('#allCategory').html(html);
        });
    });
});

//retrive category for model
$(document).ready(function(){
	$("#retrieve-btn-model").on('click',function(event) {	
        $.get(
            "/admin/retrieve_category"
        ).done(data => {
            let html = '<option value="" disabled selected>Select</option>';
            for(i=0;i<data.data.length;i++){
                html += '<option value="'+ data.data[i].text +'">'+ data.data[i].text +'</option>';
            }
            $('#allCategorymodel').html(html);
        });
    });
});

//select category for finding value in make
function selectCategory(value) {
	$.get(
		"/admin/retrieve_make",{
			'categoryName': value
		}
	).done(data => {
		let html = '';
		data.foundMake.make.forEach(function(allMake){
			html += '<option value="'+ allMake.text +'">'+ allMake.text +'</option>';
		});
		$('#allMake').html(html);
	});
}


//year

//retrive category for year
$(document).ready(function(){
	$("#retrieve-btn-year").on('click',function(event) {	
        $.get(
            "/admin/retrieve_category"
        ).done(data => {
            let html = '<option value="" disabled selected>Select</option>';
            for(i=0;i<data.data.length;i++){
                html += '<option value="'+ data.data[i].text +'">'+ data.data[i].text +'</option>';
            }
            $('#allCategoryear').html(html);
        });
    });
});

//select category for finding value in make
function selectCategoryyear(value) {
	$.get(
		"/admin/retrieve_make",{
			'categoryName': value
		}
	).done(data => {
		let html = '<option value="" disabled selected>Select</option>';
		data.foundMake.make.forEach(function(allMake){
			html += '<option value="'+ allMake.text +'">'+ allMake.text +'</option>';
		});
		$('#allMakeyear').html(html);
	});
}

//select make for finding value in made
function selectMakeyear(value) {
	$.get(
		"/admin/retrieve_model",{
			'makeName': value
		}
	).done(data => {
		let html = '<option value="" disabled selected>Select</option>';
		data.foundMade.model.forEach(function(allMade){
			html += '<option value="'+ allMade.text +'">'+ allMade.text +'</option>';
		});
		$('#allMadeyear').html(html);
	});
}

//trim

//retrive category for trim
$(document).ready(function(){
	$("#retrieve-btn-trim").on('click',function(event) {	
        $.get(
            "/admin/retrieve_category"
        ).done(data => {
            let html = '<option value="" disabled selected>Select</option>';
            for(i=0;i<data.data.length;i++){
                html += '<option value="'+ data.data[i].text +'">'+ data.data[i].text +'</option>';
            }
            $('#allCategortrim').html(html);
        });
    });
});

//select category for finding value in make
function selectCategorytrim(value) {
	$.get(
		"/admin/retrieve_make",{
			'categoryName': value
		}
	).done(data => {
		let html = '<option value="" disabled selected>Select</option>';
		data.foundMake.make.forEach(function(allMake){
			html += '<option value="'+ allMake.text +'">'+ allMake.text +'</option>';
		});
		$('#allMaketrim').html(html);
	});
}

//select make for finding value in made
function selectMaketrim(value) {
	$.get(
		"/admin/retrieve_model",{
			'makeName': value
		}
	).done(data => {
		let html = '<option value="" disabled selected>Select</option>';
		data.foundMade.model.forEach(function(allMade){
			html += '<option value="'+ allMade.text +'">'+ allMade.text +'</option>';
		});
		$('#allMadetrim').html(html);
	});
}

//select model for finding value in year
function selectModeltrim(value) {
	$.get(
		"/admin/retrieve_year",{
			'modelName': value
		}
	).done(data => {
		let html = '<option value="" disabled selected>Select</option>';
		data.foundYear.year.forEach(function(allYear){
			html += '<option value="'+ allYear.text +'">'+ allYear.text +'</option>';
		});
		$('#allModeltrim').html(html);
	});
}

//select year for finding value in trim
function selectYeartrim(value) {
	$.get(
		"/admin/retrieve_trim",{
			'yearName': value
		}
	).done(data => {
		let html = '<option value="" disabled selected>Select</option>';
		data.foundTrim.trim.forEach(function(allTrim){
			html += '<option value="'+ allTrim.text +'">'+ allTrim.text +'</option>';
		});
		$('#allYeartrim').html(html);
	});
}


//add section
$(document).ready(function(){
	//console.log("hi");
	$.get(
		"/admin/retrieve_category"
	).done(data => {
		let html = '<option value="" disabled selected>Select</option>';
		for(i=0;i<data.data.length;i++){
			html += '<option value="'+ data.data[i].text +'">'+ data.data[i].text +'</option>';
		}
		$('#allCategortrimAdd').html(html);
	});
});

