/** *************Angular controller JS*********************/
"use strict";
app.controller("ContactController", function($scope, $http) {
  $scope.result = "hidden";
  $scope.resultMessage;
  $scope.formData; //formData is an object holding the name, email, subject, and message
  $scope.submitButtonDisabled = false;
  $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
  $scope.submit = function(contactform, e) {

    e.preventDefault();

    if (contactform.$valid) {
      document.getElementById("preloader").style.display = "flex";
      document.getElementById("loader").style.display = "block";
      var email = contactform.inputEmail.$modelValue;
      var name = contactform.inputName.$modelValue;
      var msg = contactform.inputMessage.$modelValue;

      emailjs
        .send("default_service", "template_M08pHiMl_clone", {
          name: name,
          email: email,
          msg: msg
        })
        .then(
          function(response) {
            console.log(
              "SUCCESS. status=%d, text=%s",
              response.status,
              response.text
            );
            document.getElementById("msgSent").style.display = "block";
            document.getElementById("preloader").style.display = "none";
            document.getElementById("loader").style.display = "none";
          },
          function(err) {
            console.log("FAILED. error=", err);
            document.getElementById("msgError").style.display = "block";
            document.getElementById("preloader").style.display = "none";
            document.getElementById("loader").style.display = "none";
          }
        );
    }
    // if (contactform.$valid) {
    //   $http({
    //     method: "POST",
    //     url: "contact-form.php",
    //     data: $.param($scope.formData), //param method from jQuery
    //     headers: { "Content-Type": "application/x-www-form-urlencoded" } //set the headers so angular passing info as form data (not request payload)
    //   }).success(function(data) {
    //     console.log(data);
    //     if (data.success) {
    //       //success comes from the return json object
    //       $scope.submitButtonDisabled = false;
    //       $scope.formData = null;
    //       $scope.resultMessage = data.message;
    //       $scope.result = "bg-success";
    //     } else {
    //       $scope.submitButtonDisabled = false;
    //       $scope.resultMessage = data.message;
    //       $scope.result = "bg-danger";
    //     }
    //   });
    // } else {
    //   $scope.submitButtonDisabled = false;
    //   $scope.resultMessage = "Failed :( Please fill out all the fields.";
    //   $scope.result = "bg-danger";
    // }
  };
});
