import { Invoices } from "../cards/schools";
import { Label, Select, TextInput } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment

export default function InvoiceModal() {
  const { handleSubmit, register } = useForm<Invoices>();



 

    const generateUniqueInvoiceNumber = () => {
      const prefix = "INV";
      const timestamp = Date.now(); // Use the current timestamp to ensure uniqueness
      return `${prefix}${timestamp.toFixed()}`;
    };

    const invoiceNumber = generateUniqueInvoiceNumber();
  const handleCreate: SubmitHandler<Invoices> = async (invoice: Invoices) => {
    const creationDate = new Date(invoice.creationDate);
    const dueDate = new Date(invoice.dueDate);

   
    try {
      const createInvoice = await fetch(`https://zeraki-api.onrender.com/invoices`, {
        method: "POST",
        body: JSON.stringify({
          status: invoice.amount,
          creationDate: invoice.creationDate,
          dueDate: invoice.dueDate ,
          paidAmount: invoice.paidAmount,
          balance: invoice.balance,
          daysUntilDue: Math.round(
            (dueDate.getTime() - creationDate.getTime()) /
            (1000 * 60 * 60 * 24)
          ),
          invoiceNumber:invoiceNumber,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });

      const sendData = await createInvoice.json();
      console.log(sendData);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex justify-end">
      <div>
        <div className="modal-box flex place-content-center h-[80vh] !w-screen float-right">
          <div className="modal-action">
            <form
              method="dialog !w-[60vw]"
              onSubmit={handleSubmit(handleCreate)}
            >
              <button className="btn btn-sm btn-ghost absolute right-2 top-2 font-bold" onClick={()=>window.location.reload()}>
                Esc[X]
              </button>
              <div>
                <Label htmlFor="invoiceNumber" value="invoiceNumber"/>
                <TextInput
                  id="invoiceNumber"
                  type="text"
                  placeholder={invoiceNumber}
                  disabled
                  {...register("invoiceNumber")}
                />
              </div>
              <div>
                <Label htmlFor="creationDate" value="Created Date" />
                <TextInput
                  id="creationDate"
                  type="date"
                  {...register("creationDate")}
                />
              </div>
              <div>
                <div className="mb-2 block  w-[25rem]">
                  <Label
                    htmlFor="amount"
                    value="Amount:"
                  />
                </div>
                <TextInput
                  id="amount"
                  type="text"
                  inputMode="numeric"
                  {...register("amount")}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="paidAmount" value="Paid Amount:" />
                </div>
                <TextInput
                  id="amount"
                  type="text"
                  inputMode="numeric"
                  {...register("paidAmount")}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="balance" value="Balance:" />
                </div>
                <TextInput
                  id="balance"
                  type="text"
                  inputMode="numeric"
                  {...register("balance")}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="date" value="Due Date:" />
                </div>
                <TextInput id="dueDate" type="date" {...register("dueDate")} />
              </div>
              
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="daysUntilDue" value="Days Until Due:" hidden/>
                </div>
                <input id="daysUntilDue" type="text" {...register("daysUntilDue")} hidden/>
              </div>
              <Select id="status" {...register("status")}>
                <option>Valid</option>
                <option>Bounced</option>
              </Select>
              <button type="submit" className="btn btn-success mt-10" onClick={()=>window.location.reload()}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
