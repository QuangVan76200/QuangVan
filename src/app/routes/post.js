const express = require('express');
const router = express.Router();
const verifyToken= require('../middlware/auth')
const Accounts  = require('../models/Accounts');



const Post = require('../models/Post')

//GET POST
router.get('/show_post', verifyToken, async(req, res, next)=>{
    try {
        const posts= await Post.find({IDUser: req.UserID})
    res.json({
        success:true, posts
    })
    } catch (error) {
         return res.json({
            success:false,
            message:'Internal server error'
    })
}
})



//CREATE POST
router.post('/news_post',verifyToken, async(req, res)=>{
    const {title, descpription, status, idImage, IDUser}=req.body; 
     

    // router.get('/auth',verifyToken)

    if(!title){
        return res.json({
           success:true,
           message:'Title is required',
        })
    }
    try {
        const account = Accounts.findById({_id: req.UserID}).select('_id');
        if(!account)
        return res.json({
            message:'id User invalid',
            success:false
        })
        const newPost= new Post({
            title,
            descpription,
            idImage,
            status:'Normal Post' || 'Sales Post',
            IDUser: req.UserID
            
            
        })
        await newPost.save()

         return res.json({
            success:true,
            message:'successful',
            post:newPost
        })
    } catch (error) {
        return res.json({
            success:false,
            message:'Internal server error'
        })
    }
})


//UPDATE POST
router.put('/:id', verifyToken, async(req, res, next)=>{
    const {tiltle, descpription, status, idImage}=req.body;

    if(!title){
        return res.json({
           success:false,
           message:'Title is required',
        })
    }
    try {
        const updatedPost= {
            title,
            descpription: descpription || ' ',
            status: status || 'NORMAL POST',
            idImage: idImage || ' '
        }
  
    const postUpdate={_id: req.params.id, user: req.UserID,}

    
    updatedPost= await Post.findOneAndUpdate(postUpdate, updatedPost, {new: true})
    if(!updatedPost){
        return res.json({
            success:false,
            message: 'post not found or user not authorised'
        })
    }
    res.json({
        success:true,
        message:'Completed', post:updatedPost,
    })

        
    } catch (error) {
         return res.json({
            success:false,
            message:'Internal server error'
        })
    }
})

router.delete('/delete_Post',verifyToken,async(req, res, next)=>{
    try {
        const postDelete ={_id: req.params.id, user:req.UserID}
        const deletePost = await Post.findOneAndDelete(postDelete)
    
        if(!deletePost){
            return res.json({
                success:false,
                message: 'post not found or user not authorised'
            })
        }
        res.json({
            success:true,
            message:'Completed', post:updatedPost,
        })
    }
    
    catch (error) {
        return res.json({
            success:false,
            message:'Internal server error'})
    }
})



module.exports=router
