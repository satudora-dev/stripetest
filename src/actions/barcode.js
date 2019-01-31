import {fireStore} from '../firebase';
import JsBarcode from 'jsbarcode';
const barcodeLogRef = fireStore.collection('barcode_log');

export const generateOTBarcode = (cuid,prime, generated) => dispatch => {
  if(generated) return JsBarcode('#barcode',generated);

  const gen_time = new Date().getTime();
  const status = prime && prime.status === "active"  ?  "p" : "f" ;
  const newBarcode =  cuid + '-' + status + '-' + gen_time;

  JsBarcode('#barcode',newBarcode);
  barcodeLogRef.doc(cuid).set({gen_time:gen_time});
  return dispatch({
    type: 'GENERATE_BARCODE',
    barcode: newBarcode
  })
}

export const eraseBarcode = () => dispatch => {
  const Barcode = document.getElementById("barcode");
  if(Barcode) Barcode.remove();
  return dispatch({
    type: 'ERASE_BARCODE',
    barcode: null
  })
}
