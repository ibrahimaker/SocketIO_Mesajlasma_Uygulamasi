var app = require('express')(); // express kütüphanesini projeye dahil ediyoruz
var http = require('http').createServer(app); // bir server yaratıyoruz
const io = require('socket.io')(http, { //socket.io kütüphanesini dahil ediyoruz
    cors: {
      origin: '*', // cors hatası almamak için ekliyoruz.
      }
});


app.get('/', (req, res)=>{
  // web browser'dan server sayfasını açınca bu mesajı ekrana basar
    res.send('<h1>Merhaba Dünyalı Biz Dostuz</h1>');
});


io.on('connection', (socket) => {
// yeni bir connection kurulunca buraya düşer
// socket.id'yi log olarak atıyoruz
      console.log('socket: ' + socket.id);
// client tarafındaki tüm kullanıcılara "yeni kullanıcı" bilgisini gönderiyoruz
// client tarafında da socket.on(UserConnected) ile dinliyoruz
      socket.emit("UserConnected", socket.id);

 //client'dan gelecek mesajları dinliyoruz   
      socket.on("message", function(msg){
        console.log('socket: ' + msg);
        // aynı mesajı tüm bağlanan kullanıcılara (odalara) gönderiyoruz.
        // bu şekilde mesaj broadcasting yayın yapar..
        io.emit("message", msg);
    });
      
  });

  io.on("disconnect", () => {
    //socket'in disconnnected olması durumunda buraya düşer.
    console.info('disconnected socket: ', socket.id);
});



http.listen(3000, ()=>{
  // 3000 portunu dinliyoruz
    console.log('listening on *:3000');
});
