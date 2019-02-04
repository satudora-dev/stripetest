
// stripe.customers.create({description: "user.uid"},function(err, subscription) {
//     console.log(err)
//     console.log(subscription)
//   })
const childProcess = require('child_process');
childProcess.exec('npm i', (error, stdout, stderr) => {
  if(error) {
    // エラー時は標準エラー出力を表示して終了
    console.log(stderr);
    return;
  }
  else {
    // 成功時は標準出力を表示して終了
    console.log(stdout);
  }
});

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
