'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.token);
const currency = 'USD';
admin.initializeApp(functions.config().firebase);

exports.createStripeCustomer = functions.auth.user().onCreate( (user) => {
  return stripe.customers.create({description: user.uid}).then(customer => {
    return admin.firestore().collection('stripe_customers').doc(user.uid).set({customer_id: customer.id});
  });
});

exports.addPaymentSource = functions.firestore.document('/stripe_customers/{userId}/tokens/{pushId}').onCreate(async (snap, context) => {
  const source = snap.data();
  const token = source.token;
  if (source === null){
    return null;
  }


  const snapshot = await admin.firestore().collection('stripe_customers').doc(context.params.userId).get();
  const customer =  snapshot.data().customer_id;
  const response = await stripe.customers.createSource(customer, {source: token});
  return admin.firestore().collection('stripe_customers').doc(context.params.userId).collection("sources").doc(response.fingerprint).set(response, {merge: true});
});

exports.createStripeCharge = functions.firestore
    .document('stripe_customers/{userId}/charges/{id}')
    .onCreate(async (snap, context) => {
    const val = snap.data();
    const snapshot = await admin.firestore()
    .collection(`stripe_customers`)
    .doc(context.params.userId).get();

    const snapval = snapshot.data();
    const customer = snapval.customer_id;
    const amount = val.amount;
    const description = val.description;
    const idempotencyKey = context.params.id;
    const charge = {amount, currency, customer, description};
    if (val.source !== null) {
       charge.source = val.source;
    }
    const response = await stripe.charges
        .create(charge, {idempotency_key: idempotencyKey});
    // If the result is successful, write it back to the database
    return snap.ref.set(response, { merge: true });
});

exports.createStripeSubscription = functions.firestore
  .document('stripe_customers/{userId}/prime/{id}')
  .onCreate(async (snap, context) => {
    const snapshot = await admin.firestore()
    .collection(`stripe_customers`)
    .doc(context.params.userId).get();
    const snapval = snapshot.data();
    const customer = snapval.customer_id;
    const response = await stripe.subscriptions.create({
      customer: customer,
      items: [
        {
          plan: "plan_EJvVXXyL9vr2f9",
        },
      ]
    });
    return snap.ref.set(response, { merge: true });
});
exports.createStripeRefund = functions.firestore
  .document('stripe_customers/{userId}/refunds/{id}')
  .onCreate(async (snap, context) => {
    const val = snap.data();
    const chargeId = val.chargeId;
    const snapshot = await admin.firestore()
    .collection(`stripe_customers`)
    .doc(context.params.userId).get();
    const snapval = snapshot.data();
    const customer = snapval.customer_id;
    const response = await stripe.refunds.create({charge: chargeId});
    await snap.ref.set(response, { merge: true });
    const refunded_charge = await stripe.charges.retrieve(chargeId);
    const chargeRef = admin.firestore().collection(`stripe_customers`).doc(context.params.userId).collection("charges")
    return chargeRef.where("id", "==", chargeId).get().then( (querySnapshot) => {
      querySnapshot.forEach((chargeDoc) => {
        chargeRef.doc(chargeDoc.id).update(refunded_charge);
      })
    })
});
