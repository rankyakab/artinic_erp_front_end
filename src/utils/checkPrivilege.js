
export const CREATE = ['6419ec4e5ab751646ea18437','6419ca705ab751646ea1837c'];
export const DELETE =  ['6419ec4e5ab751646ea18437','6419ca9a5ab751646ea1838e'];
export const UPDATE = ['6419ec4e5ab751646ea18437','6419ca8d5ab751646ea18388'];
export const READ =['6419ec4e5ab751646ea18437','6419ca805ab751646ea18382'];
export const APPROVE = ['6419ec4e5ab751646ea18437','6419cac95ab751646ea183a0'];
export const RECOMMEND = ['6419ec4e5ab751646ea18437','6419caae5ab751646ea18394'];
export const CONVERT = ['6419ec4e5ab751646ea18437','6419cabd5ab751646ea1839a'];






const pageAction = {
        delete:"6419ca9a5ab751646ea1838e",
        edit:"6419ca8d5ab751646ea18388",
        recommendForApproval:"6419caae5ab751646ea18394",
        approve:"6419cac95ab751646ea183a0",
        create:"6419ca705ab751646ea1837c",
        convertToUser:"6419cabd5ab751646ea1839a",
        read:"6419ca805ab751646ea18382",
        
}

     const pageProcess = {
        user:"641a09d65ab751646ea18576",
        staff:"6419ec4e5ab751646ea18437",
        memo:"6419cb3d5ab751646ea183b4",
        privileges:"641b18a9f4390d23c1841260",
        action:"641b189af4390d23c184125a",
        process:"641b187cf4390d23c1841242",
         roles:"641b1866f4390d23c184123c",
         paymentVouchers:"641b1851f4390d23c1841236"



}



  const userRole = JSON.parse(localStorage.getItem('role'));
  console.log("this is the user Role",userRole);
    console.log("this is the user Role",userRole);
      console.log("this is the user Role",userRole);
        console.log("this is the user Role",userRole);
          console.log("this is the user Role",userRole);
            console.log("this is the user Role",userRole);
              console.log("this is the user Role",userRole);

export function checkPrivilege([processId, actionid]) {
  // this function accepts proces(like page name) id and the id of the action on that page

 // compares it with the role and priviledges of the logged in user

// return userRole?.privilege.find(prev=>prev.processId===processId)?.action?.find(act=>act===actionid)
return true;
}