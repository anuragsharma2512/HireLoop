import { Referral } from "../models/referral.model.js";

 
const requestReferral = async(req,res)=>{
    try{
        const { seniorId, companyName, jobRole, message, resumeUrl } = req.body;
        const studentId=req.user.id;
        
         if (!seniorId || !companyName || !jobRole) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if(studentId==seniorId){
            return res.status(400).json({message:"you're a senior so u can't request a referral"})
        }
        const today = new Date();
        today.setHours(0,0,0,0);
        const count =await Referral.countDocuments({
            studentId,
            createdAt:{$gte: today}
        });
        if(count>=5){
            return res.status(400).json({
                message: "Daily referral limit reached"
            });
        }
        const existing = await Referral.findOne({
             studentId: req.user.id,
                        seniorId,
                        companyName,
                         jobRole,
               status: "pending"
                   });

           if (existing) {
           return res.status(400).json({
             msg: "You already requested this referral"
                });
                }
       
        const referral = new Referral({
            studentId: req.user.id,
            seniorId,
            companyName,
            jobRole,
            message
        });
        await referral.save();
        res.status(201).json({
            success:true,
            message:"referral req created successfully ",
            data:referral
        }); 
    }catch(err){
        console.error("referral error",err);
        res.status(500).json({error:"server error while proccessing referral"});

    }
}

const approveReferral = async (req, res) => {
  try {
    const referral = await Referral.findById(req.params.id);

    if (!referral) {
      return res.status(404).json({ msg: "Referral not found" });
    }

    if (referral.seniorId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    referral.status = "approved";
    referral.responseMessage = req.body.responseMessage ;

    await referral.save();

    res.status(200).json({
      success: true,
       data: referral
         });
  } catch (err) {
    res.status(500).json({
     success: false,
     message: "Internal server error"
      });
  }
};

const rejectReferral = async (req, res) => {
  try {
    const referral = await Referral.findById(req.params.id);

    if (!referral) {
      return res.status(404).json({ msg: "Referral not found" });
    }


    if (referral.seniorId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    referral.status = "rejected";
    referral.responseMessage = req.body.responseMessage || "";

    await referral.save();

    res.status(200).json({
        success: true,
        data: referral
        });
  } catch (err) {
     res.status(500).json({
     success: false,
     message: "Internal server error"
      });
  }
};
const getStudentReferrals = async (req, res) => {
  try {
    const status = req.query.status;

    let referrals;

    if (status) {
      
      referrals = await Referral.find({
        studentId: req.user.id,
        status: status
      })
        .sort({ createdAt: -1 })
        .populate("seniorId", "name email");

    } else {
      
      referrals = await Referral.find({
        studentId: req.user.id
      })
        .sort({ createdAt: -1 })
        .populate("seniorId", "name email");
    }

   res.status(200).json({
    success: true,
    data: referrals
     });

  } catch (err) {
     res.status(500).json({
     success: false,
     message: "Internal server error"
      });
  }
};
const getSeniorReferrals = async (req, res) => {
  try {
     const status = req.query.status;

    const query = { seniorId: req.user.id };
    if (status) query.status = status;
    const referrals = await Referral.find(query)
      .sort({ createdAt: -1 })
      .populate("studentId", "name email")
      .populate("seniorId", "name email");

    res.status(200).json({
       success: true,
        data: referrals
      });
  } catch (err) {
    res.status(500).json({
     success: false,
     message: "Internal server error"
      });
  }
};
export {requestReferral,approveReferral,rejectReferral,getSeniorReferrals,getStudentReferrals};