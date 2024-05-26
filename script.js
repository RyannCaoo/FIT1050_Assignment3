// add classes for mobile navigation toggling
var CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

CShamburgerMenu.addEventListener('click', function() {
    CShamburgerMenu.classList.toggle("cs-active");
    CSnavbarMenu.classList.toggle("cs-active");
    CSbody.classList.toggle("cs-open");
    // run the function to check the aria-expanded value
    ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not 
function ariaExpanded() {
    const csUL = document.querySelector('#cs-expanded');
    const csExpanded = csUL.getAttribute('aria-expanded');

    if (csExpanded === 'false') {
        csUL.setAttribute('aria-expanded', 'true');
    } else {
        csUL.setAttribute('aria-expanded', 'false');
    }
}

// This script adds a class to the body after scrolling 100px
// and we used these body.scroll styles to create some on scroll 
// animations with the navbar

document.addEventListener('scroll', (e) => { 
    const scroll = document.documentElement.scrollTop;
    if(scroll >= 100){
document.querySelector('body').classList.add('scroll')
    } else {
    document.querySelector('body').classList.remove('scroll')
    }
});


// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
    for (const item of dropDowns) {
        const onClick = () => {
        item.classList.toggle('cs-active')
    }
    item.addEventListener('click', onClick)
    }


const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
        for (const item of faqItems) {
            const onClick = () => {
            item.classList.toggle('active')
        }
        item.addEventListener('click', onClick)
        }
                  
        

// hide the navigation bar when user scrolling down
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("cs-navigation").style = "0px";
    } else {
        document.getElementById("cs-navigation").style.top = "-100px"; /* adjust this value to the height of your header */
    }
    prevScrollpos = currentScrollPos;
}

// form validation
$(document).ready(function() {
    var form = $("#cs-form-1150");
    form.validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                phoneValidation: true
            }
        },
        messages: {
            phone: {
                phoneValidation: "Please enter a valid phone number"
            }
        },
        highlight: function(element) {
            $(element).closest('.cs-label');
        },
        unhighlight: function(element) {
            $(element).closest('.cs-label');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
    });

    // Custom phone number validation method
    $.validator.addMethod("phoneValidation", function(value, element) {
        return this.optional(element) || /^\d{10}$/.test(value); 
    }, "Please enter a 10-digit phone number");
});
    

$(document).ready(function() {
    var form = $("#cs-form-1150");
    var progress_bar = $('.progress-bar');
    var progressBar_val = parseInt(progress_bar.attr('aria-valuenow')); // initial value of progress
    var validator = form.validate();

    $("form input:text").on('input', function(){ // on every input text events change
        updateProgressBar();
    });
    
    function updateProgressBar() {
        var validFields = form.find("input:text").filter(function() {
            return validator.element(this);
        }).length;

        progressBar_val = Math.ceil((validFields / form.find("input:text").length) * 100);

        progress_bar.css({'width' : progressBar_val + '%'}).attr('aria-valuenow', progressBar_val);
        progress_bar.find('.sr-only').html(progressBar_val + '%');

        if(progressBar_val >= 100){
            progress_bar.addClass('progress-bar-success');
        } else {
            progress_bar.removeClass('progress-bar-success');
        }
    }
});