<!-- header -->
<div class="header">
  <div class="container">
    <div class="w3layouts_logo">
      <a href="index.php"><h1>SVA<span>Cine</span></h1></a>
    </div>
    <div class="w3_search">
      <form action="#" method="post">
        <input type="text" name="Search" placeholder="Buscar" required="">
        <input type="submit" value="Ir">
      </form>
    </div>
    <div class="w3l_sign_in_register">
      <ul>
        <li><i class="fa fa-phone" aria-hidden="true"></i> (+34) 651 40 55 55</li>
        <li><a href="#" data-toggle="modal" data-target="#myModal">Login</a></li>
      </ul>
    </div>
    <div class="clearfix"> </div>
  </div>
</div>
<!-- //header -->
<!-- bootstrap-pop-up -->
<div class="modal video-modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        Login & Registro
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <section>
        <div class="modal-body">
          <div class="w3_login_module">
            <div class="module form-module">
              <div class="toggle"><i class="fa fa-times fa-pencil"></i>
                <div class="tooltip">Haz click</div>
              </div>
              <div class="form">
                <h3>Login to your account</h3>
                <form action="#" method="post">
                  <input type="text" name="Username" placeholder="Username" required="">
                  <input type="password" name="Password" placeholder="Password" required="">
                  <input type="submit" value="Login">
                </form>
              </div>
              <div class="form">
                <h3>Create an account</h3>
                <form action="#" method="post">
                  <input type="text" name="Username" placeholder="Username" required="">
                  <input type="password" name="Password" placeholder="Password" required="">
                  <input type="email" name="Email" placeholder="Email Address" required="">
                  <input type="text" name="Phone" placeholder="Phone Number" required="">
                  <input type="submit" value="Register">
                </form>
              </div>
              <div class="cta"><a href="#">Forgot your password?</a></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>

<!-- //bootstrap-pop-up -->
<!-- nav -->
<div class="movies_nav">
  <div class="container">
    <nav class="navbar navbar-default">
      <div class="navbar-header navbar-left">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse navbar-right" id="bs-example-navbar-collapse-1">
        <nav>
          <ul class="nav navbar-nav">
            <li class="w3_home_act active"><a href="index.php">Inicio</a></li>
            <li><a href="actores.php">Actores</a></li>
            <li><a href="directores.php">Directores</a></li>
            <li><a href="actuaciones.php">Actuaciones</a></li>
            <li><a href="list.html">Lista A - Z</a></li>
          </ul>
        </nav>
      </div>
    </nav>
  </div>
</div>
<!-- //nav -->
<div class="general_social_icons">
  <nav class="social">
    <ul>
      <li class="w3_twitter"><a href="#">Twitter <i class="fa fa-twitter"></i></a></li>
      <li class="w3_facebook"><a href="#">Facebook <i class="fa fa-facebook"></i></a></li>
      <li class="w3_dribbble"><a href="#">Dribbble <i class="fa fa-dribbble"></i></a></li>
      <li class="w3_g_plus"><a href="#">Google+ <i class="fa fa-google-plus"></i></a></li>
    </ul>
  </nav>
</div>
