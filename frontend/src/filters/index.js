//compter les elements dans un tableau 
export function count(tab) {
    return tab.length
}

// verifier la validité des mails  
export function validMail(value) {
    var regEmail = /^((\[^<>()\[\]\\.,;:\s@"]+(\.\[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var state;
    if(!(regEmail.test(value))){
        state = false;
    } else {
        state = true;
    }
    return state;
  }

  // Verifier les mots de passe 
  export function validPassword(value){
    var regPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,24}$/;
    var state;
    if(!(regPwd.test(value))){
        state = false;
    }else{
        state = true;
    }
    return state;
  }