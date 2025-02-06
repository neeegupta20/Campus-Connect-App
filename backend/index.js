const express=require("express");
const app=express();
const cors=require("cors");
const user=require('./models/user');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const cookieParser=require('cookie-parser');
const nodemailer=require('nodemailer');
const path=require('path')
const reservation=require("./models/reservation");
const Razorpay=require("razorpay");
const bcryptSalt=bcrypt.genSaltSync(10);
const jwtSecret="1234567890"
// const Expo = require('expo-server-sdk')
// const expo = Expo()


const transporter=nodemailer.createTransport({
    host:'smtpout.secureserver.net',
    port:465,
    secure:true,
    auth:{
        user: 'support@campusconnect.me',
        pass: 'Campusconnect12@',
    },
});

const razorpay=new Razorpay({
    key_id: "rzp_live_oIOf24vws5pHYy",
    key_secret: "4AECc9CQZME3KUvFASv5pmT6"
})

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:['https://campusconnect.me','exp://172.16.36.174:8081','exp://192.168.1.130:8081']
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.set('trust proxy',true)

const otpStore=new Map();

app.post("/send-otp",async(req,res)=>{
    const {email}=req.body;
    try{
      const otp=Math.floor(1000+Math.random()*9000).toString();
      otpStore.set(email,{otp,expiresAt:Date.now()+5*60*1000});
  
      const mailOptions={
        from:"support@campusconnect.me",
        to:email,
        subject: "Your OTP Code",
        html:`
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4CAF50;">OTP Verification</h2>
            <p>Dear Campus Connect User,</p>
            <p>Your OTP code is: <strong>${otp}</strong></p>
            <p>This code will expire in 5 minutes. Do not share it with anyone.</p>
            <p>Best regards,</p>
            <p><strong>Campus Connect Team</strong></p>
          </div>
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({
        success:true,
        message:"OTP SENT.",
      });
    }catch(error){
      if(error.responseCode===550||error.code==="EAUTH"){
        return res.status(402).json({
          error: "INVALID EMAIL ADDRESS OR OTP NOT DELIVERABLE.",
        });
      }
      res.status(500).json({
        error: "FAILED TO SEND OTP. TRY AGAIN LATER.",
      });
    }
});

app.post("/verify-otp",async(req,res)=>{
    const {email,OTP}=req.body;
    const storedData=otpStore.get(email);
  
    try{
      if(!storedData){
        return res.status(403).json({error: "OTP NOT FOUND IN STORED DATA."});
      }
      if(Date.now()>storedData.expiresAt){
        otpStore.delete(email);
        return res.status(403).json({error:"OTP HAS EXPIRED."});
      }
      if(storedData.otp.toString()!==OTP.toString()){
        return res.status(403).json({error:"INVALID OTP"});
      }
      otpStore.delete(email);
      res.status(200).json({message:"OTP VERIFICATION SUCCESSFUL."});
    }catch(error){
      res.status(403).json({error:"OTP VERFICATION FAILED."});
    }
});
  
app.post("/register", async(req,res)=>{

    const {name, email,password,telno,avatar}=req.body;
    const hashedPassword=bcrypt.hashSync(password,bcryptSalt);

        if(!name){
            return res.status(400).json("NAME IS REQUIRED.");
        }
        else if(!email){
            return res.status(400).json("EMAIL IS REQUIRED.");
        }
        else if(!password){
            return res.status(400).json("PASSWORD IS REQUIRED.");
        }
        else if(!telno){
            return res.status(400).json("PHONE NUMBER IS REQUIRED.");
        } 
        else if(!avatar){
            return res.status(400).json("AVATAR KEY IS REQUIRED.");
        } 
    
        const exists=await user.find({email});
        if(exists.length===0){
            const userData=await user.create({name,email,password:hashedPassword,telno,avatar})
            res.status(200).json(userData);
        }
        else{
            return res.status(422).json("USER ALREADY EXISTS. PLEASE LOGIN.")
        } 
})

app.post("/login",async(req,res) => {
        const { password, email }=req.body;
        const userData=await user.findOne({ email });
        if(!userData){
            return res.status(422).json("USER NOT FOUND");
        }
        const checkPass=bcrypt.compareSync(password, userData.password);
        if(checkPass){
            jwt.sign({email:userData.email,id: userData._id},"1234567890",{expiresIn:'365d'},(err,token)=>{
                if (err) throw err;
                res.json({token});
            });
        }
        else{
            return res.status(422).json("INVALID CREDENTIALS");
        }
});

app.get('/profile',async(req,res)=>{
    try{
        const authHeader=req.headers['authorization'];
        const token=authHeader.split(' ')[1];
        if(!token){
            return res.json(null);
        }
        jwt.verify(token,"1234567890",async(err,tokenData)=>{
            if(err){
                return res.status(401).json({error:"INVALID OR EXPIRED TOKEN."});
            }
            const userData=await user.findById(tokenData.id);
            if(!userData){
                return res.status(404).json({ error:"USER NOT FOUND"});
            }
            const {name,email,_id,avatar}=userData;
            res.json({name,email,_id,avatar,token});
        });
    }catch(error){
        res.status(500).json({error:"SERVER ERROR"});
    }
});


app.post('/logout',(req,res)=>{
        res.cookie('token','',{
            httpOnly:true,
            secure: true,
            sameSite: 'none',
            path: '/',
            domain:undefined,
            expires:new Date(0),
        }).json("LOGGED OUT")
    });


app.post('/reserve',(req,res)=>{

    const {token}=req.cookies;
    const {name,numberOfPeople,telno,eventId,eventName,eventDate,eventTime}=req.body;
    if(!token){
        return res.json(null);
    }
    if(token){
        jwt.verify(token,"1234567890",async(err,tokenData)=>{
            if(err){
                return res.status(401).json({error:"INVALID OR EXPIRED TOKEN."});
            }
            function sendConfirmationEmail(bookingData){
                const mailOptions={
                    from: 'support@campusconnect.me',
                    to: `${tokenData.email}`,
                    subject: 'RESERVATION CONFIRMATION',
                    html:`
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h2 style="color: #4CAF50;">Event Reservation Confirmation</h2>
                            <p>Dear ${bookingData.name},</p>
                            <p>Your reservation at <strong>${eventName}</strong> has been confirmed.</p>
                            <p><strong>Details of Your Reservation:</strong></p>
                            <ul style="list-style: none; padding: 0;">
                                <li><strong>Date:</strong> ${eventDate}</li>
                                <li><strong>Reservation Time:</strong> ${eventTime}</li>
                                <li><strong>Number of People:</strong> ${bookingData.numberOfPeople}</li>
                            </ul>
                            <p>Thank you for choosing us!</p>
                            <p>Best regards,</p>
                            <p><strong>Campus Connect Team</strong></p>
                        </div>
                    `,
                }
                transporter.sendMail(mailOptions,(error)=>{
                    if(error){
                        throw error;
                    }
                });
            };
            const existingReservation=await reservation.findOne({eventId,userId:tokenData.id});
            if(existingReservation){
                return res.status(422).json({MSG:"ALREADY RESERVED."});
            }
            const bookingData=await reservation.create({
                name,
                numberOfPeople,
                telno,
                eventId,
                userId:tokenData.id,
                venueName:eventName,
                Date:eventDate,
                Time:eventTime
            });
            sendConfirmationEmail({
                name:name,
                email:tokenData.email,
                numberOfPeople,
                eventName,
                eventTime,
                eventDate
            });
            res.json(bookingData);
        })
    }
})

app.post('/reserve-restaurant',(req,res)=>{

    const {token}=req.cookies;
    const {name,numberOfPeople,telno,restaurantId,restaurantName,bookingDate,selectedSlot}=req.body;
    if(!token){
        return res.json(null);
    }
    if(token){
        jwt.verify(token,"1234567890",async(err,tokenData)=>{
            if(err){
                return res.status(401).json({error:"INVALID OR EXPIRED TOKEN."});
            }
            function sendConfirmationEmail(bookingData) {
                const mailOptions={
                    from: 'support@campusconnect.me',
                    to: `${tokenData.email}`,
                    subject: 'RESERVATION CONFIRMATION',
                    html: `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h2 style="color: #4CAF50;">Reservation Confirmation</h2>
                            <p>Dear ${bookingData.name},</p>
                            <p>Your reservation at <strong>${restaurantName}</strong> has been confirmed.</p>
                            <p><strong>Details of Your Reservation:</strong></p>
                            <ul style="list-style: none; padding: 0;">
                                <li><strong>Date:</strong> ${bookingDate}</li>
                                <li><strong>Number of People:</strong> ${bookingData.numberOfPeople}</li>
                                <li><strong>Time SLOT:</strong> ${selectedSlot}</li>
                            </ul>
                            <p>Thank you for choosing us!</p>
                            <p>Best regards,</p>
                            <p><strong>Campus Connect Team</strong></p>
                        </div>
                    `,
                }
                transporter.sendMail(mailOptions,(error)=>{
                    if(error){
                        throw error;
                    }
                });
            };
            
            const existingReservation=await reservation.findOne({restaurantId,userId:tokenData.id});
            if(existingReservation){
                return res.status(422).json({MSG:"ALREADY RESERVED."});
            }
                const bookingData=await reservation.create({
                    name,
                    numberOfPeople,
                    telno,
                    restaurantId,
                    userId:tokenData.id,
                    venueName:restaurantName,
                    Date:bookingDate,
                    timeSlot:selectedSlot
                });
            sendConfirmationEmail({
                name:name,
                email:tokenData.email,
                numberOfPeople,
                restaurantName,
                selectedSlot
            });
            res.json(bookingData);
        })
    }
})


app.get('/show-reservation', async(req,res)=>{
    const {token}=req.cookies;
    if(!token){
        return res.json(null);
    }
    if(token){
        jwt.verify(token,"1234567890",async(err,tokenData)=>{
            if(err){
                return res.status(401).json({error:"INVALID OR EXPIRED TOKEN."});
            }         
            const reservationData=await reservation.find({userId:tokenData.id});
            if(reservationData.length>0){
                res.json(reservationData)
            }
            else{
                res.json(null);
            }
        });
    }
    else{
        res.json(null);
    }
})

app.delete('/cancel', async(req,res)=>{
    const {token}=req.cookies;
    const {eventId}=req.body;
    if(!token){
        return res.json(null);
    }
    if(token){
        jwt.verify(token,"1234567890",async(err,tokenData)=>{
            if(err){
                return res.status(401).json({error:"INVALID OR EXPIRED TOKEN."});
            }
            function sendConfirmationEmail(deletedReservation) {
                const mailOptions={
                    from: 'support@campusconnect.me',
                    to: `${tokenData.email}`,
                    subject: 'RESERVATION CANCELLATION',
                    html: `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <h2 style="color: #FF6347;">Reservation Cancellation Notice</h2>
                            <p>Dear ${deletedReservation.name},</p>
                            <p>We regret to inform you that your reservation at <strong>${deletedReservation.venueName}</strong> has been cancelled.</p>
                            <p><strong>Details of the Cancelled Reservation:</strong></p>
                            <ul style="list-style: none; padding: 0;">
                                <li><strong>Name:</strong> ${deletedReservation.name}</li>
                                <li><strong>Number of People:</strong> ${deletedReservation.numberOfPeople}</li>
                            </ul>
                            <p>Thank you for choosing us. We hope to serve you again in the future.</p>
                            <p>Best regards,</p>
                            <p><strong>Campus Connect Team</strong></p>
                        </div>
                    `,
                }
                transporter.sendMail(mailOptions,(error)=>{
                    if(error){
                        throw error;
                    }
                });
            };        
            const deletedReservation=await reservation.findByIdAndDelete(eventId);  
            sendConfirmationEmail(deletedReservation);
            res.json(deletedReservation);
        });
    }
})

app.put('/likeevent',async(req,res)=>{
    const {eventId}=req.body;
    const {token}=req.cookies;
    if(!token){
        return res.json(null);
    }
    if(token){
        jwt.verify(token,"1234567890",async(err,tokenData)=>{
            if(err){
                return res.status(401).json({error:"INVALID OR EXPIRED TOKEN."});
            }     
            await user.findByIdAndUpdate(tokenData.id,{$addToSet:{likedEvents:eventId}}, { new: true });
            return res.status(200).json({MSG:"OK"});
            
        });
    }
})

app.put('/dislikeevent',async(req,res)=>{
    const {eventId}=req.body;
    const {token}=req.cookies;
    if(!token){
        return res.json(null);
    }
    if(token){
        jwt.verify(token,"1234567890",async(err,tokenData)=>{
            if(err){
                return res.status(401).json({error:"INVALID OR EXPIRED TOKEN."});
            }         
            await user.findByIdAndUpdate(tokenData.id,{$pull:{likedEvents: eventId}}, { new: true });
            return res.status(200).json({MSG:"OK"});    
        });
    }
})

app.put('/likeres',async(req,res)=>{
    const {restaurantId}=req.body;
    const {token}=req.cookies;
    if(!token){
        return res.json(null);
    }
    if(token){
        jwt.verify(token,"1234567890",async(err,tokenData)=>{
            if(err){
                return res.status(401).json({error:"INVALID OR EXPIRED TOKEN."});
            }        
            await user.findByIdAndUpdate(tokenData.id,{$addToSet:{likedRestaurants:restaurantId}},{ new: true });
            return res.status(200).json({MSG:"OK"});
        });
    }
})

app.put('/dislikeres',async(req,res)=>{
    const {restaurantId}=req.body;
    const {token}=req.cookies;
    if(!token){
        return res.json(null);
    }
    if(token){
        jwt.verify(token,"1234567890",async(err,tokenData)=>{
            if(err){
                return res.status(401).json({error:"INVALID OR EXPIRED TOKEN."});
            }         
            await user.findByIdAndUpdate(tokenData.id,{$pull:{likedRestaurants: restaurantId}}, { new: true });
            return res.status(200).json({MSG:"OK"});   
        });
    }
})

app.get("/getlikecount",async(req, res)=>{
    const {eventId}=req.query;
    const data=await user.find({});
    let totalCount=0;

    data.forEach(user=>{
        const likedEventArray=user.likedEvents;
        likedEventArray.forEach(likedEvent=>{
            if(likedEvent==eventId){
                totalCount++;
            }
        });
    });
    res.json(totalCount); 
});

app.get("/getlikecountres", async(req,res)=>{

    const {restaurantId}=req.query;
    const data = await user.find({});
    let totalCount=0;

    data.forEach(user=>{
        const likedRestaurantArray = user.likedRestaurants;
        likedRestaurantArray.forEach(likedRestaurants=>{
            if(likedRestaurants==restaurantId){
                totalCount++;
            }
        });
    });
    res.json(totalCount);
})

app.put('/forgetpass',async(req,res)=>{
    const {email,newpassword}=req.body;
    const hashedPassword=bcrypt.hashSync(newpassword,bcryptSalt);
    const Founduser=await user.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true, useFindAndModify: false }
    );
    if(!Founduser){
        return res.status(422).json("USER NOT FOUND");
    }
    res.json({MSG:"OK"})
});

app.post('/create-order',async(req,res)=>{
    const {amount}=req.body;
    const options={
        amount:amount*100,
        currency:"INR",
    }
    try{
        const order=await razorpay.orders.create(options);
        res.json(order); 
    }catch(error){
        res.status(500).json({error:"FAILED TO CREATE RAZORPAY ORDER"});
    }
})

// app.post("/send-notification", async (req, res) => {
//     try {
//       const { tokens, title, body, data } = req.body;
  
//       if (!tokens || !tokens.length) {
//         return res.status(400).json({ error: "No tokens provided" });
//       }
  
//       const messages = tokens.map((token) => ({
//         to: token,
//         sound: "default",
//         title: title || "Campus Connect",
//         body: body || "🚀 New Event Alert! Check it out now!",
//         data: data || { someData: "Extra data if needed" },
//       }));
  
//       const response = await axios.post("https://exp.host/--/api/v2/push/send", messages, {
//         headers: {
//           Accept: "application/json",
//           "Accept-Encoding": "gzip, deflate",
//           "Content-Type": "application/json",
//         },
//       });
  
//       res.json({ message: "Notification sent successfully", data: response.data });
//     } catch (error) {
//       console.error("Error sending notification:", error);
//       res.status(500).json({ error: "Failed to send notification" });
//     }
//   });
  

app.listen(3000);