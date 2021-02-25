import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import crypto from 'crypto';
import Validator from '../utils/validator.js'
import Response from '../utils/Response.js'
const {config} = pkg;
import pkg from 'dotenv';
import {comparePassword, hashPassword,jwtToken } from '../utils/jwToken.js';

const className = "Authentication";
class Authentication {
    /**
     * User Registration
     * @param {Object[]} req - Request
     * @param {Object[]} res - Response
     * @returns {Object[]} Response Object with its status
     */
    static async registration(req,res) {
      const { name, email,password } = req.body;
      const { error } = Validator.validateRegister(req.body)
        
        if (error) {
            if (error.details) return Response.send400(res, error.details[0].message);
            else return Response.send400(res, error.message);
          }

          try {
            if (await User.findOne({ email })) {
              return Response.send409(res, "Email already exists");
            }
            
            const ActivationCode = crypto.randomBytes(20).toString('hex');
            const user = new User({ name, email,password, ActivationCode });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
            Response.send201(res, "User registered successfully!", {
              token: jwt.sign(
                {
                  email: user.email
                },
                process.env.SECRET_OR_KEY
              ),
              user: {
                names: user.name,
                email: user.email
              }
            });
              
          } catch (error) {
            Response.sendFailure(res, error, "Something went wrong", className);
        }
        
 
        }

 
    /**
   * User sign in or log in
   * @param {Object[]} req - Request
   * @param {Object[]} res - Response
   * @returns {Object[]} Response Object with its status
   */
  static async LogIn(req, res) {
    const { email, password } = req.body;
    const { error } = Validator.validateLogin(req.body);
    if (error) {
      if (error.details) return Response.send400(res, error.details[0].message);
      else return Response.send400(res, error.message);
    }

    try {
      var user = await User.findOne({ email });
      if (!user) {
        return Response.send409(res, "Invalid Email");
      }
      // var canLogin = bcrypt.compare(password, user.password);
     if (user && comparePassword(password, user.password)) {
      const token = jwtToken.createToken(user);
        
      return res.status(200).send({ message : "User logged in successfully",token , user  }); 
    }
    return res.status(400).send({ status: 400, error: 'invalid email/password combination ' });
              
            } catch (error) {
              Response.sendFailure(res, error, "Something went wrong", className);
          }
  }


  /**
   * Forgot password 
   * @param {Object[]} req - Request
   * @param {Object[]} res - Response
   * @returns {Object[]} Response Object with its status
   */
  static async forgotPassword(req,res) {
    const { email } = req.body;
    const { error } = Validator.validateForgot(req.body);
    if (error) {
      if (error.details) return Response.send400(res, error.details[0].message);
      else return Response.send400(res, error.message);
    }

    try {
      const findUser = await User.findOne({ email });
      if (!findUser) {
        return Response.send409(res, "Invalid Email");
      }
      const passwordToken = crypto.randomBytes(20).toString("hex");
      const passwordExpires = Date.now() + 3600000; //1 Day
      const check = await User.findOneAndUpdate(
        { email: findUser.email },
        {
          passwordToken: passwordToken,
          passwordExpires: passwordExpires
        },
        { new: true }
      );
     
        Response.send201(res, {
          token: jwt.sign(
            {
              email: email,
              passwordToken: passwordToken
            },
            process.env.SECRET_OR_KEY
          ),
          user: {
            names: findUser.name,
            email: findUser.email,
            id: findUser.id,
            passwordToken: findUser.passwordToken
          }
        });
    } catch (error) {
      Response.sendFailure(res, error, className);
    }
  }
/**
   * Reset password 
   * @param {Object[]} req - Request
   * @param {Object[]} res - Response
   * @returns {Object[]} Response Object with its status
   */
  static async resetPassword(req,res) {
    let { email, password } = req.body;
    let { token } = req.headers.token
    const { error } = Validator.validateReset(req.body);
    if (error) {
      if (error.details) return Response.send400(res, error.details[0].message);
      else return Response.send400(res, error.message);
    }

    try {
      const findUser = await User.findById(req.params.id);
      if (!findUser) {
        return Response.send409(res, "Can't find user");
      }
      const validToken = await User.findOne({ passwordToken: token });
      if (!validToken) {
        return Response.send400(res, "Expired or Invalid Token");
      }

      password = bcrypt.hashSync(password, 10);
        await User.findOneAndUpdate(
        { email: email },
        {
          password: password,
          passwordToken: null,
          passwordExpires: null
        },
        { new: true }
      );
        Response.send201(res, "Forgot password reset successfully ", {
          token: jwt.sign(
            {
              email: findUser.email,
              passwordToken: findUser.passwordToken
            },
            process.env.SECRET_OR_KEY
          ),
          user: {
            names: findUser.name,
            email: findUser.email
          }
        });
    } catch (error) {
      Response.sendFailure(res, error, className);
    }
  }
}
export default Authentication;