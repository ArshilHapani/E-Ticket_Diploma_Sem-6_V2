import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchInvoices } from "@/functions/api/dataFetchers";
import Spinner from "@/components/Spinner";

interface funcData {
  time: string;
  amount: number;
  id: string;
  payment_to: string;
}

const InvoicesTable = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["invoice"],
    queryFn: fetchInvoices,
    refetchInterval: 3000,
  });
  const student_rows = data?.map((data: any) =>
    createData(data.pay_time, data.pay_amount, data.pay_id, data.paid_by)
  );

  function createData(
    time: string,
    amount: number,
    id: string,
    payment_to: string
  ): funcData {
    return {
      time,
      amount,
      id,
      payment_to,
    };
  }
  if (isLoading) <Spinner message="Fetching invoices..." />;
  return (
    <>
      <div className="mt-[16vh] px-5 p-4">
        <Typography variant="h4" className="my-5 text-slate-500">
          Payments {isError && `Error fetching invoices '${error}'`}
        </Typography>
        <TableContainer component={Paper} sx={{ marginBottom: "100px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>time</TableCell>
                <TableCell>amount</TableCell>
                <TableCell>id</TableCell>
                <TableCell>payment done by</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {student_rows?.map((row: any) => (
                <TableRow
                  key={row.id + row.payment_to + row.payment_by + row.time}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.payment_to}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default InvoicesTable;
