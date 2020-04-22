var app = require('express')(),
http = require('http').createServer(app),
io = require('socket.io')(http),
port = process.env.PORT || 3000,
publicDir = `${__dirname}/public`
http.listen(port, () =>{
    console.log('################################################')
    console.log('#       Servidor iniciado en localhost:%d    #', port);
    console.log('################################################')
    console.log('\n')
    console.log('####### ######## ##     ## ######## ######  ########')
    console.log('#       #      # # #   # # #      # #     # #      #')
    console.log('#       ######## #  # #  # ######## ######  ######## ')
    console.log('#       #      # #   #   # #      # #   #   #      #')
    console.log('####### #      # #       # #      # #     # #      #')
    console.log('\n')
    console.log('###################################################')
    
})

app
    .get('/', (req, res) => {
        res.sendFile(`${publicDir}/client.html`)
    })
    .get('/streaming', (req, res) =>{
        res.sendFile(`${publicDir}/server.html`)
    })

    io.on('connection', (socket) =>{
        socket.on('streaming', (image) => {
            io.emit('playStream', image)
        })
    })
