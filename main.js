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
        // wrapper.style.backgroundImage = 'url("https://i.pinimg.com/564x/1a/55/7e/1a557effc091d5f2ce617211c245671c.jpg")'
        wrapper.style.backgroundColor = 'green'
        wrapper.style.backgroundSize = 'cover'
        wrapper.style.backgroundPosition = 'center'
        wrapper.style.height = '100%'
        wrapper.style.overflowY = 'auto'
        loading.style.display = 'none'

        data.map(e => {
            let newP = document.createElement('p')
            newP.setAttribute('class', 'newP')
            newP.textContent = e.title
            wrapper.append(newP)
        })
    })
}


// internet connection

const popup = document.querySelector(".popup"),
    wifiIcon = document.querySelector(".icon i"),
    popupTitle = document.querySelector(".popup .title"),
    popupDesc = document.querySelector(".desc"),
    reconnectBtn = document.querySelector(".reconnect");

let isOnline = true, intervalId, timer = 10;

const checkConnection = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;
    } catch (error) {
        isOnline = false;
    }
    timer = 10;
    clearInterval(intervalId);
    handlePopup(isOnline);
}

const handlePopup = (status) => {
    if (status) {
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerText = "Restored Connection";
        popupDesc.innerHTML = "Your device is now successfully connected to the internet.";
        popup.classList.add("online");
        return setTimeout(() => popup.classList.remove("show"), 2000);
    }
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerText = "Lost Connection";
    popupDesc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds.";
    popup.className = "popup show";

    intervalId = setInterval(() => {
        timer--;
        if (timer === 0) checkConnection();
        popup.querySelector(".desc b").innerText = timer;
    }, 1000);
}

setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", () => {
    checkConnection()
    window.location.reload()
});

// detect screen mode

const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

const detectDarkMode = event => {
    if (event.matches) {
        console.log('enabled');
        wrapper.style.backgroundColor = '#000'
    } else {
        console.log('disabled');
        wrapper.style.backgroundColor = 'green';
    }
}

// call detectDarkMode & listen for changes to the user's preferred color scheme
detectDarkMode(darkModeQuery);
darkModeQuery.addEventListener('change', e => detectDarkMode(e));