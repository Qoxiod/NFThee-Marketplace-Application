const mongoose = require('mongoose');
const { bidModel } = require('../../models');
const { signup,orderModel,nftIteams} = require('../../models');
const { mailerLogin } = require("../../utils/email");
const { credentials } = require('../../config').constantCredentials;

exports.createBidNft = async (req, res) => {
  try {
    // console.log(req.body);
    console.log('Checking Old Bids');
    let checkBid = await bidModel.findOne({
      // bidder: mongoose.Types.ObjectId(req.userId),
      owner: mongoose.Types.ObjectId(req.body.owner),
      nftId: mongoose.Types.ObjectId(req.body.nftId),
      orderId: mongoose.Types.ObjectId(req.body.orderId),
      bid_status: 'Bid',
    });
    console.log(checkBid);
    if (checkBid === null) {
      // let bid = await bidModel.findOneAndDelete({
      //   // bidder: mongoose.Types.ObjectId(req.userId),
      //   owner: mongoose.Types.ObjectId(req.body.owner),
      //   nftId: mongoose.Types.ObjectId(req.body.nftId),
      //   orderId: mongoose.Types.ObjectId(req.body.orderId),
      //   bid_status: 'Bid',
      // });
    }
  
      let data = {
        // bidder: req.userId,
        bidder: req.body.bidder,
        owner: req.body.owner,
        bid_status: 'Bid',
        bid_price: Number(req.body.bid_price),
        nftId: req.body.nftId,
        orderId: req.body.orderId,
        bid_quantity: req.body.bid_quantity,
        bid_deadline: req.body.bid_deadline,
      };
      const bidData = await bidModel.create(data);
      if (bidData){
        let email = "mohit.lnwebworks@gmail.com";
        let Subject = "Created Bid";
        let message = `<h3>created your Bid successfully</h3><p>to check your bid nft<a href='${credentials.BASE_FRONTEND_URL}/exploredetail/${data.nftId}'><h4>Click here</h4></a></p>`;
        console.log("mkamkkkkkkkkkkkkkkkkkkkkkkkkk", message, email);
        mailerLogin(email, message,Subject);
      }
    return {
      message: 'Bid Created Successfully',
      status: true,
      data: bidData,
    };
  }catch (error) {
    throw error
  }
};

// exports.updateBidNft = async (req, res) => {
//   try {

//     let data 
//     console.log('Checking Old Bids');
//     let bidID = req.body.bidID;
//     // let CheckBid = await bidModel.findById(bidID);
//     // console.log('checkbid',CheckBid)
   
//     // if (CheckBid) {
//       if (
//         req.body.action === 'Delete' ||
//         req.body.action === 'Cancelled' ||
//         req.body.action === 'Rejected'
//       ) 
//     // {
//          await bidModel.findOneAndDelete(
//           { _id: bidID },function (err, delBid) {
//             if (err) {
//               console.log('Error in Deleting Bid' + err);
//              throw err
//             } else {
//               console.log('Bid Deleted : ', delBid);
//               // return { message: 'Bid Cancelled', delBid };
//             }
//           }
         
//         );
//         console.log(data)

//         /* function (err, delBid) {
//             if (err) {
//               console.log('Error in Deleting Bid' + err);
//              throw err
//             } else {
//               console.log('Bid Deleted : ', delBid);
//               // return { message: 'Bid Cancelled', delBid };
//             }
//           } */
//       // }
//       // else{
//       //   return console.log('out of list',err)
          
        
//       //   // console.log('out of list')
//       // }}
//       // console.log('checkbid>>>>>>>>>::::::',CheckBid)
//       return {
//         message: 'Bid Details',
//         status: true,
//         data: data,
//       }
//       // else {
//     //     await bidModel.findOneAndUpdate(
//     //       { _id: mongoose.Types.ObjectId(bidID) },
//     //       { oBidStatus: req.body.action },
//     //       function (err, rejBid) {
//     //         if (err) {
//     //           console.log('Error in Rejecting Bid' + err);
//     //           throw err
//     //         } else {
//     //           console.log('Bid Rejected : ', rejBid);
//     //           return {status:true, message: 'Bid Rejected', rejBid };
//     //         }
//     //       }
//     //     );
//     //   }
//     // }
//     //  else {
//     //   return {message:'Bid Not Found'};
//     // }
//   } catch (error) {
//     throw error
//   }
// };

