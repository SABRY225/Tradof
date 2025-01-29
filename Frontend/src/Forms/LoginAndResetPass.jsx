// import React, { useState } from "react";
// import { Link, useLocation, useParams } from "react-router-dom";
// import "../styles/LoginAndResetPass.css";
// import { useForm } from "react-hook-form";
// import {
//   Box,
//   InputLabel,
//   TextField,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import DoneIcon from "@mui/icons-material/Done";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// import Login from "../pages/Login";
// import ForgetPassword from "../pages/ForgetPassword";

// function LoginAndResetPass() {
//   const location = useLocation();
//   const { email } = useParams();
//   const [showPassword, setShowPassword] = useState(false); // لإدارة حالة رؤية كلمة المرور
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false); // لإدارة حالة رؤية تأكيد كلمة المرور
//   const {
//     control,
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => console.log(data);

//   const extractWords = () => {
//     const path = location.pathname;
//     const words = path.split("/").filter((word) => word);
//     return words;
//   };

//   const routeWords = extractWords();

//   const handleClickShowPassword = () => setShowPassword(!showPassword); // تبديل حالة الرؤية لكلمة المرور
//   const handleClickShowConfirmPassword = () =>
//     setShowConfirmPassword(!showConfirmPassword); // تبديل حالة الرؤية لتأكيد كلمة المرور
//   const handleMouseDownPassword = (event) => event.preventDefault(); // منع الإجراء الافتراضي عند النقر

//   // return (

//   //   <div className="form-template">
//   //     <div className="flex-col justify-center items-center text-center">
//   //       {routeWords == "auth" ? (
//   //         <>
//   //           <div className="title font-extrabold  md:text-4xl mb-3">
//   //             Login to your account
//   //           </div>
//   //           <div className="subTitle font-thin text-sm">
//   //             Don’t have an account?{" "}
//   //             <Link className="text-[#6C63FF]">Sign Up</Link>
//   //           </div>
//   //         </>
//   //       ) : (
//   //         <>
//   //           {routeWords == "send-email" ? (
//   //             <>
//   //               <div className="title font-extrabold text-4xl mb-3">
//   //                 Reset your password
//   //               </div>
//   //               <div className="subTitle font-thin text-sm w-80 text-start mt-4">
//   //                 To reset your password, enter your email below and submit. An
//   //                 email will be sent to you with instructions about how to
//   //                 complete the process.
//   //               </div>
//   //             </>
//   //           ) : (
//   //             <>
//   //               <div className="title font-extrabold text-4xl mb-3">
//   //                 Reset your password
//   //               </div>
//   //             </>
//   //           )}
//   //         </>
//   //       )}
//   //       <div className="route-info">
//   //         <form onSubmit={handleSubmit(onSubmit)} className="text-start">
//   //           <Box>
//   //             <InputLabel className="mt-5">
//   //               <div className="text-black">
//   //                 {routeWords == "send-email" ? "Email address" : "Email"}
//   //               </div>
//   //             </InputLabel>
//   //             {routeWords != "send-email" && routeWords != "auth" ? (
//   //               <TextField
//   //                 className="bg-[#f2f4f4] rounded-lg"
//   //                 fullWidth
//   //                 placeholder="enter your email"
//   //                 margin="dense"
//   //                 disabled
//   //                 type="email"
//   //                 defaultValue={email ? email : ""}
//   //                 {...register("example")}
//   //               />
//   //             ) : (
//   //               <TextField
//   //                 className="bg-white rounded-lg"
//   //                 fullWidth
//   //                 placeholder="enter your email"
//   //                 margin="dense"
//   //                 type="email"
//   //                 defaultValue={email ? email : ""}
//   //                 {...register("example")}
//   //               />
//   //             )}
//   //             {errors.email && (
//   //               <span className="text-red-500">This field is required</span>
//   //             )}
//   //           </Box>
//   //           {routeWords != "send-email" ? (
//   //             <Box>
//   //               <InputLabel className="mt-5">
//   //                 <div className="text-black">Password</div>
//   //               </InputLabel>
//   //               <TextField
//   //                 className="bg-white rounded-md"
//   //                 {...register("password", { required: true })}
//   //                 margin="dense"
//   //                 fullWidth
//   //                 type={showPassword ? "text" : "password"} // نوع الإدخال يعتمد على حالة الرؤية
//   //                 placeholder={
//   //                   routeWords != "send-email" && routeWords != "auth"
//   //                     ? "enter new password"
//   //                     : "enter password"
//   //                 }
//   //                 InputProps={{
//   //                   endAdornment: (
//   //                     <InputAdornment position="end">
//   //                       <IconButton
//   //                         onClick={handleClickShowPassword}
//   //                         onMouseDown={handleMouseDownPassword}
//   //                         edge="end"
//   //                       >
//   //                         {showPassword ? <VisibilityOff /> : <Visibility />}
//   //                       </IconButton>
//   //                     </InputAdornment>
//   //                   ),
//   //                 }}
//   //               />
//   //               {errors.password && (
//   //                 <span className="text-red-500">This field is required</span>
//   //               )}
//   //               {routeWords != "send-email" && routeWords != "auth" ? (
//   //                 <>
//   //                   <div className="flex">
//   //                     <DoneIcon color="disabled" />
//   //                     <div className="text-gray-400">
//   //                       Must be at least 8 characters
//   //                     </div>
//   //                   </div>
//   //                   <div className="flex">
//   //                     <DoneIcon color="disabled" />
//   //                     <div className="text-gray-400">
//   //                       Does not contain your email address
//   //                     </div>
//   //                   </div>
//   //                 </>
//   //               ) : (
//   //                 <>
//   //                   <div>
//   //                     <Link to={"/send-email"}>Forgot Password?</Link>
//   //                   </div>
//   //                 </>
//   //               )}
//   //             </Box>
//   //           ) : (
//   //             ""
//   //           )}

