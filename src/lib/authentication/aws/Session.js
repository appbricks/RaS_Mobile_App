/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { Auth, AmazonCognitoIdentity } from "aws-amplify";

import Logger from "../../utils/Logger";

import {
  AUTH_NO_MFA,
  AUTH_MFA_SMS,
  AUTH_MFA_TOTP
} from "../Session"

const MFA_TOTP = "TOTP";
const MFA_SMS = "SMS";
const NO_MFA = "NOMFA";

/**
 * AWS Cognito user session. 
 */
export default class Session {

  constructor() {
    this.logger = new Logger("AwsAuthSession");
    this.cognitoUser = null
  }

  async validateSession() {

    try {
      let session = await Auth.currentSession();
      if (session != null) {

        if (!this.cognitoUser) {
          this.cognitoUser = await Auth.currentAuthenticatedUser();
        }
        this.logger.debug("auth session is valid: ", session, this.cognitoUser);

        return true;
      } else {
        return false;
      }

    } catch (exception) {
      this.logger.warn("validating current auth session: ", exception);

      return false;
    }
  }

  /**
   * 
   * @param {*} cognitoUser 
   */
  _setCognitoUser(cognitoUser) {
    this.cognitoUser = cognitoUser;
  }

  /**
   * 
   * @param {*} user         User object to populate with attributes read 
   *                         from cognito
   * @param {*} attribNames  List of attributes to read and populate user 
   *                         object with. If this argument is not provided 
   *                         then all attributes will be read
   */
  readUser(user, attribNames?) {

    let logger = this.logger;
    let cognitoUser = this.cognitoUser;

    return new Promise(function (resolve, reject) {

      Auth.userAttributes(cognitoUser)
        .then(
          attributes => {
            logger.debug("reading attributes", attribNames,
              " from user attributes:", attributes);

            attributes
              .filter(
                a => !attribNames || attribNames.find(
                  name => (name == a.getName())
                )
              )
              .map(a => {

                switch (a.getName()) {
                  case "email":
                    user.emailAddress = a.getValue();
                    break;
                  case "phone_number":
                    user.mobilePhone = a.getValue();
                    break;
                  case "email_verified":
                    user.emailAddressVerified = (a.getValue() == "true");
                    break;
                  case "phone_number_verified":
                    user.mobilePhoneVerified = (a.getValue() == "true");
                    break;
                  case "custom:preferences":
                    prefs = JSON.parse(a.getValue());
                    user.enableBiometric = prefs.enableBiometric;
                    user.enableMFA = prefs.enableMFA;
                    user.enableTOTP = prefs.enableTOTP;
                    user.rememberFor24h = prefs.rememberFor24h;
                    break;
                }
              })

            logger.debug("read user: ", user);
            resolve(user);
          },
          error => {
            reject(error);
          }
        )
        .catch(exception => {
          reject(exception);
        });
    });
  }

  /**
   * 
   * @param {*} user 
   */
  async saveUser(user, attribNames?) {

    let attributes = {};

    [
      "email",
      "email_verified",
      "phone_number",
      "phone_number_verified",
      "custom:preferences"
    ]
      .filter(
        a => !attribNames || attribNames.find(
          name => (name == a)
        )
      )
      .map(a => {

        switch (a) {
          case "email":
            attributes = Object.assign(attributes, {
              email: user.emailAddress
            });
            break;
          case "phone_number":
            attributes = Object.assign(attributes, {
              email_verified: user.emailAddressVerified
            });
            break;
          case "email_verified":
            attributes = Object.assign(attributes, {
              phone_number: user.mobilePhone
            });
            break;
          case "phone_number_verified":
            attributes = Object.assign(attributes, {
              phone_number_verified: user.mobilePhoneVerified
            });
            break;
          case "custom:preferences":
            attributes = Object.assign(attributes, {
              "custom:preferences": JSON.stringify({
                enableBiometric: user.enableBiometric,
                enableMFA: user.enableMFA,
                enableTOTP: user.enableTOTP,
                rememberFor24h: user.rememberFor24h
              })
            });

            this.configureMFA(user);
            break;
        }
      });

    this.logger.debug("saving user attributes: ", attributes);
    await Auth.updateUserAttributes(this.cognitoUser, attributes);
  }

  /**
   * 
   * @param {*} user 
   */
  signIn(user) {

    let logger = this.logger;
    let setCognitoUser = this._setCognitoUser.bind(this);

    return new Promise(function (resolve, reject) {

      Auth.signIn(user.username, user.password)
        .then(
          async cognitoUser => {
            logger.trace("successful sign in: ", cognitoUser);
            setCognitoUser(cognitoUser);

            switch (cognitoUser.challengeName) {
              case "SMS_MFA":
                resolve(AUTH_MFA_SMS);
              default:
                resolve(AUTH_NO_MFA);
            }
          },
          async error => {
            logger.error("sign in error: ", error);

            message = (error.invalidCredentialsMessage || error.message || error);
            switch (message) {
              case "User is not confirmed.":
                message = "notConfirmed";
                break;
              case "User does not exist.":
              case "Incorrect username or password.":
                message = "invalidLogin";
                break;
            }

            setCognitoUser(null);
            Auth.signOut();
            reject(message);
          }
        )
        .catch(exception => {

          setCognitoUser(null);
          Auth.signOut();
          reject(exception);
        });
    });
  }

