
const { Router } = require("express")
const Parking = require("../models/parkingSchema");
const City = require("../models/citySchema");
const Joi = require('joi');
const { Types } = require("mongoose");
const Review = require("../models/reviewSchema");

const addressRouter = Router();



addressRouter.get("/", async (req, res) => {
    try {
        const { user_id, address, city } = req.query;
        console.log(user_id)
        console.log(city)
        console.log(address)    
        let parking;
        if (user_id) {
            // parking = await Parking.find({ user_id }).populate('user_id');
            if(address) {
                parking = await Parking.find({ user_id:user_id,
                    address: { $regex: address, $options: 'i' },
                    city: { $regex: city, $options: 'i' }
                });
                console.log("userId", parking);
            }
            else {
                parking = await Parking.find({ user_id:user_id,
                    city: { $regex: city, $options: 'i' }
                });
                console.log("userId", parking);
            }
        }
        else {
            // parking = await Parking.find({}).populate('user_id');
            if(address) {
                parking = await Parking.find({city:{ $regex: city, $options: 'i' },
                address: { $regex: address, $options: 'i' }
                });
            }
            else {
                parking = await Parking.find({city:{ $regex: city, $options: 'i' }
                });
            }
            
        }
        // console.log("inside address", parking);
        const reviews = await Review.find()

        const parkingWithOwnerRatings = parking.map((item) => {
            let rating = 0;
            let count = 0;
            const userReviews = reviews.filter((review) => {
             console.log('review ', review);
             console.log('item?.user_id ', item?.user_id);
             return   review.owner_id.equals(item?.user_id?._id)
            })
            console.log('userReviews ', userReviews);
            userReviews.forEach((review) => {
                rating += review?.rating;
                count++;
            })
            owner_rating = rating > 0 ? (rating / count) : 0;

            return { ...item.toObject(), owner_rating };
        })
       
        res.json(parkingWithOwnerRatings);
    } catch (error) {
        console.error('error ', error);
        res.status(400).json({ error });
    }
});

module.exports = addressRouter