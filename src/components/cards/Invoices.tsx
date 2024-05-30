import React, { useState } from "react";
import { Label, Select, TextInput } from "flowbite-react";
import type { Invoices, School } from "./schools";
import { Collection } from "./Collections";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
export default function Invoices({ selectedSchool, schools, collection }) {
  const invoice: Invoices = selectedSchool;

  const [updatedInvoice, setUpdatedInvoice] = useState(invoice);
  const [updatedSchool, setUpdatedSchool] = useState(
    schools.find((school: School) => school.id === invoice.id)
  );
  const [updatedCollection, setUpdatedCollection] = useState(
    collection.find(
      (collect: Collection) => collect.id === invoice.id
    )
  );

  const updateInvoices = async () => {
    try {
      const putInvoice = await fetch(
        `http://localhost:8080/invoices/${updatedInvoice.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            ...updatedInvoice,
            amount: updatedInvoice.amount,
            balance: updatedInvoice.balance,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const sendData = await putInvoice.json();
      console.log(sendData);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const updateSchool = async () => {
    try {
      const putSchool = await fetch(
        `http://localhost:8080/schools/${updatedSchool.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            ...updatedSchool,
            name: updatedSchool.name,
            product: updatedSchool.product,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const sendData = await putSchool.json();
      console.log(sendData);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const updateCollection = async () => {
    try {
      const putCollect = await fetch(
        `http://localhost:8080/collections/${updatedCollection.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            ...updatedCollection,
            name: updatedCollection.status,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const sendData = await putCollect.json();
      console.log(sendData);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleUpdate = () => {
    updateCollection();
    updateInvoices();
    updateSchool();
    window.location.reload();
  };

  
  const handleInvoiceChange = (e) => {
    setUpdatedInvoice({ ...updatedInvoice, [e.target.name]: e.target.value });
  };

  const handleSchoolChange = (e) => {
    setUpdatedSchool({ ...updatedSchool, [e.target.name]: e.target.value });
  };

  const handleCollectionChange = (e) => {
    setUpdatedCollection({ ...updatedCollection, status: e.target.value });
  };

  const handleDeleteAll = async () => {
    try {
      await fetch(`http://localhost:8080/schools/${updatedSchool.id}`, {
        method: "DELETE",
      });
      await fetch(`http://localhost:8080/invoices/${updatedInvoice.id}`, {
        method: "DELETE",
      });
      await fetch(
        `http://localhost:8080/collections/${updatedCollection.id}`,
        {
          method: "DELETE",
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDeleteInvoiceAndCollection = async () => {
    try {
      await fetch(`http://localhost:8080/invoices/${updatedInvoice.id}`, {
        method: "DELETE",
      });
      await fetch(
        `http://localhost:8080/collections/${updatedCollection.id}`,
        {
          method: "DELETE",
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <div>
        <div className="modal-box flex place-content-center h-[80vh] !max-w-[54rem]">
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-sm btn-ghost absolute right-2 top-2 font-bold"
                onClick={() => window.location.reload()}
              >
                X
              </button>

              <h2 className="font-bold text-center uppercase mb-10">
                School Invoice
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  {" "}
                  {invoice.id && (
                    <>
                      <Label htmlFor="name" value="School Name:" />
                      <TextInput
                        type="text"
                        name="name"
                        id="name"
                        color={"black"}
                        value={updatedSchool?.name}
                        onChange={handleSchoolChange}
                      />
                    </>
                  )}
                </div>
                <div>
                  <Label>Invoice Number:</Label>
                  <TextInput
                    type="text"
                    name="invoiceNumber"
                    id="invoiceNumber"
                    value={invoice.invoiceNumber}
                    disabled
                    color={"black"}
                  />
                </div>
                <div>
                  <Label>Product Type:</Label>
                  <TextInput
                    type="text"
                    name="product"
                    id="product"
                    value={updatedSchool?.product}
                    onChange={handleSchoolChange}
                    color={"black"}
                  />
                </div>
                <div>
                  {" "}
                  <Label>Creation Date:</Label>
                  <TextInput
                    type="text"
                    disabled
                    name="creationDate"
                    id=""
                    value={invoice.creationDate.toString()}
                    color={"black"}
                  />
                </div>
                <div>
                  <Label>Due Date:</Label>
                  <TextInput
                    type="text"
                    name="dueDate"
                    id="dueDate"
                    disabled
                    value={invoice.dueDate.toString()}
                    color={"black"}
                  />
                </div>
                <div>
                  {" "}
                  <Label>Amount:</Label>
                  <TextInput
                    type="text"
                    name="amount"
                    id="amount"
                    value={updatedInvoice.amount.toLocaleString()}
                    onChange={handleInvoiceChange}
                    color={"black"}
                  />
                </div>
                <div>
                  <Label>Balance:</Label>
                  <TextInput
                    type="text"
                    name="balance"
                    id="balance"
                    value={updatedInvoice.balance.toString()}
                    onChange={handleInvoiceChange}
                    color={"black"}
                  />
                </div>
                <div>
                  <Label>Days Until Due </Label>
                  <TextInput
                    type="text"
                    name="daysUntilDue"
                    id="daysUntilDue"
                    value={invoice.daysUntilDue.toString()}
                    color={"black"}
                  />
                </div>
                <div>
                  <Label>Completion Status:</Label>
                  <Select
                    value={updatedCollection?.status}
                    onChange={handleCollectionChange}
                  >
                    {updatedCollection?.status === "valid" ? (
                      <>
                        <option value="valid">Valid</option>
                        <option value="Bounced">Bounced</option>
                      </>
                    ) : (
                      <>
                        <option value="valid">Valid</option>
                        <option value="Bounced">Bounced</option>
                      </>
                    )}
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-5 mt-5">
                <button
                  className="btn btn-success text-white"
                  onClick={handleUpdate}
                  type="submit"
                >
                  Update
                </button>
                <button
                  className="btn btn-error text-white"
                  onClick={handleDeleteAll}
                >
                  Delete School, Invoice, and Collection
                </button>
                <button
                  className="btn btn-error text-white"
                  onClick={handleDeleteInvoiceAndCollection}
                >
                  Delete Invoice and Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
