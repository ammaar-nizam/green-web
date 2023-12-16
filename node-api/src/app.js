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
const institutionRoute = require('./routes/institution');
const investigationRoute = require('./routes/investigation');
// const notificationRoute = require('./routes/notification');
const publicUserRoute = require('./routes/publicUser');
const registrationRoute = require('./routes/registration');
const roleRoute = require('./routes/role');
const commonRoute = require("./routes/commonRoute");

const cors = require("cors");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/admins", adminRoute);
app.use("/api/beat-offices", beatOfficeRoute);
app.use("/api/beat-officers", beatOfficerRoute);
app.use("/api/branches", branchRoute);
app.use("/api/complaints", complaintRoute);
app.use("/api/divisions", divisionRoute);
app.use("/api/institutions", institutionRoute);
app.use("/api/investigations", investigationRoute);
// app.use("/api/notifications", notificationRoute);
app.use("/api/public-users", publicUserRoute);
app.use("/api/registrations", registrationRoute);
app.use("/api/roles", roleRoute);
app.use("/api", commonRoute);

app.use('/uploads', express.static('./uploads'))

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});