exports.updateBidNft = async (req, res) => {
  try {
    let data
    let bidID = req.body.bidID;
    if (
              req.body.action === 'Delete' ||
              req.body.action === 'Cancelled' ||
              req.body.action === 'Rejected'
            ){
   data = await bidModel.findOneAndDelete(
      { _id: bidID },
      // function (err, delBid) {
      //   if (err) {
      //     console.log('Error in Deleting Bid' + err);
      //     throw err;
      //   } else {
      //     console.log('Bid Deleted : ', delBid);
      //     return delBid;
      //   }
      // }
    );}
    console.log(data);
    return {
      message: 'Bid deleted',
      status: true,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

exports.userBids = async (req, res) => {
  try {
    let id=req.query.id
    let result = await bidModel.find({bidder:id}).populate('nftId');
    // let result = await bidModel.find({bidder:id}).populate('bidder');
    console.log(result);

    return {
      message: 'User Bid Data ',
      status: true,
      data: result,
    };
  } catch (error) {
    throw error
  }
};

// exports.fetchBidNft = async (req, res) => {

//   try {
//     // if (!req.userId) return res.send('Unauthorized Access');
//     let nftId = req.body.nftId;
//     let orderId = req.body.orderId;
//     let bidder = req.body.bidder;
//     let bid_status = req.body.bid_status;

//     console.log('data',nftId,orderId,bidder,bid_status)
    

//     let data = await bidModel.aggregate([
//       {
//         $match: {
//           $and: [
//             // { bid_quantity: { $gte: 1 } },
//             // { nftId: mongoose.Types.ObjectId(nftId) },
//             { nftId: mongoose.Types.ObjectId(nftId) },
//           ],
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           bidder: 1,
//           owner: 1,
//           bid_status: 1,
//           bid_price: 1,
//           nftId: 1,
//           orderId: 1,
//           bid_quantity: 1,
//           // oBuyerSignature: 1,
//           bid_deadline: 1,
//         },
//       },
//       // {
//       //   $lookup: {
//       //     from: 'user',
//       //     localField: 'bidder',
//       //     foreignField: '_id',
//       //     as: 'bidder_detail',
//       //   },
//       // },
//       // { $unwind: '$bidder' },
//     ])

//     console.log('Datat==>>',data, data.length);

//     return {
//       message: 'Bid Details',
//       status: true,
//       data: data,
//     }

    
//   } catch (error) {
//     throw error;
//   }
// };

// exports.acceptBidNft = async (req, res) => {
//   try {
//     return {
//       message: 'Bid Accepted Successfully',
//       status: true,
//       data: [],
//     };
//   } catch (error) {
//     throw error;
//   }
// };

exports.acceptBidNft = async (req, res) => {
  console.log(req.body);
  try {
    // if (!req.userId) return res.send('Unauthorized');
    // if (!req.body.bidID) return res.send('bid is required');
    console.log('Checking Old Bids');
    let erc721 = req.body.erc721;
    let bidID = req.body.bidID;
    let status = req.body.bid_status;
    let qty_sold = req.body.qty_sold;
    let BidData = await bidModel.findById(bidID);
    // console.log(BidData);
    let data1
    if (BidData) {
      let oNFTId = BidData.nftId;
      let orderId = BidData.orderId;
      let boughtQty = parseInt(BidData.bid_quantity);
      let oBidder = BidData.bidder;
      let BuyerData = await signup.findById(oBidder);
      let oBuyer = BuyerData.account_address;
      let oOwner = BidData.owner;
      let OwnerData = await signup.findById(oOwner);
      let oSeller = OwnerData.account_address;
      console.log('oBuyer',oBidder,oOwner,BuyerData,oBuyer,OwnerData,oSeller);
     data1= await orderModel.updateOne(
        { _id: orderId },
        {
          $set: {
            order_status: status,
            quantity_sold: qty_sold,
          },
        },
        {
          upsert: true,
        },
        // (error) => {
        //   if (error) throw error;
        // }
      );

      ///hold
      // let _NFT = await nftIteams.findOne({
      //   _id: mongoose.Types.ObjectId(oNFTId),
      // }).select('owned_by -_id');

      
        data1 = await nftIteams.findOne({ _id: mongoose.Types.ObjectId(oNFTId) });
      let currentQty = data1.nft_quantity;

      let leftQty = currentQty - boughtQty;
      if (leftQty < 1) {
        let data = await nftIteams.findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(oNFTId) },
          {
            $pull: {
              owned_by: { address: oSeller },
            },
          }
        ).catch((e) => {
          console.log('Error1', e.message);
        });
                                    //comment
        // console.log(data);
      } else {
        await nftIteams.findByIdAndUpdate(
          {
            _id: mongoose.Types.ObjectId(oNFTId),
            'owned_by.address': oSeller,
          },
          {
            $set: {
              'owned_by.$.quantity': parseInt(leftQty),
            },
          }
        ).catch((error) => {
          console.log('error2', error);
        });
      }

      console.log('Crediting Buyer',oBuyer);
      let subDocId = await nftIteams.exists({
        _id: mongoose.Types.ObjectId(oNFTId),
        'owned_by.address': oBuyer,
      });

      console.log(subDocId);
      if (subDocId) {
        console.log('Subdocument Id', subDocId);
        let _NFTB = await nftIteams.findOne({
          _id: mongoose.Types.ObjectId(oNFTId),
          'owned_by.address': oBuyer,
        }).select('owned_by -_id');
        console.log('_NFTB-------->', _NFTB,oBuyer);
        console.log(
          'Quantity found for buyers',
          // _NFTB.owned_by.find((o) => o.address === oBuyer.toLowerCase())
          //   .quantity
        );
        currentQty = _NFTB.owned_by.find(
          (o) => o.address === oBuyer.toLowerCase()
        ).quantity
          ? parseInt(
              _NFTB.owned_by.find((o) => o.address === oBuyer.toLowerCase())
                .quantity
            )
          : 0;
        let ownedQty = currentQty + boughtQty;
        await nftIteams.findOneAndUpdate(
          {
            _id: mongoose.Types.ObjectId(oNFTId),
            'owned_by.address': oBuyer,
          },
          {
            $set: {
              'owned_by.$.quantity': parseInt(ownedQty),
            },
          },
          { upsert: true, runValidators: true }
        ).catch((e) => {
          console.log('Error1', e.message);
        });
      } else {
        console.log('Subdocument Id not found');
        let dataToadd = {
          address: oBuyer,
          quantity: parseInt(boughtQty),
        };
        await nftIteams.findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(oNFTId) },
          { $addToSet: { owned_by: dataToadd } },
          { upsert: true }
        );
        console.log("wasn't there but added");
      }

      // await bidModel.findOneAndUpdate(
      //   {
      //     _id: mongoose.Types.ObjectId(bidID),
      //   },
      //   { oBidStatus: 'Accepted' },
      //   function (err, acceptBid) {
      //     if (err) {
      //       console.log('Error in Accepting Bid' + err);
      //       return res.send(err);
      //     } else {
      //       console.log('Bid Accepted : ', acceptBid);
      //     }
      //   }
      // );
      // if (erc721) {
      //   console.log('===Owner Data', oOwner, oNFTId);
      //   await bidModel.findOneAndDelete({
      //     oOwner: mongoose.Types.ObjectId(oOwner),
      //     oNFTId: mongoose.Types.ObjectId(oNFTId),
      //     // oBidStatus: 'Bid',
      //   })
      //     .then(function () {
      //       console.log('Data deleted');
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
      // } else {
      //   let _order = await orderModel.findOne({
      //     _id: mongoose.Types.ObjectId(orderId),
      //   });
      //   let leftQty = _order.oQuantity - qty_sold;
      //   if (leftQty <= 0) {
      //     await orderModel.deleteOne({ _id: mongoose.Types.ObjectId(orderId) });
      //   }
      //   console.log('left qty 1155', leftQty);
      //   await bidModel.deleteMany({
      //     oOwner: mongoose.Types.ObjectId(oOwner),
      //     oNFTId: mongoose.Types.ObjectId(oNFTId),
      //     oBidStatus: 'Bid',
      //     oBidQuantity: { $gte: leftQty },
      //   })
      //     .then(function () {
      //       console.log('Data deleted from 1155');
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
      // }
                                      //comment
        // console.log(data);

      // return res.send('updated order');
    }
    console.log('DATAAAA>:::::::::::::::::::::',data1)
    return {
      message: 'Bid updated',
      status: true,
      data: data1,
    }
  } catch (error) {
    throw error
  }
};