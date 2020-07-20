var editor = ace.edit( "editor_1" );
        var editor2 = ace.edit( "editor_2" );
        var vertical_dragging = false;
        var horizontal_dragging = false;
        
        // If using WordPress uncomment line below as we have to
        // 32px for admin bar, minus 1px to center in 2px slider bar
        // wpoffset = 31;

        editor.setTheme("ace/theme/monokai");
        // inline must be true to syntax highlight PHP without opening <?php tag
        editor.getSession().setMode( { path: "ace/mode/php", inline: true } );

        // enable autocompletion and snippets
        editor.setOptions( {
            enableBasicAutocompletion: true,
            enableSnippets           : true,
            enableLiveAutocompletion : false
        } );

        $( '#horizontal_dragbar' ).mousedown( function ( e ) {
            e.preventDefault();
            window.vertical_dragging = true;

            var editor_1 = $( '#editor_1' );
            
            var top_offset = editor_1.offset().top;

            // handle mouse movement
            $( document ).mousemove( function ( e ) {

                var actualY = e.pageY;
                // editor height
                var eheight = actualY - top_offset;
                
                eheight = Math.min( eheight, 382);
                // Set wrapper height
                $( '#editor_1' ).css( 'height', eheight - 5);
                $( '#editor_1_wrap' ).css( 'height', eheight);

                // Set dragbar opacity while dragging (set to 0 to not show)
                $( '#horizontal_dragbar' ).css( 'opacity', 0.15 );

            } );

        } );
        
        $( '#vertical_dragbar' ).mousedown( function ( e ) {
            e.preventDefault();
            window.horizontal_dragging = true;

            var editor_1 = $( '#editor_1' );
            var left_offset = editor_1.offset().left;


            // handle mouse movement
            $( document ).mousemove( function ( e ) {

                var actualX = e.pageX;
                // editor height
                var ewidth = actualX - left_offset;

                // Set wrapper height
                $( '#editor_bars_wrapper' ).css( 'width', ewidth);
                $('#editor_2').css('width', $('#multiple_editor_wrapper').width() - ewidth);

                // Set dragbar opacity while dragging (set to 0 to not show)
                $( '#vertical_dragbar' ).css( 'opacity', 0.15 );

            } );

        } );

        //YUSUF's DEBUGGING AUXILIARY
        document.onmousemove = function(e){
            var x = e.pageX;
            var y = e.pageY;
            e.target.title = "X is "+x+" and Y is "+y;
        };
        
        //
        $( document ).mouseup( function ( e ) {

            if( window .vertical_dragging || window.horizontal_dragging) {
                var editor_1 = $( '#editor_1' );
                $( '#horizontal_dragbar' ).css( 'opacity', 1 );
                $( '#vertical_dragbar' ).css( 'opacity', 1 );
                $( document ).unbind( 'mousemove' );
            }

        } );