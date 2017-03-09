console.log('JS Wagwan');
$(() => {

  const $form = $('.tesco');
  let searchArray = [];
  $form.on('submit', getIngredients);
  $form.on('change', '.searchDropdown', grabIngredient);

  function grabIngredient(e) {
    e.preventDefault();
    const ingredient = $('.searchDropdown').val();
    console.log('this is the chosen option:', $('.searchDropdown').val());
    console.log('clicked on ingredient');

    const ingredientData = searchArray.find((item) => {
      return item.name === ingredient;
    });
    
    $('input[name="mainSpirit[name]"]').val(ingredientData.name);
    $('input[name="mainSpirit[image]"]').val(ingredientData.image);
    $('input[name="mainSpirit[price]"]').val(ingredientData.price);

  }

  function getIngredients(e) {
    e.preventDefault();
    const query = $form.find('input').val();
    makeAjaxCall(query);
  }

  function makeAjaxCall(query) {
    $.ajax({
      url: `https://dev.tescolabs.com/grocery/products/?query=${query}&offset=0&limit=10`,
      beforeSend: function(xhrObj){
        xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key','d508764b9e3146b5a3978b7b68811a45');
      },
      type: 'GET'
    })
    .then(function(data) {
      console.log(data);
      searchArray = data.uk.ghs.products.results;
      $('.searchDropdown').remove();
      $form.append(`<select class="searchDropdown" style="display:none;">
        <option disabled selected>Please choose</option>
      </select>`);
      $.each((searchArray), (i) => {
        $('.searchDropdown').append(`<option>${searchArray[i].name}</option>`).fadeIn();
      });

    })
    .fail(function(error) {
      console.log(error);
    });
  }

});
