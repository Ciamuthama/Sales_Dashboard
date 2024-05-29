import React from "react";
import { School } from "../cards/schools";
import { Label, Select, TextInput } from "flowbite-react";
import { Collection } from "../cards/Collections";
import { useForm, SubmitHandler} from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
export default function CollectionModal({ schools }) {
    const { handleSubmit, register } = useForm<Collection>();
  const handleCreate:SubmitHandler<Collection> = async (createCollection: Collection) => {
    try {
      const createCollect = await fetch(`http://localhost:8080/collections`, {
        method: "POST",
        body: JSON.stringify({
            invoiceId:createCollection.invoiceId,
            schoolId: createCollection.schoolId,
            status: createCollection.status,
            date: createCollection.date,
            amount: createCollection.amount,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const sendData = await createCollect.json();
      console.log(sendData);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getNextSchoolNumber = () => {
    const sortedSchools = [...schools].sort(
      (a, b) => Number(b.id) - Number(a.id)
    );

    return sortedSchools.length > 0
      ? Number(sortedSchools[0].id) + 1
      : 1;
  };

  const newNumber = getNextSchoolNumber();

  
  return (
    <div className="flex justify-end">
      <div>
        <div className="modal-box flex place-content-center h-[80vh] !w-screen float-right">
          <div className="modal-action">
            <form method="dialog !w-[60vw]" onSubmit={handleSubmit(handleCreate)}>
              <button className="btn btn-sm btn-ghost absolute right-2 top-2 font-bold">
                Esc[X]
              </button>
              <div>
                <Label htmlFor="schoolId" value="schoolId" hidden/>
                <input
                  id="schoolId"
                  type="number"
                  {...register("schoolId")}
                  value={newNumber}
                  disabled
                  hidden
                />
               
              </div>
              <div>
            <Label htmlFor="invoiceId" value="invoiceId" hidden />
                <input
                  id="invoiceId"
                  type="number"
                  {...register("invoiceId")}
                  value={newNumber}
                  disabled
                  hidden={true}
                />
               
               
              </div>
              <div>
                <div className="mb-2 block  w-[25rem]">
                  <Label htmlFor="collectionNumber" value="Collection Number:" />
                </div>
                <TextInput
                  id="collectionNumber"
                  type="text"
                  placeholder="COL045"
                  {...register("collectionNumber")}
                  required
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="amount" value="Amount:" />
                </div>
                <TextInput
                  id="amount"
                  type="text"
                  inputMode="numeric"
                  {...register("amount")}
                  placeholder="20,000"
                />
              </div>
              
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="date" value="Date:" />
                </div>
                <TextInput
                  id="date"
                  type="date"
                  {...register("date")}
                />
              </div>
              <Select id="status" {...register("status")}>
                <option >Valid</option>
                <option>Bounced</option>
              </Select>
            <button type="submit" >
              Save
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
