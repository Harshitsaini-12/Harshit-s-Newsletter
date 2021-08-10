const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/",(req,res)=>{
     const firstName=req.body.fName;
     const secondName=req.body.lName;
     const email=req.body.Email;


const data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:secondName
            }
        }
    ]
};

const jsonData=JSON.stringify(data);

const url="https://us1.api.mailchimp.com/3.0/lists/3451791fa3";

const options={
   method:"POST",
   auth:"harshit12:0358279f4f6f7ac13ae78ea0392b1324-us1"

}

    const request =https.request(url,options,(response)=>{

        if(response.statusCode ===200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
     })

     request.write(jsonData);
     request.end();
});

app.post("/failure",(req,res)=>{
    res.redirect("/");
})


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server running at port 3000")
});

