// import {confirm_code, confirm_response_has_keys, reset} from './globals.js';
let auth_tokens = {};



export default function (apiUrl) {
    console.log(apiUrl)


    // const anon = {
    //     "username": "xX_greginator_Xx",
    //     "password": "1234",
    //     "email": "greg@fred.com",
    //     "name": "greg"
    //   }

    header();
    const url='post/public';
    const res = ajax(apiUrl,url,'GET',null);
    res.then(response => {
        console.log(response);
        return response.json()
    })
    .then(data => {
        console.log(data)
        feed(data);
    })
    
    // const signupElement = document.querySelector('button[data-id-signup]')
    // signupElement.addEventListener('click', async (e) => {
    //     alert('failed');
    //     const res = ajax(`auth/signup`, 'POST', anon, 200);
        
    // } )       
    // const loginElement = document.querySelector('button[data-id-login]');
    // // const feedElement = document.querySelector('#feed');
    // loginElement.addEventListener('click', async (e) => {
    //     const anon = {
    //         "username": "xX_greginator_Xx",
    //         "password": "1234"
    //     };
    //     alert('failed');
    //     const res = ajax(`auth/login`, 'POST', anon);
    //         console.log(res);

    // })
    // feedElement.addEventListener('click', (e) => {
    //   alert('feed验证');
    // })
}

function header(){

    var root = document.getElementById('root')
    var head = document.createElement("header");
    head.setAttribute('class','banner')
    head.setAttribute('id','nav')

        var logo = document.createElement("h1");
        logo.setAttribute('id','logo')
        logo.setAttribute('class','flex-center')
        logo.innerText = 'Seddit'
        head.appendChild(logo)

        var ull = document.createElement("ul")
        ull.setAttribute('class','nav')

            var item1 = document.createElement("li")
            item1.setAttribute('class','nav-item')
                var search = document.createElement("input")
                search.setAttribute('id','search')
                search.setAttribute('data-id-search','')
                search.setAttribute('placeholder','Search Seddit')
                search.setAttribute('type','search')
                item1.appendChild(search)
            ull.appendChild(item1)

            var item2 = document.createElement("li")
            item2.setAttribute('class','nav-item')
                var button1 = document.createElement("button")
                button1.innerText = 'Log In'
                button1.setAttribute('class','button button-primary')
                button1.setAttribute('data-id-login','')
                item2.appendChild(button1)
            ull.appendChild(item2)
            
            var item3 = document.createElement("li")
            item3.setAttribute('class','nav-item')
                var button2 = document.createElement("button")
                button2.innerText = 'Sign Up'
                button2.setAttribute('class','button button-secondary')
                button2.setAttribute('data-id-signup','')
                item3.appendChild(button2)
            ull.appendChild(item3)

        head.appendChild(ull)
    root.appendChild(head)
}
function feed(res){

    var root = document.getElementById('root')

    var main = document.createElement('main')
    main.setAttribute('id','main')
    main.setAttribute('role','main')

    var feeddiv = document.createElement('ul')
    feeddiv.setAttribute('id','feed')
    feeddiv.setAttribute('data-id-feed','')

    var feed_head = document.createElement('div')
        feed_head.setAttribute('class','feed_header')

        var feed_title = document.createElement('h3')
        feed_title.setAttribute('class','feed-title alt-text')
        feed_title.innerText = 'Popular posts'
        feed_head.appendChild(feed_title)

        var feed_button = document.createElement('button')
        feed_button.setAttribute('post-id-button','')
        feed_button.setAttribute('class','button button-secondary')
        feed_button.innerText = 'Post'
        feed_head.appendChild(feed_button)

    feeddiv.appendChild(feed_head)


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
    main.appendChild(feeddiv)
    // var footer = document.createElement("footer")
    // var example = document.createElement("p")
    // example.innerText='Seddit example'
    // footer.appendChild(example)
    root.appendChild(main)
    // root.appendChild(footer)

}

function ajax(apiUrl,url, method, body, flags) {
    // const API_URL = 'http://localhost:8080';
    console.log(url);
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
    console.log(`${apiUrl}/${url}`);
    return fetch(`${apiUrl}/${url}`, options)
        
    }


  

