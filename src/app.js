//imports
let http = require("http")
let express = require("express")
let routes = require("./routes/index")

const session = require("express-session")
const flash  = require("express-flash")

const PORT = 3001
let app = express()
//configurar a session do express
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge : 1000 * 60 * 60
    }
}))

app.use(flash( { sessionKeyName : 'flashMessage' }))

app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');

//Registrar o local onde meus arquivos estaticos como imagens,CSS etc;vão ficar
app.use("/", express.static(__dirname + '/public'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/", routes)

http.createServer(app)
     .listen(PORT, () => {
        console.log("Servidor rodando")
    })