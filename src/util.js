



export function getRedirectPath({type, avatar}){
    let url = (type === 'Boss')? '/boss': '/applicant'
    if(!avatar){
        url += 'info'
    }
    return url
}