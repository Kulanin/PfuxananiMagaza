const config = require("./config.json");
const sql = require("mssql");


const express = require("express");


const app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors())

//result object

let resultObject = {};

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

        sql.connect(config.localDatabase, (err) => {

            if (err) {

                console.log(err);
                return;
            }

            //let SelectStatement = "select * from Stokvel_Members";

            //create a request object

            let request = new sql.Request();

            request.query(SelectStatement, (error, recordset) => {

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

app.post("/insert", (req, res) => {

    if (req) {

        let id = req.body.member.memberid;
        let firstname = req.body.member.firstname;
        let lastname = req.body.member.lastname;
        console.log(`Id : ${id}  Name : ${firstname} Surname :${lastname}`);

        sql.connect(config.localDatabase, (err) => {

            if (err) {

                console.log(err);
                return;
            }

            let request = new sql.Request();


            let insertStatement = "insert into [Stokvel_Members].[dbo].[Stokvel_Members]";
            insertStatement += "([memberId],  [firstname], [lastname])";
            insertStatement += "VALUES ('" + id + "', '" + firstname + "','" + lastname + "')";
            request.query(insertStatement, (error) => {

                if (error) {

                    console.log("There was an error inserting the data " + error);
                    return;
                }

                console.log("Data inserted successfully");

            })

        });
    }
})

app.post("/Payment",(req,res)=>{

    //desctructue the object
    const {date,amount,memberid,} = req.body.member; 

    console.log("Date : " + date, "Amount : " + amount , " memberId : " + memberid)

    let dateTest = date;
    let newDate = dateTest.replace(/-/g,"");

    const insertPayment = `insert into dbo.Stokvel_Payments([paymentNumber],[amount],[date],[memberId]) VALUES(${3},${amount},${dateTest},${memberid})`
    const insertPayment2  = `insert into dbo.Stokvel_Payments VALUES(${8},${amount},'${date}',${memberid})`;
  
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




const server = app.listen(5001, () => {

    let host = server.address().address;
    let port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);

})





//------------------------------------------------------------------------------------


