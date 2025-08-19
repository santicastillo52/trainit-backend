import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import prisma from '../providers/prisma.provider';


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return done(null, false, { message: 'Credenciales inválidas' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return done(null, false, { message: 'Credenciales inválidas' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));


if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno');
}


passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, async (payload: any, done: any) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: payload.id }
        });

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

export default passport;
