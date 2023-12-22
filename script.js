// Name: Bhavya Sree Pannem
// Gnum: G01413450
//Function to scroll to the top of the page
function scrollToTop() {
    // Scroll to the top of the page with smooth animation
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show the scroll-to-top button when the user scrolls down
window.onscroll = function () {
    showScrollButton();
};

function showScrollButton() {
    var scrollToTopButton = document.getElementById("scrollToTopButton");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
}


//Validations for required fields
$(document).ready(function () {
    // Add an event handler for the form submission
    $("form").submit(function (event) {
        event.preventDefault(); // Prevent the form from submitting

        var name = $("#username").val();
        var streetAddress = $("#streetAddress").val();
        var zip = $("#zip").val();
        var city = $("#city").val();
        var state = $("#state").val();
        var email = $("#email").val();
        var numbers = $("#data").val();
        var regex = /^(\d+(\.\d+)?,){9}\d+(\.\d+)?$/;
        var likedAboutCampus = $("input[name='likedAboutCampus[]']:checked").length;
        var interestSource = $("input[name='interestSource']:checked").length;

        var isValid = true;
        var errorMessage = "";

        // Name should contain only alphabets
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            isValid = false;
            errorMessage += "Name should contain only alphabets.\n";
        }

        // Address should contain only appropriate characters
        if (!/^[a-zA-Z0-9\s,]+$/.test(streetAddress)) {
            isValid = false;
            errorMessage += "Address should contain only appropriate characters.\n";
        }

        // Validate at least two checkboxes are checked
        if (likedAboutCampus < 2) {
            isValid = false;
            errorMessage += "Please check at least two checkboxes in 'Liked Most About Campus'.\n";
        }

        // Validate a radio button option is selected
        if (interestSource === 0) {
            isValid = false;
            errorMessage += "Please select an option in 'How did you become interested in the university?'.\n";
        }

        // Validate email format
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            isValid = false;
            errorMessage += "Please enter a valid email address.\n";
        }
        //Validate data for 10 numbers as input
        if(!regex.test(numbers)){
            isValid = false;
            errorMessage+= "Please enter 10 numbers as input.\n";
        }

        if (isValid) {
            // Form is valid, submit it
            this.submit();
        } else {
            // Show alert with error message
            alert(errorMessage);
        }
    });

    // Add an event handler for the reset button
    $("#resetButton").click(function () {
        // Reset all form fields
        $("form")[0].reset();
    });
});

// Function to toggle section visibility
function toggleSection(sectionId) {
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].id === sectionId) {
            sections[i].style.display = 'block';
        } else {
            sections[i].style.display = 'none';
        }
    }
}

function populateCityState() {
    var zip = document.getElementById("zip").value;
    
    // Load the JSON data
    fetch('zipcodes.json')
        .then(response => response.json())
        .then(data => {
            var cityState = data.zipcodes.find(item => item.zip === zip);
            if (cityState) {
                document.getElementById("city").value = cityState.city;
                document.getElementById("state").value = cityState.state;
            } else {
                alert("Invalid Zip Code");
            }
        })
        .catch(error => console.error('Error:', error));
}



// Functionality for average and maximum
$(document).ready(function () {
    $("#data").on("blur", function () {
        var inputData = $(this).val().split(",");
        var total = 0;
        var max = 0;
        var validInput = true;

        if (inputData.length === 10) {
            for (var i = 0; i < inputData.length; i++) {
                var num = parseInt(inputData[i]);

                if (isNaN(num) || num < 1 || num > 100) {
                    validInput = false;
                    break;
                }

                total += num;

                if (num > max) {
                    max = num;
                }
            }

            if (validInput) {
                var average = total / inputData.length;
                $("#average").val("Average: " + average.toFixed(2));
                $("#maximum").val("Maximum: " + max);
            } else {
                $("#average").val("Invalid input");
                $("#maximum").val("Invalid input");
            }
        } else {
            $("#average").val("Please enter 10 numbers");
            $("#maximum").val("Please enter 10 numbers");
        }
    });
});