// Create complaint
function create(req, res){
    const complaint = {
         description: req.body.description,
         evidence: req.file.filename,
         location: req.body.location,
         beatOfficeId: req.body.beatOfficeId,
         location: req.body.location,
         status: 'NEW',
         publicUserId: req.user.id
     }
     // Validate user input
     const validationResponse = validator.validate(complaint, schemaForCheckingDescription);
     if(validationResponse !== true){
         res.status(400).json({
             message: "Validation failed.",
             errors: validationResponse
         });
     }else{
         models.Complaint.create(complaint).then((data) => {
             res.status(201).json({
                 message: "Complaint created successfully.",
                 complaint: data
             })
         }).catch((err) => {
             res.status(500).json({
                 message: "Error creating the complaint.",
                 error: err
             })
         });
     }  
 }

 module.exports = {
    create
} 