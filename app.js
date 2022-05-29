const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")
var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS" ); 
    next(); });
    var recipieModel=Mongoose.model("recipies",
    new Mongoose.Schema(
    {

    title: String,
    catagory: String,
    discription: String,
    pepared: String,
    image:String

     }))
Mongoose.connect("mongodb+srv://mzc:mzc@cluster0.m2f8m.mongodb.net/RecipieDb")
    app.post("/api/addrecipie",(req,res)=>{
        var data=req.body
        let recipie=new recipieModel(data)
        recipie.save(
            (error,data)=>{
                if(error){
                    res.send({"status":"error","error":error})
    
                }
                else
                {
                    res.send({"status":"success","data":data})
    
    
                }
            
            })
        })
        app.get("/api/viewrecipie",(req,res)=>{
            recipieModel.find(
                (error,data)=>{
                    if(error){
                        res.send({"status":"error"})
            
                    }
                    else{
                        res.send(data)
            
                    }
                }
            )
            })
            app.post("/api/searchrecipie",(req,res)=>{
                var getTitle=req.body
                console.log(getTitle)
                recipieModel.find(getTitle,(error,data)=>{
                    if(error){
                        res.send({"status":"error"})
                    }
                    else{
                        res.send(data)
                    }
                })
            })
            app.post("/api/deleterecipie",(req,res)=>{
                var getId=req.body
                recipieModel.findByIdAndDelete(getId,(error,data)=>{
                    if(error){
                        res.send({"status":"error"})
                    }
                    else{
                        res.send({"status":"success"})
                    }
                })
            })
            
    app.listen(4500,()=>{
        console.log("server running")
    })