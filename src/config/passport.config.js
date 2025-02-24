import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import env from "./env.config.js";
import cookieExtractor from "../utils/cookieExtractor.js";
import userController from "../controllers/users.controller.js";
import { generateToken } from "../utils/jwt.js";
import { compareHash } from "../utils/bcrypt.js";
import { authError, validationError } from "../utils/errorsHandler.js";
import Validator from "../utils/validator.js";

const JwtStratgy = JwtStrategy;
const extractJwt = ExtractJwt;
const JWT_SECRET = env.jwt_secret;

const validate = new Validator();

const initializePassport = () => {
  // REGISTER STRATEGY
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },

      async (req, username, password, done) => {
        const newUser = req.body;

        const { first_name, last_name, age } = req.body;

        try {
          // VALIDATORS
          if (!validate.password(password))
            throw new validationError(
              "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
            );

          if (!validate.email(username))
            throw new validationError(
              "Email must be a valid email address (e.g., example@domain.com)."
            );

          if (first_name) {
            if (!validate.firstName(first_name))
              throw new validationError(
                "First name can only contain letters, accents, apostrophes, hyphens, and spaces."
              );
          }

          if (last_name) {
            if (!validate.lastName(last_name))
              throw new validationError(
                "Last name is required and must be at least 2 characters long."
              );
          }

          if (age) {
            if (!validate.age(age))
              throw new validationError(
                "Age is required and must be at least 2 digits long."
              );
          }

          const user = await userController.createOne(newUser);

          if (!user) throw new authError("Fail creating user");

          return done(null, { user });
        } catch (e) {
          return done(e, false);
        }
      }
    )
  );

  // LOGIN STRATEGY
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },

      async (username, password, done) => {
        try {
          const userFound = await userController.getOneByEmail(username);

          if (!userFound) throw new authError("User not found");

          const isValidPass = await compareHash(password, userFound.password);

          if (!isValidPass) throw new authError("Invalid password");

          const userToken = {
            id: userFound._id,
            first_name: userFound.first_name,
            email: userFound.email,
            role: userFound.role,
            cart: userFound.cart,
          };

          let token = await generateToken(userToken);

          if (!token) throw new authError("Fail generating token");

          return done(null, { token, userToken });
        } catch (e) {
          return done(e, false);
        }
      }
    )
  );

  // CURRENT STRATEGY
  passport.use(
    "current",
    new JwtStratgy(
      {
        jwtFromRequest: extractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (e) {
          return done(e, false);
        }
      }
    )
  );
};

export default initializePassport;
