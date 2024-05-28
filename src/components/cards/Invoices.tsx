import React from "react";
import { Label, TextInput, } from "flowbite-react";
import { School } from "./schools";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
export default function Invoices({ selectedSchool, schools }) {
  
  return (
    <div>
      <div>
        <div className="modal-box flex place-content-center h-[80vh] !w-[100vw]">
          <div className="modal-action">
            <form method="dialog !w-[60vw]">
                <button className="btn btn-sm btn-ghost absolute right-2 top-2 font-bold">Esc[X]</button>
              <h2 className="font-bold text-center uppercase mb-10">
                School Invoice
              </h2>
              <div className="flex flex-col gap-4">
                {selectedSchool.schoolId && (
                  <>
                    <Label
                      htmlFor="name"
                      value="School Name:"
                      className="!w-[45vw]"
                    />
                    <TextInput
                      type="text"
                      name="name"
                      id="name"
                      value={
                        schools.find(
                          (school: School) =>
                            school.id === selectedSchool.schoolId
                        )?.name
                      }
                    />
                  </>
                )}
                <Label>Invoice Number:</Label>
                <TextInput
                  type="text"
                  name="invoiceNumber"
                  id="invoiceNumber"
                  value={selectedSchool.invoiceNumber}
                />
                <Label>Creation Date:</Label>
                <TextInput
                  type="date"
                  name=""
                  id=""
                  value={selectedSchool.creationDate}
                />
              </div>
              <div className="flex flex-col gap-5 mt-5"><button className="btn btn-success text-white">Update</button>
              <button className="btn btn-error text-white">Delete</button></div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
