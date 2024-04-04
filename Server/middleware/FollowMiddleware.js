import UserModel from "../models/userModel.js";

/* Middlewareto enhance user objectwith detailed followers and followings
Enriches request object with details about users followers list and followings list
Fetch each follower and following username, profilePicture and firstname based on their IDs stored in users document
Detailed info is the attached to the request object

*/

export const enhanceFollowerInfo = async (req, res, next) => {
    try {
        //extract user Id from request parameters
        const userId = req.params.id;

        //fetch user from database
        const user = await UserModel.findById(userId).lean();

        //if userdoesn t exist return 404 Not Found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //Fetch and enhance the followers details based on their id's
        const followersDetails = await Promise.all(
            user.followers.map(async (followerId) => {
                const follower = await UserModel.findById(followerId, 'username profilePicture firstname').lean();
                return follower;
            })
        );

         // Enhance Followings details based on id's
         const followingsDetails = await Promise.all(
            user.followings.map(async (followingId) => {
                const followings = await UserModel.findById(followingId, 'username profilePicture firstname').lean();
                return followings;
            })
        );
        
        //Filter any null values and attach detailed followers and followings to the request object
        req.enhancedFollowers = followersDetails.filter(follower => follower !== null);
        req.enhancedFollowings = followingsDetails.filter(followings => followings !== null);
            
        //callthe next middleware function
        next();
    } catch (error) {
        //Log any errors and respond wit 500 Internal Server Error
        console.error("Error enhancing follower info:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
