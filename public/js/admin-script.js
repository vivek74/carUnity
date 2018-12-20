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

//retrive category

$(document).ready(function(){
	$("#retrieve-btn-make").on('click',function(event) {	
        $.get(
            "/admin/retrieve_category"
        ).done(data => {
            let html = '';
            for(i=0;i<data.data.length;i++){
                html += '<option value="'+ data.data[i].text +'" selected>'+ data.data[i].text +'</option>';
            }
            $('#allCategory').html(html);
        });
    });
});

