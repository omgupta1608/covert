module.exports = {
    SERVER_URL: 'https://covert-server.as.r.appspot.com',
    HOST: window.location.hostname.includes("localhost") ? `http://${window.location.hostname}:3000`: `https://${window.location.hostname}`
}