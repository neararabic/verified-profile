

const GAS = 100000000000000;
const Deposit = 100000000000000;

export function isAccountVerified({accountID}) {
  return window.contract.isAccountVerified({ accountID });
}

export  function createProfile() {
  console.log(window.contract);
  window.contract.createProfile().then((d)=>{
    console.log(d );
  });

  return "window.contract.createProfile(); "
}

export async function verifyAccount({accountID,verification}){
  await window.contract.verifyAccount({accountID, verification}, GAS,Deposit); 
}