const config = require("./config.json");
const sql = require("mssql");


const express = require("express");


const app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors())

const Pfuxanai_StokvelModel = require("../models/Stokvel");
const { response } = require("express");

//result object

let resultObject = {};
let g_MemberId = 0;

updateGlobalVariable = (p_MemberId)=>{

        g_MemberId = p_MemberId;
}

//------------------------------------------------------------------------------------
//Success Response
//------------------------------------------------------------------------------------
SendResultsResponse = (p_Response,res)=>{

    delete resultObject.error;
    resultObject.data = p_Response;

return res.send(JSON.stringify(resultObject));
}

SendeErrorResponse = (p_Error,res)=>{

    resultObject.error = p_Error;
    delete resultObject.data;

    return res.send(JSON.stringify(resultObject));
}


//------------------------------------------------------------------------------------
//Connect to mogoose database
//Mongo db password: Learning123*$
//mongodb://localhost/Pfuxanai_Stokvel'
//const MONGODB_URI = "mongodb+srv://Kulani:Learning123*$@sandbox.jl9sn.mongodb.net/<dbname>?retryWrites=true&w=majority";
//------------------------------------------------------------------------------------
mongoose.connect('mongodb://localhost/Pfuxanai_Stokvel',{
useNewUrlParser:true,
useUnifiedTopology: true

})



//Saving data to our mongo database
// const data = {
//     firstname: "Kulani",
//     lastname: "Ngobeni",
//     cell: "0112020333",
//     amount: 22000.00
// }

//use .save method in order to save data into the database
//Create a new instance of Pfuxanai_StokvelModel
//const newStokvelMember = new Pfuxanai_StokvelModel(data);


// newStokvelMember.save(error=>{
//     if(error){
//         console.log("Ooops, something happened");
//     }else{

//         console.log("Data has been saved!!");
//     }

  
// })


//use on listener event to check if mongoose has been connected

mongoose.connection.on("connected",()=>{

    console.log("Mongoose is connected!")
})

//Connect to the database
//------------------------------------------------------------------------------------

let DatabaseConnection = async () => {

    await sql.connect(config.localDatabase, (err) => {

        if (err) {

            console.log(err);
            return;
        }

        return true;
        //Create request object
        // let request = new sql.Request();
        //Query the database and get the records
        //     request.query("select * from Stokvel_Members", (error, recordset) => {

        //         if (error) {

        //             console.log(error)
        //         }
        //         recordset.recordset.map((value, index) => {

        //             console.log(value);
        //         });
        //     })
    })

}

app.get("/", (req, res) => {

    Pfuxanai_StokvelModel.find({})
    .then(p_Data =>{

        console.log("Data " + p_Data);
        
        SendResultsResponse(p_Data,res);

    })
    .catch(p_Error=>{

        console.log("Error " + p_Error)
    })

})

app.post("/insert",(req,res)=>{

    const {firstname,lastname,cell} =  req.body.member;

    req.body.member.amount = 00; 
    req.body.member.date = "2020-05-07"; 

    const newStokvelMember = new Pfuxanai_StokvelModel(req.body.member);

    newStokvelMember.save(p_Error=>{

        if(p_Error){

            console.log("Error " + p_Error);
        }else{

            console.log("Member successfully registered");

            SendResultsResponse("Member successfully registered",res)
        }
    })



})

app.post("/Payment",(req,res)=>{

    console.log(req.body.member);
    let memberid = req.body.member.memberid;
    let amountUpdated = req.body.member.amount;
    let updatedDate = req.body.member.date;

    Pfuxanai_StokvelModel.findOne({_id: memberid}, (error, response)=>{

        if(error){

            console.log("There was an error " +error);
        }

        console.log(response.amount);
        

    



        console.log("Response " + response)

        Pfuxanai_StokvelModel.updateOne({_id: memberid},{$push: {amount : amountUpdated, date : updatedDate}},(error,response)=>{

            if(error){
        
                console.log(error)
            }
        
            console.log(response);

            SendResultsResponse("Amount was updated successfully ", res);
        });
    })



  
    
})

