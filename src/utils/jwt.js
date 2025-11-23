import jwt from "jsonwebtoken"

const ACESS_SECRET=process.env.ACESS_TOKEN_SECRET;
const ACESS_EXPIRY=process.env.ACESS_TOKEN_EXPIRY || "1d";

export function signAccessToken(payload){
    return jwt.sign(payload , ACESS_SECRET , {expiresIn : ACESS_EXPIRY});
}

export function verifyAccessToken(token){
    return jwt.verify(token , ACESS_SECRET);
}


