// jshint esversion:6
const express=require('express');
const app=express();
const request=require('request');
const bparser=require('body-parser');
const port=3000;
app.use(express.static("public"));
app.use(bparser.urlencoded({extended:true}));
app.get('/', (req, res)=>{

  res.sendFile(__dirname+"/index.html");
});

app.post('/', (req,res)=>{
const fname=req.body.fname;
const emails=req.body.mail;
const pwd=req.body.pwd;
const https=require('https');
const data={
  members:[{
    email_address:emails,
    status:"subscribed",
merge_fields:{
  FNAME:fname,
  EMAIL:emails
}
  }]

};
const jsondata=JSON.stringify(data);
const url="https://us6.api.mailchimp.com/3.0/lists/10b71c1454";
const options={
  method:"POST",
  auth:"loki:fade37e5ed84601ec32f52b878da9e0d-us6"
};
const request=https.request(url,options,(response)=>{
  if(response.statusCode==200)
  res.sendFile(__dirname+"/success.html");
  else
  res.sendFile(__dirname+"/failure.html");
  response.on("data",function(d){
    console.log(JSON.parse(d));
  });

});
request.write(jsondata);
request.end();
});
app.post('/failure',(req, res)=>{
  res.redirect('/');
} );
app.listen(process.env.PORT||port,()=>{
  console.log("i entered listen");
});
//list id: 10b71c1454
//api key:fade37e5ed84601ec32f52b878da9e0d-us6
//det: name: "name",
  /*  permission_reminder: "permission_reminder",
    email_type_option: false,
    contact: {
      company: "company",
      address1: "address1",
      city: "city",
      country: "country",
    },
    campaign_defaults: {
      from_name: "from_name",
      from_email: "Mariah65@gmail.com",
      subject: "subject",
      language: "language",
    },
  });*/
