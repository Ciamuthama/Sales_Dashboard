import { School } from "../cards/schools";
import { Label, TextInput } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment

export default function SchoolModal() {
  const { handleSubmit, register } = useForm<School>();

  const handleCreate: SubmitHandler<School> = async (school: School) => {
    try {
      const createschool = await fetch(`https://zeraki-api.onrender.com/schools`, {
        method: "POST",
        body: JSON.stringify({
          name: school.name,
          type: school.type,
          product: school.product,
          registrationDate: school.registrationDate,
          contactInformation: school.contactInformation,
          county: school.county,
          balance: school.balance,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });

      const sendData = await createschool.json();
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
                <Label htmlFor="name" value="School Name" />
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Nairobi School"
                  {...register("name")}
                />
              </div>
              <div>
                <Label
                  htmlFor="contactInformation"
                  value="Contact Information"
                />
                <TextInput
                  id="contactInformation"
                  type="text"
                  {...register("contactInformation")}
                />
              </div>
              <div>
                <div className="mb-2 block  w-[25rem]">
                  <Label htmlFor="county" value="County:" />
                </div>
                <TextInput id="county" type="text" {...register("county")} />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="product" value="Product:" />
                </div>
                <TextInput
                  id="product"
                  type="text"
                  inputMode="numeric"
                  {...register("product")}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="registrationDate" value="Registration Date:" />
                </div>
                <TextInput
                  id="registrationDate"
                  type="date"
                  {...register("registrationDate")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="type" value="School Type:" />
                </div>
                <TextInput id="type" type="text" {...register("type")} />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="balance" value="Balance" />
                </div>
                <TextInput
                  id="balance"
                  type="text"
                  inputMode="numeric"
                  {...register("balance")}
                />
              </div>

              <button type="submit" className="btn btn-success mt-10" onClick={()=>window.location.reload()}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