/*
app.get("/", (req, res) => {

    let members = [
        { firstname: "Kulani", lastname: "Ngobeni", image: "image1.jpg", cell: "071 445 8895", "Total": 300 },
        { firstname: "Lulama", lastname: "Ngobeni", image: "image2.jpg", cell: "079 888 2523", "Total": 1000 },
        { firstname: "Phindile", lastname: "Ngobeni", image: "image3.jpg", cell: "081 963 2252", "Total": 500 },
        { firstname: "Arthur", lastname: "Tivani", image: "image4.jpg", cell: "011 435 3358", "Total": 700 },
        { firstname: "Nhlamulo", lastname: "Chauke", image: "image4.jpg", cell: "011 435 3358", "Total": 700 },
      ];

    if (req) {

        //res.send(members);


        let SelectStatement = `select[Stokvel_Members].memberId, [Stokvel_Members].firstname, [Stokvel_Members].lastname, SUM(Stokvel_Payments.amount) as Total    FROM [Stokvel_Members].[dbo].[Stokvel_Payments] 

         inner join [Stokvel_Members].[dbo].Stokvel_Members ON Stokvel_Members.memberId = Stokvel_Payments.memberId
      
        GROUP BY Stokvel_Members.memberId,Stokvel_Members.firstname,Stokvel_Members.lastname`;

        //let SelectStatement = `select TOP 5 * from [Stokvel_Members].[dbo].Stokvel_Members`;
        //let SelectStatement = `select MAX(memberId) as Max from [Stokvel_Members].[dbo].Stokvel_Members`;

        sql.connect(config.localDatabase, (err) => {

            if (err) {

                console.log(err);
                return;
            }

            //let SelectStatement = "select * from Stokvel_Members";

            //create a request object

            let request = new sql.Request();

            request.query(SelectStatement, (error,recordset) => {

                if (error) {

                    console.log("There was an error retrieving data from the database");
                }

         
                console.log(JSON.stringify(recordset));

                res.send(JSON.stringify(recordset))

            })

            //res.send(JSON.stringify({ "name": "Kulani" }));
        })
    }

})

*/
/*
app.post("/insert", (req, res) => {

    if (req) {

        let cell = req.body.member.cell;
        let firstname = req.body.member.firstname;
        let lastname = req.body.member.lastname;
        console.log(`cell : ${cell}  Name : ${firstname} Surname :${lastname}`);

        sql.connect(config.localDatabase, (err) => {

            if (err) {

                console.log(err);
                return;
            }

            let request = new sql.Request();
            let testDate = "2020-11-26";
            let defaultAmount = 0;


            let insertStatement = "insert into [Stokvel_Members].[dbo].[Stokvel_Members]";
            insertStatement += "([firstname], [lastname],[cell])";
            insertStatement += "VALUES ('" + firstname + "','" + lastname + "','" + cell + "')";

            let selectMax ="SELECT MAX([memberId]) as Max from [Stokvel_Members].[dbo].[Stokvel_Members]";
           // let updatePayment = "update  [Stokvel_Members].[dbo].[Stokvel_Payments] set amount =  0 where memberId = '"+g_MemberId+"' ";
            //const insertPayment = `insert into dbo.Stokvel_Payments([amount],[date],[memberId]) VALUES(${defaultDate},${testDate},${g_MemberId})`;
            //const insertPayment2  = `insert into dbo.Stokvel_Payments VALUES(${defaultAmount},'${testDate}',${g_MemberId})`;
            
            request.query(insertStatement, (error,recordeset) => {

                if (error) {

                    console.log("There was an error inserting the data " + error);
                    return;
                }

                console.log("Data inserted successfully" + recordeset);

                request.query(selectMax, (error,recordset) => {

                    if (error) {
    
                        console.log("There was an error inserting the data " + error);
                        SendeErrorResponse("There was an error inserting the data ",error);
                        return;
                    }

                    console.log("Data inserted successfully" + console.log(JSON.stringify(recordset)));

                    recordset.recordset.map(Max=>{ 
                     

                        console.log(Max.Max);

                        const insertPayment2  = `insert into dbo.Stokvel_Payments VALUES(${defaultAmount},'${testDate}',${Max.Max})`;
                        request.query(insertPayment2, (error,recordset) => {
            
                            if (error) {
            
                                console.log("There was an error inserting the data " + error);
                                return;
                            }
            
                            console.log("Data was successfully updated");

                            SendResultsResponse("Data was successfully added",res);
            
                            
            
                    })
                    })

            })

    

        })

        });
    }
})

*/
/*
app.post("/Payment",(req,res)=>{

    //desctructue the object
    const {date,amount,memberid,} = req.body.member; 

    console.log("Date : " + date, "Amount : " + amount , " memberId : " + memberid)

    let dateTest = date;
    let newDate = dateTest.replace(/-/g,"");

    const insertPayment = `insert into dbo.Stokvel_Payments([amount],[date],[memberId]) VALUES(${amount},${dateTest},${memberid})`
    const insertPayment2  = `insert into dbo.Stokvel_Payments VALUES(${amount},'${date}',${memberid})`;
  
        //create request object

    sql.connect(config.localDatabase, (err) => {

        if (err) {

            console.log(err);
            return;
        }


        let request = new sql.Request();

        request.query(insertPayment2,(error,response)=>{

            if(error){

                console.log("There was an error inserting data into the db");
               return SendeErrorResponse("There was an error inserting data into the db",res);
            }

               return SendResultsResponse("Amount was updated successfully",res)
        

     
        })
    })

})

*/


const server = app.listen(5001, () => {

    let host = server.address().address;
    let port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);

})





//------------------------------------------------------------------------------------


