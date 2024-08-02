const { Router } = require("express")
const Parking = require("../models/parkingSchema");
const City = require("../models/citySchema");
const Joi = require('joi');
const { Types } = require("mongoose");
const Review = require("../models/reviewSchema");

const cityRouter = Router();

//Create new parking
cityRouter.post("/", async (req, res) => {
    try {
        console.log("cityRouter")
        let { name, address, city, country, lat, long, user_id } = req.body

        // Input validation
        const schema = Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            country: Joi.string().required(),
            lat: Joi.string().required(),
            long: Joi.string().required(),
            user_id: Joi.string().required(),
        })

        const { error } = schema.validate({ name, address, city, country, lat, long, user_id });
        if (error) {
            res.status(400).json({ error: error.details[0].message });
        }
        else{
            const cityFound = await City.findOne({ city: { $regex: city, $options: 'i' } })
            console.log(cityFound)
            if(cityFound===null) {
                const newCity = await City.create({ city, country});
                res.json({ message: "City created", newCity });
            }
            
        }
    } catch (error) {
        console.error(" error - ", error);
        res.status(400).json({ error });
    }
});

// Get existing parking list
cityRouter.get("/", async (req, res) => {

    try {
        let findCity =req.query.city
        //console.log("findcity", findCity)
        if(findCity!==undefined) {
            //console.log("inside findCity")
            const locations = await City.find({city:{ $regex: findCity, $options: 'i' }});
            res.json(locations); 
        }
        else {
            const locations = await City.find();
            res.json(locations);
        }
    } catch (error) {
        console.error('error ', error);
        res.status(400).json({ error });
    }
});

// // Update parking
// parkingRouter.put("/:id", async (req, res) => {
//     try {
//         const { id } = req.params;

//         if (Types.ObjectId.isValid(id)) {
//             const parking = await Parking.findById({ _id: id })
//             if (!parking) {
//                 res.status(400).json({ error: "Provide correct parking id" })
//             }
//             else {
//                 // Input validation
//                 const schema = Joi.object({
//                     name: Joi.string().required(),
//                     address: Joi.string().required(),
//                     city: Joi.string().required(),
//                     country: Joi.string().required(),
//                     lat: Joi.string().required(),
//                     long: Joi.string().required(),
//                     user_id: Joi.string().required(),
//                 })

//                 let { name, address, city, country, lat, long, user_id } = parking;
//                 user_id = user_id.toString()
//                 const updatedParkingObj = { name, address, city, country, lat, long, user_id, ...req.body }

//                 const { error } = schema.validate(updatedParkingObj);
//                 if (error) {
//                     res.status(400).json({ error: error.details[0].message });
//                 }
//                 else {
//                     const updatedParking = await parking.updateOne(updatedParkingObj)
//                     if (updatedParking) {
//                         res.json({ message: 'Parking updated successfully' });
//                     }
//                     else {
//                         res.status(400).json({ error: 'Parking not updated' });
//                     }
//                 }
//             }
//         }
//         else {
//             res.status(400).json({ error: "Invalid id" })
//         }

//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ error });
//     }
// });

// // Delete parking
// parkingRouter.route('/:id').delete(async (req, res) => {
//     try {
//         const { id } = req.params

//         // Validate id and delete parking if exist
//         if (Types.ObjectId.isValid(id)) {
//             const parking = await Parking.findByIdAndDelete({ _id: id })

//             if (parking) {
//                 res.json({ message: "Parking deleted successfully" })
//             }
//             else {
//                 res.status(404).json({ error: "Parking not found" })
//             }
//         }
//         else {
//             res.status(400).json({ error: "Invalid parking id" })
//         }
//     } catch (error) {
//         res.status(400).json({ error })
//     }

// });


module.exports = cityRouter