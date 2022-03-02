const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "vendor_infor_database",

});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/get', (req, res) => {

    const sqlSelect = "SELECT * FROM vendor_infor_table";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });

});

app.post("/api/insert", (req, res) => {

    const Company_name = req.body.Company_name
    const Name_of_Authority = req.body.Name_of_Authority
    const Designation_of_Authority = req.body.Designation_of_Authority
    const Registered_Address_of_Authority = req.body.Registered_Address_of_Authority
    const Contact_Number = req.body.Contact_Number
    const Web_Portal = req.body.Web_Portal
    const Email = req.body.Email
    const PAN_Number = req.body.PAN_Number
    const GSTN_Number = req.body.GSTN_Number
    const GST_Filing_Cycle = req.body.GST_Filing_Cycle


    const sqlInsert = "INSERT INTO vendor_infor_table(Company_name,Name_of_Authority,Designation_of_Authority,Registered_Address_of_Authority,Contact_Number,Web_Portal,Email,PAN_Number,GSTN_Number,GST_Filing_Cycle) VALUES (?,?,?,?,?,?,?,?,?,?)";
    db.query(sqlInsert, [Company_name, Name_of_Authority, Designation_of_Authority, Registered_Address_of_Authority, Contact_Number, Web_Portal, Email, PAN_Number, GSTN_Number, GST_Filing_Cycle], (err, result) => {
        console.log(result);
    });


});

app.delete("/api/delete/:Company_name", (req, res) => {
    const name = req.params.Company_name;
    const sqlDelete = "DELETE FROM vendor_infor_table WHERE Company_name = ?";
    db.query(sqlDelete, name, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }

    });
})


app.put("/api/update", (req, res) => {
    const name = req.body.Company_name;
    const number = req.body.Contact_Number;


    const sqlUpdate = "UPDATE vendor_infor_database.vendor_infor_table SET Contact_Number=? WHERE Company_name = ?";
    db.query(sqlUpdate, [number, name], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
})

app.listen(3001, () => {
    console.log("Running on port 3001");
});