export function checkPrivilege(processId, actionid) {
  // this function accepts proces(like page name) id and the id of the action on that page
  const userRole = JSON.parse(localStorage.getItem('role'));
 // compares it with the role and priviledges of the logged in user

return userRole.privilege.find(prev=>prev.processId===processId)?.action?.find(act=>act===actionid)

}