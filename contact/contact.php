<?php
/*
Credits: Bit Repository
URL: http://www.bitrepository.com/
*/

require_once '../lib/swift_required.php';

error_reporting (E_ALL ^ E_NOTICE);

$post = (!empty($_POST)) ? true : false;

if($post) {

    // Enter the email where you want to receive the message
    $emailTo = 'contact@inglobe.com.ar';

    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);

      $error = '';



      if(!$error)
      {
      $transport = Swift_SmtpTransport::newInstance('smtp.live.com',587,'tls')
                   ->setUsername('robot@inglobe.com.ar')
                   ->setPassword('laoficina2016');
       
        //Creamos el mailer pasándole el transport con la configuración de gmail
          $mailer = Swift_Mailer::newInstance($transport);
          
        $body = ('Nombre: ' . $name . ' <br/><br/> ' . 'Email: ' . $email . ' <br/><br/> ' . 'Mensaje: ' . $message);
        
        //Creamos el mensaje
          $message1 = Swift_Message::newInstance("Correo WEB")
                  ->setFrom($email)
                  ->setTo($emailTo)
                  ->setBody($body)
                  ->setContentType('text/html');
       
        //Enviamos
          $result = $mailer->send($message1);


      if($result)
      {
      echo 'OK';
      }

      }
  }

   



/*
include 'config.php';

error_reporting (E_ALL ^ E_NOTICE);

$post = (!empty($_POST)) ? true : false;

if($post)
{

$name = stripslashes($_POST['name']);
$email = trim($_POST['email']);
$subject = stripslashes($_POST['subject']);
$message = stripslashes($_POST['message']);


$error = '';



if(!$error)
{
$mail = mail(WEBMASTER_EMAIL, $subject, $message,
     "From: ".$name." <".$email.">\r\n"
    ."Reply-To: ".$email."\r\n"
    ."X-Mailer: PHP/" . phpversion());


if($mail)
{
echo 'OK';
}

}


}*/

?>

