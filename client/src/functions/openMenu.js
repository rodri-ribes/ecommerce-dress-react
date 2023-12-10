export default function openMenu (setMenu, menu, action, obj, modal){
  // setMenu(prev => ({
  //   ...prev,
  //   menu,
  //   action,
  //   obj,
  //   modal
  // }))
  setMenu({menu,action,obj, modal})
  };