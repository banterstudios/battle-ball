GAME_HANDLER = {
	API:'http://christmas.vitaminlondon.com/api15',
	REGISTER:'/register.php',
	LOGIN:'/login.php',
	LOGOUT:'/logout.php',
	SUBMIT:'/submit.php',
	GETSCORE:'/read_scores.php',
	FORGOTPASSWORD:'/forgot.php',
	SETPASS:'/pass_setup.php',
	CALL:{
		GET:function(params, callback){
		    $.ajax({
		      url:GAME_HANDLER.API + params.url,
		      method: "GET",
		      dataType: "json",
		      success: function(response){
		       
		        try{
		          var obj;

		          if(typeof(response)==='object'){
		            obj = response;
		          }else{
		            response = JSON.stringify(response);
		            obj = JSON.parse(response);
		          }
		          callback({d:'success', response:obj});
		        }catch(e){
		          
		        }
		      },
		      complete:function(response){
		      	
		      },
		      error: function(xhr, statusText , err) {
		        if(xhr.status >= 400){
		          callback({d:'error', response:xhr.responseText});
		          
		          return;
		        }
		        callback({d:'genericerror', response:xhr.responseText});
		        
		      }
		    });
		},
		POST:function(params, callback){
		    $.ajax({
		      url:GAME_HANDLER.API + params.url,
		      method: "POST",
		      dataType: "json",
		      data:JSON.stringify(params.data),
		      success: function(response){
		        try{
		          var obj;

		          if(typeof(response)==='object'){
		            obj = response;
		          }else{
		            response = JSON.stringify(response);
		            obj = JSON.parse(response);
		          }
		     
		          callback({d:'success', response:obj});
		        }catch(e){
		          
		        }
		      },
		      complete:function(response){
		      },
		      error: function(xhr, statusText , err) { 
		      	
		      	if(xhr.responseText === 'sess_absent'){ if(window.localStorage)window.localStorage.removeItem('token'); isLoggedIn=false;};
		        if(xhr.status >= 400){
		          callback({d:'error', response:xhr.responseText});
		         
		          return;
		        }
		        callback({d:'genericerror', response:xhr.responseText});
		        
		      }
		    }); 
		}
	}
};


GAME_HANDLER.Login=function(){

	if(!validateEmail($('.login-email').val())){
		$('.l-email').text('Invalid email').addClass('invalid');	
		 return false; 
	}


	if(!validatePassword($('.login-password').val())){ 
		$('.l-password').text('Invalid password').addClass('invalid');	
		 return false; 
	}

	$('.l-email, .l-password').removeClass('invalid');

	var data = {'email':$('.login-email').val(), 'passwd':$('.login-password').val()};
	GAME_HANDLER.CALL.POST({url:GAME_HANDLER.LOGIN, data:data}, function(e){
 		if(typeof(e.response) !== 'undefined'){
			if(typeof(e.response.type) !== 'undefined'){
				if(e.response.type === 'ErrorException'){
					GAME_HANDLER.Logout();
					
					return;
				}

				if(e.response.type === 'Exception'){
					if(e.response.d === 'no_session'){
						GAME_HANDLER.Logout();
						
						return;
					}
				}
			}
		};

		if(e.d === 'success'){
			if(window.localStorage){ window.localStorage.setItem('token',e.response);  }

			$('.login-email, .login-password').val('');

			isLoggedIn = true;

			if(postScore)GAME_HANDLER.PostScore();

			if(game.currentMenu){ game.currentMenu.changeMenu(g_Menus['home']); return; }
			g_Menus['home'].On();
			
			return;
		};

		//logout
		if(e.response === 'not_found'){ $('.l-email').text('Email not found').addClass('invalid'); $('.l-password').text('Invalid password').addClass('invalid'); }

		

	});
};

