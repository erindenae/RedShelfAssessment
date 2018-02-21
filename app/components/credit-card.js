import Ember from 'ember';

export default Ember.Component.extend({

  setCurrentDate: Ember.on('init', function(){
    //override `today` property for integration tests
    if (!this.get("today")) {
      this.set('today', new Date());
    }
  }),

  today: null,
  card: null,
  classNames: ['credit-card', 'text-left'],

  //binds class name of 'is-expire' when the `isExpired` property is true.
  classNameBindings: ["isExpired"],

  //returns true if `card` is expired, otherwise returns false.
  isExpired: Ember.computed("card.expirationMonth", "card.expirationYear", function() {
    let card = this.get("card");
    let today = this.get("today");

    //compare expiration year
      if(card.expirationYear > today.getFullYear()) {
        //console.log('not expired');
        return false;
      }
      else if(card.expirationYear < today.getFullYear()) {
        //console.log('card IS expired');
        return true;
      }

    //compare expiration month for expirations in the current year
      else {

        if (card.expirationMonth > today.getMonth()) {
          //console.log('month compared, card is not expired.');
          return false;
        }
        else{
         //console.log('month compared, card IS expired.'); 
         return true;
        }
      }
  })
/*

  exampleCard: {
    type: "Visa",
    accountNumber: 1234567890123456,
    name: "Jeremy Smith",
    expirationMonth: "12",
    expirationYear: "2016"
  },

*/

});
