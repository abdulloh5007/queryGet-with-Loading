// fetch query POST

// fetch('https://reqres.in/api/users/1', {
//     method: 'POST',
//     headers: {
//         "Content-type": "application/json",
//     },
//     body: JSON.stringify({ email: 'abdulloh50007@gmail.com', id: '1' })
// })
// .then(res => res.json())
// .then(data => console.log(data))

window.addEventListener('beforeunload', function (event) {
    event.preventDefault();
    event.returnValue = ''; // Required for some browsers
    // Perform your desired action here
});

const wrapper = document.querySelector('.wrapper')
const loading = document.querySelector('.loading')

fetch('https://jsonplaceholder.typicode.com/posts/', {
    method: 'GET',
    headers: {
        "Content-type": "application/json",
    },
})
.then(res => res.json())
.then(data => mapper(data))

wrapper.style.backgroundColor = '#fff'
wrapper.style.backgroundSize = 'cover'
wrapper.style.backgroundPosition = 'center'
wrapper.style.height = '97vh'

function mapper(data) {
    loading.style.display = 'block'
    setTimeout(() => {
        wrapper.style.backgroundImage = 'url("https://i.pinimg.com/564x/1a/55/7e/1a557effc091d5f2ce617211c245671c.jpg")'
        wrapper.style.backgroundSize = 'cover'
        wrapper.style.backgroundPosition = 'center'
        wrapper.style.height = '100%'
        wrapper.style.overflowY = 'auto'
        loading.style.display = 'none'

        data.map(e => {
            let newP = document.createElement('p')
            newP.textContent = e.title
            wrapper.append(newP)
        })
    })
}
