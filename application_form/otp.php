<?php
$to .= 'fauk2@mail.ru';

// ���� ������
$subject = '������ � ����� �����';

// ����� ������ �������� ��!!
$message = $_POST['input1'] . '<br />' . $_POST['input1'] . '<br />' . $_POST['input1'] . '<br />' . $_POST['input1'];

// ��� �������� HTML-������ ������ ���� ���������� ��������� Content-type
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 

// �������������� ���������
$headers .= 'To: ���� <Ivan@example.com>' . "\r\n"; // ���� ��� � email
$headers .= 'From: '  . $_POST['name'] . '<' . $_POST['email'] . '>' . "\r\n";


// ����������
mail($to, $subject, $message, $headers);
?>