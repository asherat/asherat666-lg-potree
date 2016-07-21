		    // Create SocketIO instance, connect
		    var socket = io.connect('/manager');

		    // Add a connect listener
		    socket.on('connect',function() {
		      console.log('Client has connected to the server!');
		    });

		    // Add a disconnect listener
		    socket.on('disconnect',function() {
		      console.log('The client has disconnected!');
		    });

		    // Sends a message to the server via sockets
		    function sendMessageToServer(message) {
		      socket.emit('changeData',message);
		    };



			function getCPFiles(){
				socket.emit('getCPDirs');
			}

			$( document ).ready(function() {
			    getCPFiles();
			});

			socket.on( 'CPDir', function( data ) {
				data = data.sort();
			    var content = $( "#cpFiles" ).html();
			    for (i = 0; i < data.length; i++) { 
			    	var newMsgContent = '<li><img src="../resources/pointclouds/' + data[i] + '/preview.png"' +
			    	'onerror="this.onerror=null;this.src=\'../resources/images/logo.png\';" ' +
					'onclick="sendMessageToServer(\'' + data[i] + '\')" />' +
						'<h3>'+ data[i] +'</h3></li>';

				    content = content + newMsgContent; 
				    
				}
				$( "#cpFiles" ).html( content );
			});