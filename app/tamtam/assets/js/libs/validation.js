;(function($) {
    'use strict';

    //Add regular expression method
    $.validator.addMethod('regex', function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    });

    // Add custom email method
    $.validator.addMethod('myemail', function(value, element) {
        return this.optional( element ) || /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(value);
    });

    $.validator.setDefaults({
        errorElement: 'span',
        errorClass: 'error',
        validClass: 'valid',
        ignore: '.ignore',

        /**
         * Places the error message
         *
         * @param {Object} error
         * @param {Object} element
         */
        errorPlacement: function(error, element){
            var type = element.attr('type');
            var tagName = element.prop("tagName");
            // If true place the error outside the parent element
            if (type === 'radio' || tagName === 'SELECT') {
                error.appendTo(element.parent().parent());
            } else {
                error.appendTo(element.parent());
            }
        },

        /**
         * This callback is triggered for an invalid value.
         *
         * @param {Object} element
         */
        highlight: function(element, error_class, valid_class){
            var $element  = $(element);
            $element.removeClass(valid_class);

            if ($element.is('input[type=file]')) {
                $element.parent().find('.file-name').removeClass('valid-file');
                $element.parent().find('.file-name').addClass('error-file');
            } else {
                // add error class
                $element.addClass(error_class);
            }
        },

        /**
         * This callback is triggered for a valid value.
         *
         * @param {Object} element
         */
        unhighlight: function(element, error_class, valid_class) {
            var $element  = $(element);
            $element.removeClass(error_class);
            
            if ($element.is('input[type=file]')) {
                $element.parent().find('.file-name').removeClass('error-file');
                $element.parent().find('.file-name').addClass('valid-file');
            } else {
                // remove error class
                $element.addClass(valid_class);
            }

            // Find all form elements and add class is-valid if they are valid
            // All fields have to be checked in case autofill is being used
            $element.find('input').map(function() {
                var $self = $(this);

                if ($self.hasClass('user-success'))
                    $self.parent().addClass('valid');
            });
        }
    });

    //Form validation objects
    var required = {
        required: true,
    };

    var email = {
        required: true,
        myemail: true
    };

    // Validate apply form
    var $applyForm = $('#contact-form');

    var apply_validator = $applyForm.validate({
        rules: {
            firstname: required,
            lastname: required,
            email: email,
        },
        messages: {
            firstname: {
                required: 'We need your first name.'
            },
            lastname: {
                required: 'We need your last name.'
            },
            email: {
                required: 'We need your email address.'
            },
            comment: {
                required: 'Sorry, your message can’t be empty.',
            },

        }
    });

    // Default validation messages
    $.extend(jQuery.validator.messages, {
        required: 'Dit veld moet nog worden ingevuld',
        email: 'Please use a valid email address.',
        myemail: 'Please use a valid e-mail address.',
        number: 'Vul hier alleen cijfers in',
        maxlength: jQuery.validator.format('Maximaal {0} karakters'),
        minlength: jQuery.validator.format('Vul minimaal {0} karakters in')
    });

})(jQuery);