  /**
   * 
   * @param {*} code 
   */
  mfaValidate(code) {

    let logger = this.logger;
    let cognitoUser = this.cognitoUser;
    let setCognitoUser = this._setCognitoUser.bind(this);

    return new Promise(function (resolve, reject) {
      Auth.confirmSignIn(cognitoUser, code)
        .then(
          cognitoUser => {
            logger.trace("confirmed sign in: ", cognitoUser);
            resolve();
          },
          error => {
            logger.error("mfa code validation error: ", error);

            message = (error.invalidCredentialsMessage || error.message || error);
            if (message == "Invalid code or auth state for the user.") {
              message = "invalidCode";
            }

            setCognitoUser(null);
            Auth.signOut();
            reject(message);
          }
        );
    });
  }

  /**
   * 
   */
  signOut() {

    let logger = this.logger;

    this._setCognitoUser(null);
    return new Promise(function (resolve, reject) {
      Auth.signOut()
        .then(
          () => {
            logger.trace("successful sign-out.");
            resolve();
          },
          error => {
            logger.error("unable sign-out: ", error);
            reject(error.message || error);
          }
        );
    });
  }

  /**
   * 
   * @param {*} user 
   */
  resetPassword(user) {
    let logger = this.logger;

    return new Promise(function (resolve, reject) {
      Auth.forgotPassword(user.username)
        .then(
          () => {
            resolve();
          },
          error => {
            logger.error("password reset error: ", error);

            message = (error.invalidCredentialsMessage || error.message || error);
            switch (message) {
              case "Username/client id combination not found.":
                message = "invalidLogin";
                break;
              case "Cannot reset password for the user as there is no registered/verified email or phone_number":
                message = "notVerified";
                break;
            }

            reject(message);
          }
        );
    });
  }

  /**
   * 
   * @param {*} user 
   * @param {*} code 
   */
  updatePassword(user, code) {
    let logger = this.logger;

    return new Promise(function (resolve, reject) {
      Auth.forgotPasswordSubmit(user.username, code, user.password)
        .then(
          () => {
            resolve();
          },
          error => {
            logger.error("unable update password: ", error);
            reject(error.message || error);
          }
        );
    });
  }

  /**
   * 
   * @param {*} user 
   * @param {*} password 
   */
  signUp(user) {

    let logger = this.logger;

    return new Promise(function (resolve, reject) {
      Auth.signUp({
        username: user.username,
        password: user.password,
        attributes: {
          email: user.emailAddress,
          phone_number: user.mobilePhone,
          "custom:preferences": JSON.stringify({
            enableBiometric: user.enableBiometric,
            enableMFA: user.enableMFA,
            enableTOTP: user.enableTOTP,
            rememberFor24h: user.rememberFor24h
          })
        }
      })
        .then(
          data => {
            logger.trace("successful sign up: ", data);
            resolve(data.userConfirmed);
          },
          error => {
            logger.error("unable sign up: ", error);
            reject(error.message || error);
          }
        );
    });
  }

  /**
   * 
   * @param {*} user 
   */
  resendSignUpCode(user) {

    let logger = this.logger;

    return new Promise(function (resolve, reject) {
      Auth.resendSignUp(user.username)
        .then(
          data => {
            logger.trace("successfully resent sign-up confirmation code");
            resolve();
          },
          error => {
            logger.error("unable send sign-up confirmation code: ", error);
            reject(error.message || error);
          }
        );
    });
  }

  /**
   * 
   * @param {*} user 
   * @param {*} code 
   */
  signUpVerify(user, code) {

    let logger = this.logger;

    return new Promise(function (resolve, reject) {
      Auth.confirmSignUp(user.username, code)
        .then(
          data => {
            user.mobilePhoneVerified = true;

            logger.trace("successful confirmation: ", data);
            resolve(user);
          },
          error => {
            logger.error("unable verify signup: ", error);
            reject(error.message || error);
          }
        );
    });
  }

  /**
   * 
   * @param {*} User object with MFA preferences
   */
  configureMFA(user) {

    let logger = this.logger;
    let cognitoUser = this.cognitoUser;

    let mfaMethod = user.enableMFA
      ? (user.enableTOTP ? MFA_TOTP : MFA_SMS)
      : NO_MFA;

    return new Promise(function (resolve, reject) {
      Auth.setPreferredMFA(cognitoUser, mfaMethod)
        .then(
          () => {
            logger.trace("successful update of MFA method.");
            resolve();
          },
          error => {
            logger.error("unable to configure MFA method: ", mfaMethod, error);
            reject(error.message || error);
          }
        );
    });
  }

  sendVerificationCodeForAttribute(attribute) {

    let logger = this.logger;
    let cognitoUser = this.cognitoUser;

    return new Promise(function (resolve, reject) {
      Auth.verifyUserAttribute(cognitoUser, attribute)
        .then(
          data => {
            logger.trace("successfully sent confirmation code " +
              "to initiate verification of attribute ", attribute);

            resolve();
          },
          error => {
            logger.error("error sending confirmation code for attribute: ", attribute, error);
            reject(error.message || error);
          }
        );
    });
  }

  confirmVerificationCodeForAttribute(attribute, code) {

    let logger = this.logger;
    let cognitoUser = this.cognitoUser;

    return new Promise(function (resolve, reject) {
      Auth.verifyUserAttributeSubmit(cognitoUser, attribute, code)
        .then(
          data => {
            logger.trace("successfully confirmed attribute ", attribute);
            resolve();
          },
          error => {
            logger.error("error confirming verification code for attribute: ", attribute, error);
            reject(error.message || error);
          }
        );
    });
  }
}
