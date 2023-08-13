const cheerio = require("cheerio");

const html = `<!DOCTYPE html>
<head>
    <title>:: CSS :: SISTEMA DE SOLICITUD DE CITAS::</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="assets/css/main.css" />
  <!--<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">-->

  <!--[if lt IE 9]><script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
  <!--<link rel="icon" href="images/favicon.ico" type="image/x-icon">-->
  <!--<link rel="stylesheet" href="css/login.css">-->
</head>
<body>
  <div class="login">
    <p align="center"><img src="imagen/logo1.png"></p>
                                <p align="center"><font color="#0F28D9" size="+1">SU SOLICITUD DE CITA HA SIDO REGISTRADA... <br><br>NUESTROS OPERADORES SE PONDRÁN EN CONTACTO CON USTED, UNA VEZ SE LE ASIGNE EL DÍA Y HORA DE SU CITA<br><br> PARA SEGUIMIENTO, ANOTE EL SIGUIENTE NÚMERO:</font> <strong><font size="+2">6542211707</font></strong></p>
          <p align="center"><font color="#E10F12" size="+2"></font></p>
                <p class="submit" align="center"><a href="salir.php">REGRESAR</a></p>
  </div>
<script defer src="https://static.cloudflareinsights.com/beacon.min.js/v8b253dfea2ab4077af8c6f58422dfbfd1689876627854" integrity="sha512-bjgnUKX4azu3dLTVtie9u6TKqgx29RBwfj3QXYt5EKfWM/9hPSAI/4qcV5NACjwAo8UtTeWefx6Zq5PHcMm7Tg==" data-cf-beacon='{"rayId":"7f62b8a6d9791a52","version":"2023.8.0","b":1,"token":"90537fab295f41aa96f4270c9c09d744","si":100}' crossorigin="anonymous"></script>
</body>
</html>`; // Paste your HTML content here

// Load the HTML content into Cheerio

// export {specs_added, form_data, headers, integrants, urls};

// ?select=cod_espe&opcion={opcion} //
// ?select=cod_medico&opcion={form_data['cod_espe']}"
