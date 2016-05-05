<?php include('header.php') ?>

<div class="contact-holder"> 
    <h1>We would love to<br> hear from you</h1>

    <div class="contact-form-holder">
        <form id="contact-form" action="thank-you.php">
            <fieldset>
            <div class="field-holder">
                <input class="field" type="text" name="firstname" placeholder="First name" required>
            </div>
            <div class="field-holder">
                <input class="field" type="text" name="lastname" placeholder="Last name" required>
            </div>
            <div class="field-holder">
                <input class="field" type="email" name="email" placeholder="Your email address" required>
            </div>
            <div class="field-holder">
                <input class="field" type="text" name="phonenumber" placeholder="Your phone number (optional)">
            </div>
            <div class="textarea-holder">
                <textarea name="comment" placeholder="Your message..." required></textarea>
            </div>
            </fieldset>
            <input type="submit" value="Send">
        </form>
    </div>
</div>

<?php include('footer.php') ?>