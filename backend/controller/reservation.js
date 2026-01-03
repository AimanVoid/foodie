import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";


console.log("Reservation model keys:", Object.keys(Reservation.schema.paths));

export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, date, time } = req.body;
    if(!firstName || !lastName || !email || !phone || !date || !time){
        return next(new ErrorHandler("PLease fill full reservation form!", 400));
    }
    try {
        await Reservation.create({
            firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), phone: phone.trim(), date: date.trim(), time: time.trim()
        });
        res.status(201).json({
            success: true,
            message: "Reservation sent successfully!",
        });
    } catch (error) {
        if(error.name === 'ValidationError'){
            const validationErrors = Object.values(error.errors).map(err=>err.message);
            return next(new ErrorHandler(validationErrors.join(","), 400));
        }
        return next(error);
    }
};

