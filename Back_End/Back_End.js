const config = require("./config.json");
const sql = require("mssql");


const express = require("express");


const app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors())


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

    if (req) {

        sql.connect(config.localDatabase, (err) => {

            if (err) {

                console.log(err);
                return;
            }

            let SelectStatement = "select * from Stokvel_Members";

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

        let id = req.body.member.memberId;
        let firstname = req.body.member.firstname;
        let lastname = req.body.member.lastname;
        console.log(`Id : ${id}  Name : ${firstname} Surname :${lastname}`);

        sql.connect(config.localDatabase, (err) => {

            if (err) {

                console.log(err);
                return;
            }

            let request = new sql.Request();

            let insertStatement = "insert into Stokvel_Members";
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


const server = app.listen(5001, () => {

    let host = server.address().address;
    let port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);

})





//------------------------------------------------------------------------------------


