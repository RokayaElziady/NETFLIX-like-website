const express = require('express')
const session = require('express-session')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}))
var port = process.env.PORT || 3000;
var Username=""
var password=""
var watchlistg=[]
let user={username:"",password:"",watchlist:[]}
//console.log(user)
app.get('/', function(req,res){
        res.render('login')
    })
    
    app.get('/action', function(req,res){
        if(req.session.username && req.session.password) {
            res.render('action');
        }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
    })
    
    app.get('/conjuring', function(req,res){       
        if(req.session.username && req.session.password) {
             res.render('conjuring')
        }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
       
    })
    
    app.get('/darkknight', function(req,res){
        if(req.session.username && req.session.password) {
             res.render('darkknight')
        }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
    })
    
    app.get('/drama', function(req,res){
        if(req.session.username && req.session.password) {
             res.render('drama')
        }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
    })
    app.get('/fightclub', function(req,res){
        if(req.session.username && req.session.password) {
             res.render('fightclub')
        }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
    })
    
    app.get('/godfather', function(req,res){
        if(req.session.username && req.session.password) {
             res.render('godfather')
        }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
    })
    
    app.get('/godfather2', function(req,res){
        if(req.session.username && req.session.password) {
             res.render('godfather2')
        }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
    })
    
    app.get('/home', function(req,res){
        if(req.session.username && req.session.password){
           res.render('home')
     
         }
         else {
        res.write("<h1>user not logged in</h1><a href='/'>login</a>");
        res.end();}
     })
  
    
    app.get('/horror', function(req,res){
        if(req.session.username && req.session.password) {
             res.render('horror')
        }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
    })
    

app.get('/registration', function(req,res){
    res.render('registration')
})

app.get('/scream', function(req,res){
    if(req.session.username && req.session.password) {
         res.render('scream')
    }
else {
    res.write('<h1>Please login first.</h1>');
    res.end('<a href='+'/'+'>Login</a>');
}
})
app.get('/searchresults', function(req,res){
    if(req.session.username && req.session.password) {
            var testmovies=[];
            var testnames=[];
            var testerror="";
            res.render('searchresults',{Dmovies:[],Names:[],error:""});}
            else {
                res.write('<h1>Please login first.</h1>');
                res.end('<a href='+'/'+'>Login</a>');
            }
        })

app.get('/watchlist', function(req,res){
    if(req.session.username && req.session.password) {
    //console.log(addfilmstomywatchlist())
    
    res.render('watchlist',{
       films : addfilmstomywatchlist(req.session.username)
    })}
    else {
        res.write("<h1>user not logged in</h1><a href='/'>login</a>");
        res.end();}

})





let loadUsers = function(){
    try {
        let bufferedData = fs.readFileSync('users.json')
        let dataString = bufferedData.toString()
        let userArray = JSON.parse(dataString)
        return userArray
    } catch (error) {
        return []
    }
   
}


let addUser = function(user){
    let users = loadUsers()
    if(user.username!==""&&user.password!==""){
    for(var i=0;i<users.length;i++){
        if(users[i].username==user.username){
            return "username alraedy exist"
        }
    }
    user.watchlist=[]
    users.push(user)
    fs.writeFileSync('users.json', JSON.stringify(users))

    return "successful registration"
}
}


