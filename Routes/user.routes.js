import { userLogin, userRegistration } from "../Controller/user.controller.js";

export function userRoute(app){
    app.post("/api/register",userRegistration);
    app.post("/api/login", userLogin)
}