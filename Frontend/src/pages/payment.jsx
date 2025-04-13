import { Box, Container, Paper, Typography } from '@mui/material'
import { useEffect } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../assets/icons/logo.svg"
import axios from 'axios';
import { toast } from 'react-toastify';
export default function SuccessPayment() {
    const location = useLocation();
    const navigate = useNavigate();
    // تحويل الـ query string لكائن
    const queryParams = new URLSearchParams(location.search);
  
    const id = queryParams.get("id");
    const success = queryParams.get("success");
    const orderId = queryParams.get("order");
    const message = queryParams.get("data.message"); 
   
    useEffect(() => {
        async function handleSuccess() {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_NODE_URL}/payment/callback`,{ id,success,orderId,message })
                if(response.data.success==true){
                        toast.success(response.data.message, {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: false,
                          progress: undefined,
                        });
                        setTimeout(() => {
                            navigate("/"); // ← بعد 5 ثواني يرجع للصفحة الرئيسية
                        }, 5000);
                    }
            }
            catch (err) {
                console.error(err);
            }
        }
        handleSuccess()
    }, [])

    return (
            <Container sx={{ marginTop: "120px" }}>
                <Paper sx={{ width: "450px", margin: "80px auto", borderRadius: "12px", padding: "20px",background:"#6D63FF"}}
                >
                    <div className='flex justify-center my-5'><img src={logo} alt={logo} width={100} /></div>
                    <Box sx={{
                        width: "55px", height: "55px", backgroundColor: "#40D186", borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center", margin: "auto",
                    }}>
                        <CheckIcon sx={{ color: "white", fontSize: "34px" }} />
                    </Box>
                    <Typography sx={{ textAlign: "center", fontSize: "22px", fontWeight: "600", marginTop: "20px" ,color:"#fff"}}>Payment completed successfully</Typography>
                </Paper>
                {/* <div>
      <h1>Payment Status</h1>
      <p>Transaction ID: {id}</p>
      <p>Success: {success}</p>
      <p>Order ID: {orderId}</p>
      <p>Message: {message}</p>
    </div> */}
            </Container>
    )
}
