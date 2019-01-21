var stripe = require("stripe")("sk_test_9aXfMKxJRLeAlFKg7epTGby4");

stripe.customers.create({description: "user.uid"},function(err, subscription) {
    console.log(err)
    console.log(subscription)
  })

//
// console.log(stripe.products.create({
//   name: 'Satudora Prime',
//   type: 'service',
// },function(err, subscription) {
//     console.log(err)
//     console.log(subscription)
//   }))


// stripe.plans.create({
//   product: 'prod_EJvRZmhMXJQIT5',
//   nickname: 'Satudora Prime',
//   currency: 'usd',
//   interval: 'month',
//   amount: 1000,
// },function(err, subscription) {
//     console.log(err)
//     console.log(subscription)
// });


stripe.subscriptions.create({
  customer: "cus_ELPyhqmgkR21Xa",
  items: [
    {
      plan: "plan_EJvVXXyL9vr2f9",
    },
  ]
}, function(err, subscription) {
    console.log(err)
    console.log(subscription)
  }
);
