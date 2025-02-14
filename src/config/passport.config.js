import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { generateHash } from "../utils/bcrypt.js";
import userModel from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";

const JwtStratgy = JwtStrategy;
const extractJwt = ExtractJwt;

// COOKIE EXTRACTOR
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["authCookie"];
  }
  return token;
};

const initializePassport = () => {
  // CURRENT STRATEGY
  passport.use(
    "current",
    new JwtStratgy(
      {
        jwtFromRequest: extractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "misupersecretosuperescondido",
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // REGISTER STRATEGY
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          if (!email) {
            return done(null, false, { message: "Email is required" });
          }

          const userFound = await userModel.findOne({ email: username });
          if (userFound) {
            return done(null, false, { message: "Email already registered" });
          }

          const newUser = {
            first_name: first_name || "",
            last_name: last_name || "",
            email,
            age: age || "",
            password: generateHash(password),
          };

          const user = await userModel.create(newUser);
          const token = generateToken(user);

          return done(null, { user, token });
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

export default initializePassport;
