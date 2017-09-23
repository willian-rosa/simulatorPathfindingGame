<!doctype html>
<html >
    <head>

        <meta charset="UTF-8">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        
        <style>
            body{
                background-color: #c0d4df;
            }
            .content{
                width: 90%;
                margin: 50px auto;
            }
            .cel{
                background-color: #fff;
                border-right: 3px solid #f5f5f5;
                border-bottom: 3px solid #f5f5f5;
                height: 25px;
                text-align: center;
                width: 35px;
            }
            .cel-arvore{
                width: 150px;
            }
            .la-cel{
               background-color: #ef6522;
               width: 50px;
            }
            .col-ma{
               background-color: #ff8; 
            }
            .row-ma{
               background-color: #ef6522; 
            }
            .col-mi{
               width: 50px;
               background-color: #ff8;  
            }
            .input-interface{
                width: 80px;
            }
            #painel-interface{
                height: 600px; 
            }
            #content-interface{
                float: left;
                width: 900px;
                height: 600px;
                border-right: 1px solid #c0d4df;
            }
            #content-interface .btn{
                margin-top: 15px;
            }
             .clear{
                clear: both;
            }
            .controllers{
                background-color: #fff;
                width: 75px;
                height: 600px;
                display: inline-block;
            }
        </style>
        <title>Simulador de Inteligência Artificial</title>
        <script src="three.min.js"></script>


        <script src="js/DDSLoader.js"></script>
        <script src="js/MTLLoader.js"></script>
        <script src="js/OBJLoader.js"></script>
    </head>
    <body>

      <div class="content">
          
        <div class="well">
            <h1>Simulador de Inteligência Artificial</h1>
                <div class="well">                   
                    <div id="painel-interface">
                       <div id="content-interface"></div> 
                       <div class="controllers">
                           <button type="button" onclick="ativarEstadoMover()">Mover</button>
                           <button type="button"  onclick="ativarEstadoCriacaoMuro()">+ Muro</button>
                           <button type="button"   onclick="ativarEstadoCriacaoGuerreiro()">+ Guereiro</button>
                       </div>
                    </div>
                </div>
            </div>
      </div>
        <script src="game.js"></script>
        <script src="configure.js"></script>
        <script src="init.js"></script>
        <script src="render_animate.js"></script>
        <script src="interface.js"></script>


        <script type="text/javascript">
            init();
            //animate();
        </script>


    </body>
</html>