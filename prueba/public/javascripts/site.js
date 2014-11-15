$(function($) {
	// vemos el evento de teclado sobre el campo de texto nickname y verificamos si el usuario a presionado ENTER
	//y que no este vacio 
	var socket=io();
	$("#nickname").keydown(function(event){
		if(event.keyCode==13 && $(this).val()!="")
		{
			
			socket.emit("setnickname",{"nick":$(this).val()});
		}
	});

	socket.on("setnickname",function(response){
		if(response.server===true)
		{
			//en caso de que el nick este disponible accedemos
			//al sistema de chat para ello llamaremos al metodo
			//loadhtml que definiremos mas abajo
			loadhtml("/saladechat/");
			$("#nickname").attr('disabled','true');

		}else{
			alert(response.server)
		}
	})
	var loadhtml=function(url)
	{
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'html',
			data: {},
		})
		.done(function(html){
			$("#content").html(html);
			enabledchat();
		})
		.fail(function(){

		})
		.always(function(){

		});
	}
	var enabledchat=function()
	{
		$("#menvio").keydown(function(event){
			if(event.keyCode==13)
			{
				socket.emit("mensajes",{"nick":$("#nickname").val(),"msn":$(this).val()})
				$(this).val("");
			}
		});
	}

	socket.on("mensajes",function(response){
		console.log(response);
		$("#mensajes").append("<li>"+response.nick+">"+response.msn+"</li>")
	});
});