app.post('/register', function(req,res){
         username=req.body.username
         password=req.body.password
     if(req.body.username!="" && req.body.password!=""){
      var msg= addUser(req.body)
       if(msg=="successful registration"){
        req.session.username=req.body.username
        req.session.password=req.body.password
      // res.send(msg)
       res.redirect('/home')
      // res.render('registration')
       }
       else{
           res.send(msg)
       }
    }
       else{

        res.redirect('/registration')   //resirect btakhod el path  render takes html file  render i could send object but direct noooo
       }
     
    })


     let logUser = function(user){
        let users = loadUsers()
        if(user.username!==""&&user.password!==""){
        for(var i=0;i<users.length;i++){
            if(users[i].username==user.username && users[i].password==user.password){
                return "succesfull"
            }
        
        }

        return "user not found or wrong password"
        fs.writeFileSync('users.json', JSON.stringify(users))
    
      
    }
    }

    var movies=[{item:"The Conjuring (2013)"},{item:'The Dark Knight (2008)'},{item:'Fight Club (1999)'},{item:'The Godfather (1972)'},{item:'The Godfather: Part II (1974)'},{item:'Scream (1996)'}]
    app.post('/search', function(req,res){ 
        let bufferedData = fs.readFileSync('movies.json')
       
           var input, filter, ul, li, a, i, txtValue;
           var smovies=[];
           var names=[];
          // input =document.querySelector('[name="Search"]').value;
           var s=req.body.Search
          
            for (i = 0; i < movies.length; i++) {
           
             var c=movies[i].item.toLowerCase();
           //  console.log(movies[i].item);
             if(c.includes(s.toLowerCase()) )  {
                smovies.push(movies[i])
                if(movies[i].item=="The Conjuring (2013)")
                     names.push('conjuring')
                if(movies[i].item=='The Dark Knight (2008)')
                names.push('darkknight')
                if(movies[i].item=='Fight Club (1999)')
                names.push('fightclub')
                if(movies[i].item=='The Godfather (1972)')
                names.push('godfather')
                if(movies[i].item=='The Godfather: Part II (1974)')
                names.push('godfather2')
                if(movies[i].item=='Scream (1996)')
                names.push('scream')
          
                
            }
           }
            var error=""
            if(smovies.length>0)
           res.render('searchresults',{Dmovies:smovies,Names:names,error});
           else{
             error='Movie not found'
           res.render('searchresults',{Dmovies:smovies,Names:names,error})
    }
})



    app.post('/', function(req,res){
      
        username=req.body.username
        password=req.body.password
         if(req.body.username!="" && req.body.password!=""){
          var msg= logUser(req.body)
            if(msg=="succesfull"){
                req.session.username=req.body.username
                req.session.password=req.body.password
                console.log(req.session)
               res.redirect('/home')
            }
            else{
                res.send(msg)
            }
          }
           else{
            res.redirect('/')   //resirect btakhod el path  render takes html file  render i could send object but direct noooo
           }
           res.end('done')
         })
    
    
         let addtowatchlist = function(film,user){
          
            let users = loadUsers()
                var x=-1
            for(var i=0;i<users.length;i++){
                if(users[i].username==user){
                    x=i
                }
            }
            if(x!=-1){
            for(var j=0;j<users[x].watchlist.length;j++){
                if(users[x].watchlist[j]==film){
                    return "film already exsists" 
                }

            }
        }

            users[x].watchlist.push(film)
            fs.writeFileSync('users.json', JSON.stringify(users))
        
            return "successfully added to watchlist"
        
        }

        app.post('/fightclub', function(req,res){
        
             var msg= addtowatchlist("fightclub",req.session.username)
               if(msg=="film already exsists"){
                  res.send(msg)
               }
               else{
                 //var w= addtowatchlist(user);
                  res.redirect('/fightclub')
               }
             
            })
            app.post('/conjuring', function(req,res){
        
                var msg= addtowatchlist("conjuring",req.session.username)
                  if(msg=="film already exsists"){
                     res.send(msg)
                  }
                  else{
                      res.redirect('/conjuring')
                  }
                
               })
               app.post('/darkknight', function(req,res){
        
                var msg= addtowatchlist("darkknight",req.session.username)
                  if(msg=="film already exsists"){
                     res.send(msg)
                  }
                  else{
                     res.redirect('/darkknight')
                  }
                
               })
               app.post('/godfather', function(req,res){
        
                var msg= addtowatchlist("godfather",req.session.username)
                  if(msg=="film already exsists"){
                     res.send(msg)
                  }
                  else{
                      res.redirect('/godfather')
                  }
                
               })
               app.post('/godfather2', function(req,res){
        
                var msg= addtowatchlist("godfather2",req.session.username)
                  if(msg=="film already exsists"){
                     res.send(msg)
                  }
                  else{
                      res.redirect('/godfather2')
                  }
                
               })
               app.post('/scream', function(req,res){
                var msg= addtowatchlist("scream",req.session.username)
                  if(msg=="film already exsists"){
                     res.send(msg)
                  }
                  else{
                      res.redirect('/scream')
                  }
                
               })
             // app.post('/watchlist', function(req,res){
        
               //res.redirect('/watchlist')
                
               //})




               let addfilmstomywatchlist  = function(user){
                let users = loadUsers()
                var x=-1
                for(var i=0;i<users.length;i++){
                    if(users[i].username==user){
                        x=i
                    }
                
                }
               // console.log(x)
                if(x!=-1){
                    return users[x].watchlist
                    }
                    else {
                        return []
                    }          
                  }
            
               

//"location.href = '/action';"

 app.listen(3000, ()=>{
  console.log('server is running')
})