GAME_HANDLER.Register=function(){
	if(!validateEmail($('.register-email').val())){
		$('.r-email').text('Invalid email').addClass('invalid');	 
		 return false; 
	}
	
	if(!validateName($('.register-nickname').val())){ 
		$('.r-username').text('Min 2 characters, max 10 characters').addClass('invalid');	 
		 return false; 
	}

	if(!validatePassword($('.register-password').val())){
		$('.r-password').text('Minimum 6 characters, 1 uppercase and 1 number').addClass('invalid');	 
		 return false; 
	}

	$('.r-email, .r-password, .r-username').removeClass('invalid');

	var data = {'uname':$('.register-nickname').val(),'email':$('.register-email').val(), 'passwd':$('.register-password').val()};
	GAME_HANDLER.CALL.POST({url:GAME_HANDLER.REGISTER, data:data}, function(e){
 		if(typeof(e.response) !== 'undefined'){
			if(typeof(e.response.type) !== 'undefined'){
				if(e.response.type === 'ErrorException'){
					GAME_HANDLER.Logout();
					
					return;
				}

				if(e.response.type === 'Exception'){
					if(e.response.d === 'no_session'){
						GAME_HANDLER.Logout();
						
						return;
					}
				}
			}
		};

		if(e.d === 'success'){
			
			$('.login-email').val($('.register-email').val());
			$('.register-email, .register-password, .register-nickname').val('');
			if(game.currentMenu&&game.currentMenu.name === 'loginandregister'){ MainMenu.switchScreenToLogin(); return; }else
			if(game.currentMenu){ game.currentMenu.changeMenu(g_Menus['home']); return; }
			//if(game.currentMenu){ game.currentMenu.changeMenu(g_Menus['loginandregister']); return; }
			g_Menus['home'].On();
			return;
		};

		//logout
		if(e.response === 'email_uniq'){ $('.r-email').text('Email in use').addClass('invalid'); }else
		if(e.response === 'uname_uniq'){ $('.r-username').text('Username in use').addClass('invalid'); }else
		if(e.response === 'uname_syntax'){ $('.r-username').text('No spaces or special characters').addClass('invalid'); }

		

	});
};

GAME_HANDLER.Logout=function(){
	
	if(!window.localStorage || !window.localStorage.getItem('token')){return false; }

	var data = {'sess':window.localStorage.getItem('token')};

	GAME_HANDLER.CALL.POST({url:GAME_HANDLER.LOGOUT, data:data}, function(e){
 		if(typeof(e.response) !== 'undefined'){
			if(typeof(e.response.type) !== 'undefined'){
				if(e.response.type === 'ErrorException'){
					//logout
					
					return;
				}

				if(e.response.type === 'Exception'){
					if(e.response.d === 'no_session'){
						//logout
						
						return;
					}
				}
			}
		};

		$('input').val('');

		if(e.d === 'success'){
			
			window.localStorage.removeItem('token');
			isLoggedIn = false;
			postScore = false;
			if(game.currentMenu){ game.currentMenu.changeMenu(g_Menus['home']); return; }
			g_Menus['home'].On();
			return;
		};

		//logout

		

	});
};


GAME_HANDLER.GetScore=function(){
	
	
	var token = window.localStorage.getItem('token');
	var data = token ? {'sess':token} : {};

	GAME_HANDLER.CALL.POST({url:GAME_HANDLER.GETSCORE, data:data}, function(e){
 		if(typeof(e.response) !== 'undefined'){
			if(typeof(e.response.type) !== 'undefined'){
				if(e.response.type === 'ErrorException'){
					//logout
					GAME_HANDLER.Logout();
					
					return;
				}

				if(e.response.type === 'Exception'){
					if(e.response.d === 'no_session'){
						GAME_HANDLER.Logout();
						
						return;
					}
				}
			}
		};

		if(e.d === 'success'){
			
			$('article.menu > section.leaderboards > div.table > div.bottom > ul > li').remove();
			if(e.response.length <= 1){ return; }

			
			
			e.response.shift();

			e.response.sort(function(a, b) {
			    return a[1] - b[1];
			});

			e.response.reverse();

			var li = '';
			for(var i=0,len=e.response.length; i<len; i++){
				li = '<li> #' + (i+1) + '_ ' + e.response[i][1] + ' ' + e.response[i][0] + '</li>';
				$('article.menu > section.leaderboards > div.table > div.bottom > ul').append($(li));
			};

			return;
		};

		//logout

		

	});
};

GAME_HANDLER.PostScore=function(){
	if(!g_Player || !g_Player.distance){ return false;}
	if(!window.localStorage || !window.localStorage.getItem('token')){ return false; }

	var data = {'sess':window.localStorage.getItem('token'), 'score':g_Player.distance};

	GAME_HANDLER.CALL.POST({url:GAME_HANDLER.SUBMIT, data:data}, function(e){
 		if(typeof(e.response) !== 'undefined'){
			if(typeof(e.response.type) !== 'undefined'){
				if(e.response.type === 'ErrorException'){
					//logout
					
					return;
				}

				if(e.response.type === 'Exception'){
					if(e.response.d === 'no_session'){
						//logout
						
						return;
					}
				}
			}
		};

		if(e.d === 'success'){
			
			return;
		};

		//logout

		

	});
};

