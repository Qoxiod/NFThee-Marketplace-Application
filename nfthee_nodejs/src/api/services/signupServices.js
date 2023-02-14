const mongoose = require('mongoose');
const fs = require('fs');
const { signup } = require('../../models');

const { sign } = require('crypto');  
const { Mail } = require('../../utils');
const jwt = require('jsonwebtoken');
const { createCollection } = require('../../models');
const {nftIteams} = require('../../models');

const { credentials } = require('../../config').constantCredentials;

exports.signupData = async (req, res) => {
  try {
    let signupDetails = {
      user_name: req.body.user_name,
      first_name: req.body.first_name,getCollection
    };

    // let checkUser = await signup.findOne({user_name:req.body.user_name});
    const isSigned = await signup.findOne({ email: req.query });
    if (isSigned) {
      return {
        message: 'User name already exists..........',
        status: false,
        data: [],
      };
    }

    const userMail = new Mail(req.body.email_address);
    await userMail.sendMail(
      userMail.email,
      `<p> Thank you for submitting request, We will review your request.</p>`,
      `Thank you for submitting request`
    );
    let result = await signup.create(signupDetails);
    return {
      message: 'Registration Data Save..........',
      status: true,
      data: result,
    };
  } catch (error) {
    return error;
  }
};

exports.signupDataAll = async (req) => {
  try {
    let result = await signup.find();
    return {
      message: 'Registration All Save Data..........',
      status: true,
      data: result,
    };
  } catch (error) {
    return error;
  }
};

exports.loginOne = async (req) => {
  try {
    const email = req.query.email_address;
    if (!email) {
      return {
        message: 'Please Provide Email!!',
        status: false,
        data: [],
      };
    } else {
      let result = await signup.findOne({ email_address: email });
      if (result) {
        return {
          message: 'Email Get............',
          status: true,
          data: result,
        };
      } else {
        return {
          message: 'Email Get............',
          status: false,
          data: [],
        };
      }
    }
  } catch (error) {
    return error;
  }
};

exports.register = async (req, res) => {
  try {
    const { email_address } = req.body;
    console.log(req.body);
    const isSigned = await signup.findOne({ email_address });
    const userMail = new Mail(req.body.email_address);
    // console.log(isSigned)
    if (!isSigned) {
      await userMail.sendMail(
        userMail.email,
        `<p> Thank you for submitting request, We will review your request.</p>`,
        `Thank you for submitting request`
      );

      const result = await signup.create(req.body);
      return {
        message: 'Registration Data Save..........',
        status: true,
        data: isSigned,
      };
    } else {
      return {
        message: 'User already exists',
        status: false,
        data: null,
      };
    }
0  } catch (err) {
    return err;
  }
};

exports.login = async (req, res) => {
  try {
    const { email_address } = req.query;
    console.log(req.body, req.query);
    const user = await signup.findOne({ email_address });
    if (user) {
      return {
        message: 'Email Get............',
        status: true,
        data: user,
      };
    } else {
      return {
        message: "User hasn't found",
        status: false,
        data: null,
      };
    }
  } catch (err) {
    return err;
  }
};
exports.updateProfile = async (req, res) => {
  console.log(req.body, 'first');
  try {
    //  console.log('req.files:::::::>', req.files);
    const profile_image = `${req.files.profile_image[0].filename}`;
    const banner_image = `${req.files.banner_image[0].filename}`;
    const upadate_data = {
      user_name: req.body.username,
      email_address: req.body.email,
      profile_image: profile_image,
      banner_image: banner_image,
      bio: req.body.bio,
      website: req.body.website,
      facebook: req.body.facebook,
      linkedin: req.body.linkedin,
      youtube: req.body.youtube,
    };
    console.log('::::::>', upadate_data);
    let result = await signup.findOneAndUpdate(
      { email_address: req.body.email },
      { $set: upadate_data }
    );
    return {
      message: 'profile updated successfully',
      status: true,
      data: result,
    };
  } catch (error) {
    return error;
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const user = await signup.findOneAndUpdate({ id: req.body.id });
    if (user) {
      return {
        message: 'Address Updated Sucessfully',
        status: true,
        data: user,
      };
    } else {
      return {
        message: "User hasn't found",
        status: false,
        data: null,
      };
    }
  } catch (error) {
    return error;
  }
};
exports.userCollections = async (req, res) => {
  try {
    let userId = req.query.id;
    // const user = await createCollection.find({ created_by: userId ,status:'pending'}); 
    const user = await createCollection.find({ created_by: userId });
    // console.log(user)
    if (user) {
      return {
        message: 'data Updated Sucessfully',
        status: true,
        data: user,
      };
    } else {
      return {
        message: "User hasn't found",
        status: false,
        data: null,
      };
    }
  } catch (error) {
    return error;
  }
};
exports.userItems = async (req, res) => {
  try {
    let userId = req.query.id;
    // const user = await createCollection.find({ created_by: userId ,status:'pending'}); 
    const user = await nftIteams.find({created_by:userId });
    console.log('<><><><><><><><><><><><><><><><><><><><><><><><><><>',user)
    if (user) {
      return {
        message: 'data Updated Sucessfully',
        status: true,
        data: user,
      };
    } else {
      return {
        message: "User hasn't found",
        status: false,
        data: null,
      };
    }
  } catch (error) {
    return error;
  }
};