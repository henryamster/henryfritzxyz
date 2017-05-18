
 //Initialize Firebase
  var config = {
    apiKey: "AIzaSyA_UwnK15GF9F317cX_1NCCdLr1BvAIvSM",
    authDomain: "blog-b77f8.firebaseapp.com",
    databaseURL: "https://blog-b77f8.firebaseio.com",
    projectId: "blog-b77f8",
    storageBucket: "blog-b77f8.appspot.com",
    messagingSenderId: "724051638897"
  };
  firebase.initializeApp(config);
  
  //Provider for googleOAuth
  var provider = new firebase.auth.GoogleAuthProvider();
  //RO scope for checking  google OAuth
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  //Comparative date reference
  var now = Date.now();
  //DB reference for blogposts
  var postsRef = firebase.database().ref('blogposts/');
  //load blogposts
postsRef.orderByChild("date").limitToLast(12).on('value', function(snapshot) {
  postLoader(snapshot.val())});
function postLoader(snapshot){
   //load up each individual blogpost snapshot, with ID values
   for (var postID in snapshot) {
    var postIDRef = firebase.database().ref('blogposts/' + postID);
    postIDRef.on('value', function(snapshot){
     poster(snapshot.val())})
}
};
function poster(snapshot){
    
 if (document.getElementById("art")){
 //locate empty article to append content to
var art = document.getElementById("art");
//create article
var artic = document.createElement("article");
//create titleNode, append textnode, apply css
var titleNode = document.createElement("h3");  
  titleNode.className = "title";
  var titleTextNode = document.createTextNode(snapshot.title);         
  titleNode.appendChild(titleTextNode);     
//create dateNode, append textnode (date from snapshot properly formatted), apply css
var dateNode = document.createElement("p");
  dateNode.className = "date";
  var d = new Date(snapshot.date);
  var dateTextNode = document.createTextNode(d.toLocaleDateString("en-US") + "  " + d.toLocaleTimeString("en-us"));
  dateNode.appendChild(dateTextNode);
//check to see that an image link has been included, if not, skip
  if (snapshot.file.length >0){
//create imageNode, append image source, apply css
var imageNode = document.createElement("img");
  imageNode.src = snapshot.file;}
////create contentNode, append textnode, apply css
var contentNode = document.createElement("p");
  contentNode.className = "content";
  var contentTextNode = document.createTextNode(snapshot.content);
  contentNode.appendChild(contentTextNode);
  //append child nodes to article node
  artic.appendChild(titleNode);
  artic.appendChild(dateNode);
  //check again to ensure existence of image node
  if (snapshot.file.length >0){artic.appendChild(imageNode);}
  //append child nodes to article
  artic.appendChild(contentNode);
  //properly insert post at top of page
  art.insertBefore(artic, art.firstChild)
}}
  var submitBtn = document.getElementById("submit");
 if (submitBtn)
 {submitBtn.addEventListener("click", function(){submitBlogPost()});
 }
 //new submit function
 function submitBlogPost(){
  var email = "henryamsterfritz@gmail.com";
  var password = document.getElementById("password");
  var pw = password.value;
  console.log("pw");
  firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
   
  var errorCode = error.code;
  var errorMessage = error.message;
});

//firvar user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function(user) {

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
 
  
})
 
}

//Henry Fritz Design & Development
//HenryAmsterFritz@gmail.com
//Firebase logic, all in one file. 