<?php
require_once __DIR__ . "/php/config.php";
include DIR_UTIL . "sessionUtil.php";
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="author" content="Arfaioli">
    <meta name="robots" content="noindex">
    <meta name="keywords" content="game">
    <title>Terms of Service</title>
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
        <h1>Privacy Policies</h1>
        <hr>
        <h2>What This Privacy Policy Covers</h2>
        <p>
            This Privacy Policy covers our treatment of information gathered
            when you are using or accessing the Services. This Privacy Policy also
            covers our treatment of any information about you that our partners
            share with us or that we share with our partners.
        </p>
        <p>
            This Privacy Policy does not apply to the practices of third parties
            that we do not own, control, or manage, including but not limited
            to any third party websites, services, applications, or businesses
            (“<strong>Third Party Services</strong>”). While we try to work only with those
            Third Party Services that share our respect for your privacy,
            we don't take responsibility for the content or privacy policies
            of those Third Party Services. We encourage you to carefully review
            the privacy policies of all Third Party Services you access.
        </p>
        <hr>
        <h2>What We Collect and How We Use It</h2>
        <p>
            <strong>Account Information</strong>: When you create an account
            on the Services (an "Account"), we’ll ask you for information such
            as your username, password, age, and email address (“Account Information”).
            We may use Account Information, alone or together with other information,
            to enhance and improve the Services, such as by personalization.
            We use your age to verify that you can lawfully use the Services.
            We use your email address to verify your Account and to communicate with you,
            as described in more detail below.
        </p>
        <p>
            <strong>Email Communications with Us</strong>: As part of the Services,
            you may occasionally receive email and other communications from us.
            Administrative communications relating to your Account
            (e.g., for purposes of Account recovery or password reset) are considered
            part of the Services and your Account. Usually, we send two kinds of email:
            ones about fun stuff happening on Tumblr, and ones with important information about your account.
            You can opt out of the former, but not the latter.
            <strong>Note that we will <u>never</u> email
                you to ask for your password or other Account Information;
                if you receive such an email, please forward it to us.</strong>
        </p>
        <hr>
        <h2>The Security of Your Information</h2>
        <p>
            Your Account Information is protected by a password for your privacy and security.
            You need to prevent unauthorized access to your Account and information
            by creating a unique, secure, and protected password and limiting access
            to your computer and browser by signing off after you have finished accessing
            your Account on the Services.
        </p>
        <p>
            We seek to protect your information (including your Account Information)
            to ensure that it is kept private; however, we can't guarantee
            the security of any information. Unauthorized entry or use,
            hardware or software failure, and other factors may compromise
            the security of user information at any time.
        </p>
        <hr>
        <h2>What Information You Can Access</h2>
        <p>
            If you are a registered user, you can access most information associated
            with your Account by logging into the Services and checking your Account Settings page.
        </p>
        <hr>
        <h2>Changes to This Privacy Policy</h2>
        <p>
            We may amend this Privacy Policy from time to time, using the process
            for modifications set forth in our Terms of Service. Use of information
            we collect is subject to the Privacy Policy in effect at the time such
            information is collected.
        </p>
    </div>
</section>
<?php
include DIR_LAYOUT . "footer.php";
?>
</body>

