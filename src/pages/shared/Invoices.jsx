import { useEffect, useState } from "react";
import InvoiceCard from "@/components/shared/InvoiceCard";
import PageTitle from "@/UI/PageTitle";
import { Box, Loader } from "@mantine/core";
import { getInvoices } from "@/Util/Https/http";
import { useAuth } from "@/context/AuthContext";
import Loading from "../Loading";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    user: { token },
  } = useAuth();
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvoices(token);
        console.log(data.data );
        
        setInvoices(data.data || []); 
      } catch (error) {
        console.error("Error fetching invoices", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="bg-background-color">
      <PageTitle title="Invoices" subtitle="You can view your Invoices now." />
      <Box className="md:mx-32 mt-10 px-3 pb-14">
        {loading ? (
          <Loading />
        ) : invoices.length > 0 ? (
          invoices.map((inv) => <InvoiceCard key={inv._id} invoice={inv} />)
        ) : (
          <p className="text-center text-gray-500 mb-96 text-[30px]">No invoices found.</p>
        )}
      </Box>
    </div>
  );
}

export default Invoices;
