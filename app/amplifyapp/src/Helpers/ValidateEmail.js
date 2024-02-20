export function validateEmail({emailInput}){
    // something fishy with email input
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailInput) === false) {
        return 'Email provided is not in format of: email@domain.com'
    }
    return ''
}