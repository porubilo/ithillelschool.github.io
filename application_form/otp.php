<?php
$to .= 'fauk2@mail.ru';

// тема письма
$subject = 'Письмо с моего сайта';

// текст письма меняется он!!
$message = $_POST['input1'] . '<br />' . $_POST['input1'] . '<br />' . $_POST['input1'] . '<br />' . $_POST['input1'];

// Для отправки HTML-письма должен быть установлен заголовок Content-type
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 

// Дополнительные заголовки
$headers .= 'To: Иван <Ivan@example.com>' . "\r\n"; // Свое имя и email
$headers .= 'From: '  . $_POST['name'] . '<' . $_POST['email'] . '>' . "\r\n";


// Отправляем
mail($to, $subject, $message, $headers);
?>