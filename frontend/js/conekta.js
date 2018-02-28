
  Conekta.setPublicKey('key_B1sbpnsQWqyq2v5GCfE7V9g');

  var conektaSuccessResponseHandler = function(token) {
    var $form = $("#card-form");
    //Inserta el token_id en la forma para que se envíe al servidor
     $form.append($('<input type="hidden" name="conektaTokenId" id="conektaTokenId">').val(token.id));
    //$form.get(0).submit(); //Hace submit
    console.log(token.id)
    $.ajax({
      url: 'http://localhost:3032/conekta/tarjeta',
      data: {token:token.id},
      type: 'POST',
      dataType: 'json',
      error: function() {
        console.log('error')
      },
      success: function(data) {
         console.log(data)
         alert(data.payment_status)
      }
    });
  };
  var conektaErrorResponseHandler = function(response) {
    var $form = $("#card-form");
    $form.find(".card-errors").text(response.message_to_purchaser);
    $form.find("button").prop("disabled", false);
  };

  //jQuery para que genere el token después de dar click en submit
  $(function () {
    $("#card-form").submit(function(event) {
      var $form = $(this);
      // Previene hacer submit más de una vez
      $form.find("button").prop("disabled", true);
      Conekta.Token.create($form, conektaSuccessResponseHandler, conektaErrorResponseHandler);
      return false;
    });
  });