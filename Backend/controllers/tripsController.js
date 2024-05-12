const Trip = require("../models/tripsModel")
const User = require("../models/userModel")


const registerTrip =  async(req, res) => {
    const { title, country, city, coordinates, } =  req.body;
    const user = await User.findById(req.user)

    const trip = Trip({
        user,
        title,
        destination: {
            country,
            city,
            coordinates
        }

    })

    try {
        if (!country|| !city || !coordinates){
            return res.status(400).json({message: "All fields required"})
        }

        await trip.save();
        res.status(200).json({messege: "Trip registered"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }


}

module.exports = { registerTrip}