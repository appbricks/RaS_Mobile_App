/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { Alert } from "react-native";
import Logger from "../utils/Logger";

export const AUTH_NO_MFA = 0;
export const AUTH_MFA_SMS = 1;
export const AUTH_MFA_TOTP = 2;

export const USER_LOGGED_OUT = 0;
export const USER_LOGGED_IN = 1;
export const USER_NEEDS_AUTH = 2;

export const ATTRIB_EMAIL_ADDRESS = "email";
export const ATTRIB_MOBILE_PHONE = "phone_number";

/**
 * The session class wraps an underlying authentication provider.
 */
export default class Session {

  constructor(
    authSession,
    setReady,
    setWait,
    authValidationCallback
  ) {
    this.logger = new Logger("AuthSession");

    this.authSession = authSession;
    this.isSignedIn = false;
    this._setReady = setReady;
    this._setWait = setWait;
    this._authValidationCallback = authValidationCallback;

    this.user = null;
  }

  signIn(user, successHandler?, errorHandler?, beforeWaitHandler?) {

    this._setWait(beforeWaitHandler);
    this.logger.trace("signing in user: ", user);

    this.authSession.signIn(user)
      .then(async challange => {

        if (challange == AUTH_NO_MFA) {
          await this.authSession.readUser(user);
          this.user = user;
        }

        if (successHandler) {
          successHandler(challange);
        }
        this._setReady(await this.authSession.validateSession());
      })
      .catch(error => {
        this.logger.error("sign-in error: ", error);
        this._handleError(
          "There was a problem signing in.",
          error, errorHandler);
      });
  }

  signInMFA(user, code, successHandler?, errorHandler?, beforeWaitHandler?) {

    this._setWait(beforeWaitHandler);

    this.authSession.mfaValidate(code)
      .then(async () => {

        await this.authSession.readUser(user);

        this.user = user;
        this.logger.trace("signed in user: ", this.user.username);

        if (successHandler) {
          successHandler();
        }
        this._setReady(await this.authSession.validateSession());
      })
      .catch(error => {
        this.logger.error("mfa validate error: ", error);
        this._handleError(
          "There was a problem validating the MFA code.",
          error, errorHandler);
      });
  }

  signOut(successHandler?, errorHandler?, beforeWaitHandler?) {

    this._setWait(beforeWaitHandler);

    this.authSession.signOut()
      .then(async () => {

        this.logger.trace("signed out user: ", this.user.username);
        this.user = null;

        if (successHandler) {
          successHandler();
        }
        this._authValidationCallback();
        this._setReady(await this.authSession.validateSession());
      })
      .catch(error => {
        this.logger.error("sign-out error: ", error);
        this._handleError(
          "There was a problem signing out.",
          error, errorHandler);
      });
  }

  resetPassword(user, successHandler?, errorHandler?, beforeWaitHandler?) {

    this._setWait(beforeWaitHandler);

    this.authSession.resetPassword(user)
      .then(() => {

        if (successHandler) {
          successHandler()
        } else {
          this.logger.trace("password update for reset request successful");
        }
        this._setReady();
      })
      .catch(error => {
        this.logger.error("error initiating password reset: ", error);
        this._handleError(
          "There was a problem initiating a password reset.",
          error, errorHandler);
      });
  }

  updatePassword(user, code, successHandler?, errorHandler?, beforeWaitHandler?) {

    this._setWait(beforeWaitHandler);

    this.authSession.updatePassword(user, code)
      .then(() => {

        if (successHandler) {
          successHandler()
        } else {
          this.logger.trace("password update for reset request successful");
        }
        this._setReady();
      })
      .catch(error => {
        this.logger.error("password update error: ", error);
        this._handleError(
          "There was a problem updating the password.",
          error, errorHandler);
      });
  }

  signUp(user, successHandler?, errorHandler?, beforeWaitHandler?) {

    this._setWait(beforeWaitHandler);

    this.authSession.signUp(user)
      .then(userConfirmed => {

        if (successHandler) {
          successHandler(userConfirmed)
        } else {
          this.logger.trace(
            "sign-up completed. user confirmation status is: ",
            userConfirmed);
        }
        this._setReady();
      })
      .catch(error => {
        this.logger.error("sign-up error: ", error);
        this._handleError(
          "There was a problem with user registration.",
          error, errorHandler);
      });
  }

  signUpVerify(user, code, successHandler?, errorHandler?, beforeWaitHandler?) {

    this._setWait(beforeWaitHandler);

    this.authSession.signUpVerify(user, code)
      .then(async user => {

        try {
          this.logger.trace(
            "signing in transparently to updated MFA preferences for user: ",
            user);

          await this.authSession.signIn(user);
          await this.authSession.readUser(user, ["email", "phone_number"]);
          await this.authSession.saveUser(user);

        } catch (exception) {
          this.logger.error("error confirming sign-up: ", exception);

          this._handleError(
            "Sign-up confirmed but an error occurred updating the MFA preference.",
            exception, errorHandler);

        } finally {
          await this.authSession.signOut();
        }

        if (successHandler) {
          successHandler(user)
        } else {
          this.logger.trace("sign-up code verified");
        }

        this._setReady();
      })
      .catch(error => {
        this.logger.error("error confirming sign-up code: ", error);
        this._handleError(
          "There was a problem verifying the sign-up confirmation code.",
          error, errorHandler);
      });
  }

