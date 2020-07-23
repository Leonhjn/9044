let auth_tokens = {};
export default function login(apiUrl){
	const id = prompt("Username","")
	const passwords = prompt("Password","")
	const anon={
		username : `${id}`,
		password : `${passwords}`
	}


	const res = ajax(apiUrl,`auth/login`,'POST',anon)
	res.then(response =>{
		console.log(response)
		if (response.status == 400){
			alert('Missing Username/Password')
		}
		if (response.status == 403){
			alert('Invalid Username/Password')
		}
		if (response.status == 200){

			console.log('haha')
			return response.json()
		}
	})
	.then(data => {
			console.log(data.token)
			auth_tokens.token=data.token
			const userpost = ajax(apiUrl,`user/feed`,'GET',null,{auth : "token"})
			userpost.then(respon => {
				console.log(respon)
				return respon.json()
			})
			.then(userdata => {
				console.log(userdata)
				feed(userdata)
			})
		
		
	})
}

function feed(res){
    var feeddiv = document.getElementById('feed')

    var lis = feeddiv.querySelectorAll("li")
    console.log(lis.length)
    for (var i=0;i<lis.length;i++){
        console.log('abc')
        lis[i].remove()
    }


    for (var i = 0;i < res.posts.length ; i++){
        console.log(res.posts.length)
        var divv=document.createElement("li")
        divv.setAttribute('class','post')
        divv.setAttribute('data-id-post','');
        var div4=document.createElement("div");
        div4.setAttribute('class','vote');
        div4.setAttribute('data-id-upvotes','');
        div4.innerText = res.posts[i].meta.upvotes.length;
        divv.appendChild(div4);

        


        var div1=document.createElement("div");
        div1.setAttribute('class','content');


            var div5=document.createElement("h4");
            div5.setAttribute('class','post-title alt-text');
            div5.innerText = res.posts[i].title;
            div5.setAttribute('data-id-title','')
            div1.appendChild(div5);           

            var div9=document.createElement("h4");
            div9.innerText = res.posts[i].text;
            div9.setAttribute('data-post-text','');
            div1.appendChild(div9)



            if (res.posts[i].image != null){
                var div3=document.createElement("img");
             div3.setAttribute('width','200px')
             div3.setAttribute('height','200px')
                div3.setAttribute('src','data:image/jpeg;base64,' + res.posts[i].image);
                div1.appendChild(div3);
            }

            var div6=document.createElement("p");
            div6.setAttribute('class','post-author');
            div6.innerText = 'Posted by '+res.posts[i].meta.author;
            div6.setAttribute('data-id-author','');
            div1.appendChild(div6);

            var div8=document.createElement("div");
            div8.innerText = 'Be posted to '+res.posts[i].meta.subseddit;
            div8.setAttribute('data-subseddit-time','');
            div1.appendChild(div8);

            var div2=document.createElement("div");
            var d = new Date(Number(res.posts[i].meta.published)*1000)
            div2.setAttribute('data-id-time','');
            div2.innerText = d
            div1.appendChild(div2);

            var div7=document.createElement("div");
            div7.innerText = res.posts[i].comments.length+' comments';
            div7.setAttribute('data-comment-author','');
            div1.appendChild(div7);

        divv.appendChild(div1);


        feeddiv.appendChild(divv)

    
    }
    var main = document.getElementById('main')
    main.appendChild(feeddiv)
    // var footer = document.createElement("footer")
    // var example = document.createElement("p")
    // example.innerText='Seddit example'
    // footer.appendChild(example)
    // root.appendChild(footer)

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

