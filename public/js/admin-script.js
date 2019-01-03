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


var removeTextFromInput1 = function(input1, input2, input3, input4){
	var removeThis1 = document.getElementById(input1);
	removeThis1.value = "";
	var removeThis2 = document.getElementById(input2);
	removeThis2.value = "";
	var removeThis3 = document.getElementById(input3);
	removeThis3.value = "";
	var removeThis4 = document.getElementById(input4);
	removeThis4.value = "";
};

//testimoniyal_form
$(document).ready(function(){
	$("#testimonial").on('click',function(event) 
	{	
		event.preventDefault();
		event.stopPropagation();
		var data={"firstname":$("#firstNameT").val(),"lastname":$("#lastNameT").val(), "emailid":$("#emailT").val(), "blog":$("#blogT").val()};
		$.ajax({
			beforeSend: function(){
				$('.lodingLogin').css("display", "inline");
			},
			url:"/admin/testimonial-create",
			type:"POST",
			contentType:"application/json",
			data:JSON.stringify(data)
		}).done(function(result){
			removeTextFromInput1("firstNameT", "lastNameT", "emailT", "blogT");
			$('.lodingLogin').css("display", "none");
		})
		.fail(function(err)
		{
			alert(err);
		});
	});
});

//retrive testimonial
$(document).ready(function(){
	$("#testimonial_button").on('click',function(event) {	
        $.get(
            "/admin/show-testimonial"
        ).done(data => {
			let html = '';
			var i=0; data.data.forEach(function(allTestimonial){
				html += '<div id="delDiv'+i+'" class="card card-2" style="padding:1em; margin-top:1em; background-color: #fafafa;"><h5 style="margin:0;">'+ allTestimonial.firstName + allTestimonial.lastName +'</h5><p style="margin:0;">'+ allTestimonial.emailId +'</p><p>'+ allTestimonial.text +'</p> <button type="button" class="btn btn-warning btn-sm" style="padding:4px;font-size:12px;" onclick="deleteT('+i+' , \'' + allTestimonial._id +'\')">Delete </button></div>';
				i++; });
			$('#showing_testimonial').html(html);
        });
    });
});

//delete div by jquary
function deleteT(data,id) {
	$('#delDiv'+ data).click(function () {
		$(this).hide(500, function () {
			$(this).remove();
		});
	});
	$.get(
		"/admin/remove-testimonial/"+id
	)
}

//get car detail (buy car)
$(document).ready(function(){
	$('.loader-card').css("display", "inline");
	$.get(
		"/get-car-data"
	).done(data => {
		$('.loader-card').css("display", "none");
		let html = '';
		data.data.forEach(function(allCar){
			html += '<div class="col-md-4 text-center"><div class="product-entry"><div class="product-img" style="background-image: url('+allCar.carImage1+');"><div class="cart"><p><span><a href="/view_details/'+ allCar._id +'"><i class="icon-eye"></i></a></span> </p></div></div><div class="desc"><h3><a>'+allCar.model+'</a></h3><p class="price"><span>Rs '+allCar.price+'</span></p></div></div></div>';
		});
		$('#getCars').html(html);
	});
});

//get modified detail
function getModified(category, make, model, year, trim){
	if(category){
		$('.loader-card').css("display", "inline");
		$.get(
			"/get-car-data-category/"+category
		).done(data => {
			$('.loader-card').css("display", "none");
			let html = '';
			data.data.forEach(function(allCar){
				html += '<div class="col-md-4 text-center"><div class="product-entry"><div class="product-img" style="background-image: url('+allCar.carImage1+');"><div class="cart"><p><span><a href="/view_details/'+ allCar._id +'"><i class="icon-eye"></i></a></span> </p></div></div><div class="desc"><h3><a>'+allCar.model+'</a></h3><p class="price"><span>Rs '+allCar.price+'</span></p></div></div></div>';
			});
			$('#getCars').html(html);
		});
	}else if(make){
		$('.loader-card').css("display", "inline");
		$.get(
			"/get-car-data-make/"+make
		).done(data => {
			$('.loader-card').css("display", "none");
			let html = '';
			data.data.forEach(function(allCar){
				html += '<div class="col-md-4 text-center"><div class="product-entry"><div class="product-img" style="background-image: url('+allCar.carImage1+');"><div class="cart"><p><span><a href="/view_details/'+ allCar._id +'"><i class="icon-eye"></i></a></span> </p></div></div><div class="desc"><h3><a>'+allCar.model+'</a></h3><p class="price"><span>Rs '+allCar.price+'</span></p></div></div></div>';
			});
			$('#getCars').html(html);
		});
	}else if(model){
		$('.loader-card').css("display", "inline");
		$.get(
			"/get-car-data-model/"+model
		).done(data => {
			$('.loader-card').css("display", "none");
			let html = '';
			data.data.forEach(function(allCar){
				html += '<div class="col-md-4 text-center"><div class="product-entry"><div class="product-img" style="background-image: url('+allCar.carImage1+');"><div class="cart"><p><span><a href="/view_details/'+ allCar._id +'"><i class="icon-eye"></i></a></span> </p></div></div><div class="desc"><h3><a>'+allCar.model+'</a></h3><p class="price"><span>Rs '+allCar.price+'</span></p></div></div></div>';
			});
			$('#getCars').html(html);
		});
	}else if(year){
		$('.loader-card').css("display", "inline");
		$.get(
			"/get-car-data-year/"+year
		).done(data => {
			$('.loader-card').css("display", "none");
			let html = '';
			data.data.forEach(function(allCar){
				html += '<div class="col-md-4 text-center"><div class="product-entry"><div class="product-img" style="background-image: url('+allCar.carImage1+');"><div class="cart"><p><span><a href="/view_details/'+ allCar._id +'"><i class="icon-eye"></i></a></span> </p></div></div><div class="desc"><h3><a>'+allCar.model+'</a></h3><p class="price"><span>Rs '+allCar.price+'</span></p></div></div></div>';
			});
			$('#getCars').html(html);
		});
	}else if(trim){
		$('.loader-card').css("display", "inline");
		$.get(
			"/get-car-data-trim/"+trim
		).done(data => {
			$('.loader-card').css("display", "none");
			let html = '';
			data.data.forEach(function(allCar){
				html += '<div class="col-md-4 text-center"><div class="product-entry"><div class="product-img" style="background-image: url('+allCar.carImage1+');"><div class="cart"><p><span><a href="/view_details/'+ allCar._id +'"><i class="icon-eye"></i></a></span> </p></div></div><div class="desc"><h3><a>'+allCar.model+'</a></h3><p class="price"><span>Rs '+allCar.price+'</span></p></div></div></div>';
			});
			$('#getCars').html(html);
		});
	}
}

