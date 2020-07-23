let auth_tokens = {};

export default function signup(apiUrl){
	const id = prompt("username","")
	const passwords = prompt("password","")
	const emaill = prompt("email","")
	const namee = prompt("name","")
	const anon={
		username : `${id}`,
		password : `${passwords}`,
		email : `${emaill},`,
		name : `${namee}`
	}

	const res = ajax(apiUrl,`auth/signup`,'POST',anon)
	res.then(response =>{
		console.log(response)
		if (response.status == 200){
			alert('Success!')
		}
		if (response.status == 400){
			alert('Malformed Request')
		}
		if (response.status == 409){
			alert('Username Taken')
		}
	})
}

function ajax(apiUrl,url, method, body, flags) {
    const headers =  {
        'Content-Type': 'application/json'
    }
    const options = {
        method,
        headers
    }
    if(!flags) flags = {}
    const namespace = flags.auth || 'default';
    const auth_token = auth_tokens[namespace]
    if (auth_token) headers['Authorization'] = `Token ${auth_token}`
    if (method !== 'GET') {
        options.body = JSON.stringify(body)
    }

    return fetch(`${apiUrl}/${url}`, options)
        
    }