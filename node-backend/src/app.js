const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require('body-parser');

const adminRoute = require('./routes/admin');
const beatOfficeRoute = require('./routes/beatOffice');
const beatOfficerRoute = require('./routes/beatOfficer');
const branchRoute = require('./routes/branch');
const complaintRoute = require('./routes/complaint');
const divisionRoute = require('./routes/division');
const forestryAndEnvironmentalRoute = require('./routes/forestryAndEnvironmental');
const institutionRoute = require('./routes/institution');
const investigationRoute = require('./routes/investigation');
const publicUserRoute = require('./routes/publicUser');
const registrationRoute = require('./routes/registration');
const roleRoute = require('./routes/role');
const userRoute = require('./routes/user');
const wildlifeRoute = require('./routes/wildlife');
const commonRoute = require("./routes/commonRoute");

const cors = require("cors");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/admins", adminRoute);
app.use("/api/beatOffices", beatOfficeRoute);
app.use("/api/beatOfficers", beatOfficerRoute);
app.use("/api/branchs", branchRoute);
app.use("/api/complaints", complaintRoute);
app.use("/api/divisions", divisionRoute);
app.use("/api/forestryAndEnvironmentals", forestryAndEnvironmentalRoute);
app.use("/api/institutions", institutionRoute);
app.use("/api/investigations", investigationRoute);
app.use("/api/publicUsers", publicUserRoute);
app.use("/api/registrations", registrationRoute);
app.use("/api/roles", roleRoute);
app.use("/api/users", userRoute);
app.use("/api/wildlifes", wildlifeRoute);
app.use("/api", commonRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});