//querry
$(document).ready(function(){
	$("#queries_button").on('click',function(event) 
	{	
		event.preventDefault();
		event.stopPropagation();
		var data={"name":$("#nameQ").val(),"email":$("#emailQ").val(), "phone":$("#phoneQ").val(), "address":$("#addressQ").val(), "carName":$("#carNameQ").val(), "purpose":$("#purposeQ").val()};
		//console.log(JSON.stringify(data));
		$.ajax({
			beforeSend: function(){
				$('.lodingLogin').css("display", "inline");
			},
			url:"/admin/new-queries",
			type:"POST",
			contentType:"application/json",
			data:JSON.stringify(data)
		}).done(function(result){
			removeQuerie("nameQ", "emailQ", "phoneQ", "addressQ");
			$('.lodingLogin').css("display", "none");
				
			$("#contact_hide").show();
			$("#contact_form_hide").hide();
		})
		.fail(function(err)
		{
			alert(err);
		});
	});
});

//clear textbox querie
var removeQuerie = function(input1, input2 , input3, input4,){
	var removeThis1 = document.getElementById(input1);
	removeThis1.value = "";
	var removeThis2 = document.getElementById(input2);
	removeThis2.value = "";
	var removeThis1 = document.getElementById(input3);
	removeThis1.value = "";
	var removeThis2 = document.getElementById(input4);
	removeThis2.value = "";
};

//retrive query
$(document).ready(function(){
	$("#querie_button").on('click',function(event) {
		$('.loader-card').css("display", "inline");	
        $.get(
            "/admin/get-querries"
        ).done(data => {
			$('.loader-card').css("display", "none");
			let html = '';
			var i=0; data.data.forEach(function(allQuerie){
				html += '<div id="delDivQ'+i+'" class="card card-2" style="padding:1em; margin-top:1em; background-color: #fafafa;"><h5 style="margin:0;">Name - '+ allQuerie.name +'</h5><p style="margin:0;">Email - '+ allQuerie.email +'</p><p style="margin:0;">Phone - '+ allQuerie.phone +'</p><p style="margin:0;">Address - '+ allQuerie.address +'</p><p style="margin:0;">Purpose - '+ allQuerie.purpose +'</p><p class="under" onclick="carDetailQ('+i+' ,\'' + allQuerie.carName +'\')" style="margin:0;cursor:pointer; color:black;font-weight:bold;">Show Car details</p><img style="display:none;" class="loader-card'+i+'" src="/images/loader.gif"  /><div id="showing_car_details'+i+'"> </div><button type="button" class="btn btn-warning btn-sm" style="padding:4px;font-size:12px; margin-top:1em;" onclick="deleteQ('+i+' , \'' + allQuerie._id +'\')">Delete </button></div>';
				i++; });
			$('#showing_querie').html(html);
        });
    });
});

//delete div by jquary
function deleteQ(data,id) {
	$('#delDivQ'+ data).click(function () {
		$(this).hide(500, function () {
			$(this).remove();
		});
	});
	$.get(
		"/admin/delete-querries/"+id
	)
}


function carDetailQ(id,data){
	$('.loader-card'+id).css("display", "inline");	
        $.get(
            "/get-car-data/"+data
        ).done(data => {
			$('.loader-card'+id).css("display", "none");
			let html = '<div class="card card-2" style="padding:1em;"><div class="row"><div class="col-md-6"><img style="width: 100%;" src="'+data.data.carImage1+'"  /></div><div class="col-md-6"><p style="font-weight:bold;margin:0;">Catergory : '+data.data.catergory+'</p><p style="font-weight:bold;margin:0;">Make : '+data.data.make+'</p><p style="font-weight:bold;margin:0;">Model : '+data.model+'</p><p style="font-weight:bold;margin:0;">Year : '+data.year+'</p><p style="font-weight:bold;margin:0;">Trim : '+data.data.trim+'</p><p style="font-weight:bold;margin:0;">Kilometers Driven : '+data.data.kilometersDriven+' KM</p><p style="font-weight:bold;margin:0;">Vehicle RegNo : '+data.data.vehicleRegNo+'</p></div></div></div>';
			$('#showing_car_details'+id).html(html);
			
    });
}

//queir for user
$.get(
	"/admin/get-querries"
).done(data => {

	let html = '';
	var i=0; data.data.forEach(function(allQuerie){
		html += '<p style="font-weight:bold;margin:0;">Q1. '+allQuerie.question+'</p><p>Ans. '+allQuerie.answer+'</p>';
		i++; });
		
	$('#showing_querie_user').html(html);
});


//hide and unhide contact page

$(document).ready(function(){
    $("#contact_hide").hide();
});

