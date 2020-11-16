const config = require("./config.json")
const sql = require("mssql")



//------------------------------------------------------------------------------------
//Connect to the database
//------------------------------------------------------------------------------------

let DatabaseConnection = async () => {

    await sql.connect(config.localDatabase, (err) => {

        if (err) {

            console.log(err);
        }
        //Create request object
        let request = new sql.Request();
        //Query the database and get the records
        request.query("select * from Stokvel_Members", (error, recordset) => {

            if (error) {

                console.log(error)
            }
            console.log(recordset);
        })
    })

}

DatabaseConnection();