  resendSignUpCode(user) {

    this._setWait();

    this.authSession.resendSignUpCode(user)
      .then(() => {
        this._setReady();
      })
      .catch(error => {
        this.logger.error("error resending sign-up code: ", error);
        this._handleError(
          "There was a problem re-sending the sign-up confirmation code.",
          error);
      });
  }

  verifyAttribute(attrib, successHandler?, errorHandler?, beforeWaitHandler?) {

    this._setWait();

    this.authSession.sendVerificationCodeForAttribute(attrib)
      .then(() => {
        this._setReady();

        if (successHandler) {
          successHandler()
        }
      })
      .catch(error => {
        this.logger.error("error sending verification code: ", error);
        this._handleError(
          "There was a problem sending a code to verify your "
          + attribName(attrib) + ".",
          error, errorHandler);
      });
  }

  confirmAttribute(attrib, code, successHandler?, errorHandler?, beforeWaitHandler?) {

    this._setWait();

    this.authSession.confirmVerificationCodeForAttribute(attrib, code)
      .then(() => {
        this._setReady();

        if (successHandler) {
          successHandler()
        }
      })
      .catch(error => {
        this.logger.error("error confirming verification code: ", error);
        this._handleError(
          "There was a problem confirming the code to verify your "
          + attribName(attrib) + ".",
          error, errorHandler);
      });
  }

  saveUserLoginPrefs(user, errorHandler?, beforeWaitHandler?) {

    this._setWait(beforeWaitHandler);

    this.authSession.saveUser(user, [
      "custom:preferences"
    ])
      .then(() => this._setReady())
      .catch(error => {
        this.logger.error("error saving user: ", error);
        this._handleError(
          "There was a problem saving changes to the user attributes.",
          error, errorHandler);
      });
  }

  saveUserContactInfo(user, errorHandler?, beforeWaitHandler?) {

    this._setWait(beforeWaitHandler);

    this.authSession.saveUser(user, [
      "email",
      "email_verified",
      "phone_number",
      "phone_number_verified"
    ])
      .then(() => this._setReady())
      .catch(error => {
        this.logger.error("error saving user: ", error);
        this._handleError(
          "There was a problem saving changes to the user attributes.",
          error, errorHandler);
      });
  }

  validateUser(user) {

    this.logger.trace(
      "validating user",
      {
        username: user.username,
        emailAddress: user.emailAddress,
        mobilePhone: user.mobilePhone
      }
    );

    var userState = (!this.user && !user
      ? USER_LOGGED_OUT
      : USER_LOGGED_IN);

    if (this.user !== user) {

      userState = USER_LOGGED_OUT;

      if (!this.user && user) {

        if (user.isValid()) {

          if (this.isSignedIn
            && this.authSession.cognitoUser.username != user.username) {

            this.logger.trace(
              "terminating current session as the logged-in user",
              this.authSession.cognitoUser.username,
              "is different to the remembered user",
              user.username,
              "from state.");

            this._signOut();

          } else if (user.rememberSignIn()) {

            this.logger.trace(
              "initializing auth context with remembered user",
              user.username,
              "from state.");

            userState = USER_NEEDS_AUTH;
            this.user = user;

          } else {

            this.logger.trace(
              "signing out as user",
              user.username,
              "from state should not be remembered");

            this._signOut();
          }
        } else {
          this.logger.trace(
            "existing session will be terminated as user being validated is undefined");

          this._signOut();
        }

      } else {

        this.logger.trace(
          "signing out as user from state does not match user in context: ",
          this.user, user);

        this._signOut();
      }
    }

    this.logger.trace("current user state: ", userState);
    return userState;
  }

  validateSession() {
    this._authValidationCallback();
  }

  _signOut() {

    this._setWait();

    this.authSession.signOut().then(
      async () => {

        this.logger.trace("user log-in session has been terminated");
        this.user = null;

        this._setReady(await this.authSession.validateSession());
      }
    );
  }

  _handleError(message, error, errorHandler?) {

    this._setReady();

    if (errorHandler) {
      errorHandler(error);
    } else {
      Alert.alert(
        "Error",
        message + "\n\n\"" + error + "\"",
        [
          { text: 'OK' }
        ],
        { cancelable: true }
      );
    }
  }
}

var attribName = (attrib) => {

  switch (attrib) {
    case ATTRIB_EMAIL_ADDRESS:
      return "email address";

    case ATTRIB_MOBILE_PHONE:
      return "mobile phone";

    default:
      return attrib;
  }
}
