exports.validatePassword = (password)=>{


    /*    CLEAN VERSION     */
    const validateLength = password.length>6
    let hasLowerLetter = /[a-z]/g.test(password);
    let hasUpperLetter = /[A-Z]/g.test(password);
    let hasNumber = /[0-9]/g.test(password);;
    return hasLowerLetter && hasUpperLetter && hasNumber && validateLength;

    /*  UNCLEAN   */
    /* const validateLength = password.length>6
        let hasLowerLetter = false;
        let hasUpperLetter = false;
        let hasNumber = false;
        const lowerAlphabet = 'abcdefghijklmnpkorstquwvyz'
        const upperAlphabet = 'ABCDEFJHIGKLMNPKORSTUVWXYZ'
        const numbers='0123456789'
        for(const alphabet of lowerAlphabet){
            if(password.includes(alphabet)) hasLowerLetter=true
        }
        for(const alphabet of upperAlphabet){
            if(password.includes(alphabet)) hasUpperLetter=true
        }  
        for(const number of numbers){
            if(password.includes(number)) hasNumber=true
        }  
    */

   
}