import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email } = req.body;
        try {
          const userFound = await userModel.findOne({ email: username }); //email:usernaem = email: email
          if (userFound) {
            console.log("Usuario ya existe");
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
          };
          const user = await userModel.create(newUser);

          return done(null, user);
        } catch (error) {
          return done(`error al crear el usuario ${error}`, false);
        }
      }
    )
  );
};

// EXTRACTOR
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["authCookie"];
  }
  return token;
};
export default initializePassport;
