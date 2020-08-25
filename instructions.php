<?php
    require_once __DIR__ . "/php/config.php";
    include DIR_UTIL . "sessionUtil.php";
    session_start();
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8">
    <meta name="author" content="Arfaioli">
    <meta name="robots" content="noindex">
    <meta name="keywords" content="game">
    <title>Istruzioni</title>
    <link id="page_favicon" href="./img/favicon.ico" rel="icon" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="css/layout.css">
    <link rel="stylesheet" type="text/css" href="css/pages.css">
</head>
<body>
<?php
    include DIR_LAYOUT . "header.php";
?>
<section class="terms_privacy_content">
    <div>
    <a href="index.php"><img class="home-button" src="img/home.png" alt="home"></a>
    <h1>Istruzioni per giocare</h1>
    <p>Al primo avvio il giocatore si trover&agrave; dinanzi ad una schermata di login dov'&egrave; possibile accedere con il proprio account esistente o registrarsi come nuovo utente tramite l'apposito link. </p>
    <p>Una volta effettuato il login l'utente potr&agrave; scegliere tra tre modalit&agrave; di gioco:
    <ol>
        <li>Modalit&agrave; classica</li>
        <li>Modalit&agrave; difficile</li>
        <li>Modalit&agrave; multiplayer</li>
    </ol>
    </p>
    <p>
        La modalit&agrave; classica rispetta le regole classiche del tetris:
    </p>
    <p>I vari pezzi del gioco di Tetris si chiamano tetramini, ciascuno composto da quattro blocchi. I tetramini cadono gi&ugrave; uno alla volta e il compito del giocatore &egrave; ruotarli e/o muoverli in modo che creino una riga orizzontale di blocchi senza interruzioni. Non appena una riga &egrave; completata, i mattoni spariscono e i pezzi sovrastanti (se presenti) cadono a formare nuove linee. </p>
    <p>All'inizio del gioco il giocatore si trova al livello 0, dopo che questi avrà completato un certo numero di linee, avanzerà di livello. All'aumentare dei livelli aumenta anche la velocità con cui i tetramini cadono a terra.</p>
    <p>Per ogni riga completata al giocatore vengono assegnati dei punti. Il punteggio viene calcolato in base al numero di righe completate in un sol colpo e in funzione del livello a cui si trova il giocatore.</p>
    <p>La modalit&agrave; difficile segue il funzionamento della modalità classica, ma, ad intervalli di 20 secondi, viene aggiunta una linea incompleta alla base dell'area di gioco.</p>
    <p>Al termine della partita il punteggio viene salvato e viene mostrata la classifica dei migliori 15 punteggi.</p>
    <p>La modalit&agrave; multiplayer invece permette di sfidare altri giocatori: cliccando sul tasto multiplayer il giocatore viene portato in una lobby, dove può scegliere se unirsi ad una partita gi&agrave; creata oppure creare una nuova partita ed attendere che un altro giocatere si unisca alla partita.</p>
    <p>Nel gioco multiplayer ogni volta che uno dei due giocatori completa una linea causa un restringimento dell'area di gioco dell'avversario.</p>
    <p>Quando uno dei due giocatori perde la partita viene interrotta e viene decretato il vincitore.</p>
    </div>
    <hr>
    <div id="commands">
    <h2>Comandi</h2>
    <p>
        I seguenti tasti permettono di interagire con il tetramino attivo:
    </p>
    <dl>
        <dt>ctrl</dt><dd>Il tetramino ruota di 90° in senso antiorario</dd>
        <dt>Freccia in alto</dt><dd>Il tetramino ruota di 90° in senso orario.</dd>
        <dt>Freccia sinistra</dt><dd>Il tetramino si muove di una casella a sinistra</dd>
        <dt>Freccia destra</dt><dd>il tetramino si muove di una casella a destra</dd>
        <dt>freccia in basso</dt><dd>il tetramino si muove di una casella verso il basso</dd>
        <dt>barra spaziatrice</dt><dd>il tetramino cade instantaneamente verso il basso</dd>
    </dl>
    </div>
    </section>
<?php
include DIR_LAYOUT . "footer.php";
?>
</body>
</html>