//   //           {routeWords != "auth" && routeWords != "send-email" ? (
//   //             <Box>
//   //               <InputLabel className="mt-5">
//   //                 <div className="text-black">Confirm Password</div>
//   //               </InputLabel>
//   //               <TextField
//   //                 className="bg-white rounded-md"
//   //                 {...register("ConfirmPassword", { required: true })}
//   //                 margin="dense"
//   //                 fullWidth
//   //                 type={showConfirmPassword ? "text" : "password"} // نوع الإدخال يعتمد على حالة الرؤية
//   //                 placeholder="enter password"
//   //                 InputProps={{
//   //                   endAdornment: (
//   //                     <InputAdornment position="end">
//   //                       <IconButton
//   //                         onClick={handleClickShowConfirmPassword}
//   //                         onMouseDown={handleMouseDownPassword}
//   //                         edge="end"
//   //                       >
//   //                         {showConfirmPassword ? (
//   //                           <VisibilityOff />
//   //                         ) : (
//   //                           <Visibility />
//   //                         )}
//   //                       </IconButton>
//   //                     </InputAdornment>
//   //                   ),
//   //                 }}
//   //               />
//   //               {errors.ConfirmPassword && (
//   //                 <span className="text-red-500">This field is required</span>
//   //               )}
//   //               <div className="flex">
//   //                 <DoneIcon color="disabled" />
//   //                 <div className="text-gray-400">
//   //                   Must be at least 8 characters
//   //                 </div>
//   //               </div>
//   //             </Box>
//   //           ) : (
//   //             ""
//   //           )}

//   //           <Box className="flex justify-center">
//   //             <button
//   //               type="submit"
//   //               className="text-white bg-[#ff6f61] font-medium rounded-lg  px-12 py-2 mt-5 text-xl w-full sm:w-auto"
//   //             >
//   //               {routeWords == "auth"
//   //                 ? "Log In"
//   //                 : routeWords == "send-email"
//   //                 ? "Reset Password"
//   //                 : "Save Password"}
//   //             </button>
//   //           </Box>
//   //         </form>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );

//   return <RestPassword/>
// }

// export default LoginAndResetPass;
