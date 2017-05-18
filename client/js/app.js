 

 
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA_UwnK15GF9F317cX_1NCCdLr1BvAIvSM",
    authDomain: "blog-b77f8.firebaseapp.com",
    databaseURL: "https://blog-b77f8.firebaseio.com",
    projectId: "blog-b77f8",
    storageBucket: "blog-b77f8.appspot.com",
    messagingSenderId: "724051638897"
  };
  firebase.initializeApp(config);
  
  var provider = new firebase.auth.GoogleAuthProvider();
  
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  
  //comparative date reference
  var now = Date.now();
  //reference for blogposts
  var postsRef = firebase.database().ref('blogposts/').orderByChild('date').limitToFirst(12);


  //load blogposts
postsRef.once('value', function(snapshot) {
  postLoader(snapshot.val())});
  
function postLoader(snapshot){
   //load up each individual blogpost
   for (var prop in snapshot) {
    var propRef = firebase.database().ref('blogposts/' + prop);
    
    
    propRef.once('value', function(snapshot){
     poster(snapshot.val())})
   
}
};

function poster(snapshot){
 if (document.getElementById("art")){
 //locate article, append content
var art = document.getElementById("art");
//create article
var artic = document.createElement("article");

var titleNode = document.createElement("h3");  
  titleNode.className = "title";
  var titleTextNode = document.createTextNode(snapshot.title);         
  titleNode.appendChild(titleTextNode);     
var dateNode = document.createElement("p");
  dateNode.className = "date";
  var d = new Date(snapshot.date);
  var dateTextNode = document.createTextNode(d.toLocaleDateString("en-US") + d.toLocaleTimeString("en-us"));
  dateNode.appendChild(dateTextNode);
  if (snapshot.file.length >0){
var imageNode = document.createElement("img");
  imageNode.src = snapshot.file;}
var contentNode = document.createElement("p");
  contentNode.className = "content";
  var contentTextNode = document.createTextNode(snapshot.content);
  contentNode.appendChild(contentTextNode);
  artic.appendChild(titleNode);
  artic.appendChild(dateNode)
  if (snapshot.file.length >0){artic.appendChild(imageNode);}
  artic.appendChild(contentNode);
  
  
  art.appendChild(artic);
}}
/*
console.log(prop);
    console.log(propRef);
    */
  
  
  
  var submitBtn = document.getElementById("submit");
 if (submitBtn)
 {submitBtn.addEventListener("click", function(){submitBlogPost()});
 }
 
 
 
 //new submit function
 function submitBlogPost(){
  
  var email = "henryamsterfritz@gmail.com";
  var password = document.getElementById("password");
  var pw = password.value;
  
  firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
   
  var errorCode = error.code;
  var errorMessage = error.message;
});

var user = firebase.auth().currentUser;


if (user) {
   var title = document.getElementById("title");
  var content = document.getElementById("content");
  var file= document.getElementById("file");
  
  console.log(title.value + "LOL" + content.value + file.value + Date.now());
  var blogPost = {
   title: title.value,
   content: content.value,
   file: file.value,
   date: Date.now()
  };
  // return a key for individual post
  var newBlogKey = firebase.database().ref().child('blogposts').push().key;
  // place in array in case multiple users/ new functionality are added in the future.
  var updates = {};
  updates['blogposts/' + newBlogKey] = blogPost;
  //return updates to database
  return firebase.database().ref().update(updates);
}
else{
 var t = document.getElementsByTagName("h1");
  t.innerHtml= "ERROR";
}
 
  
}
 


