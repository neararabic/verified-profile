const GAS = 100000000000000;
export function isAccountVerified({accountID}) {
  return window.contract.isAccountVerified({ accountID });
}

export function createProfile() {
  return window.contract.createProfile(); 
}

export async function verifyAccount({accountID,verification}){
  await window.contract.verifyAccount({accountID, verification}, GAS); 
}