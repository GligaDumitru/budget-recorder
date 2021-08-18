import React, { useState } from "react";

interface FormProps {
  handleOnSubmit(arg: {
    typeOfRecord: string;
    label: string;
    createdAt: string;
    amount: string;
    currency: string;
  }): void;
  isAuth?: string;
}
export default function AddMoneyForm(props: FormProps) {
  const { handleOnSubmit } = props;
  const initialState = {
    typeOfRecord: "spend",
    label: "",
    createdAt: new Date().toISOString().substr(0, 10),
    amount: "",
    currency: "RON",
  }
  const [fields, setFields] = useState(initialState);

  const { typeOfRecord, label, createdAt, amount, currency } = fields;

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setFields(initialState)
          return handleOnSubmit(fields);
        }}
        className="md:w-2/5 sm:w-full"
      >
        <p className="block text-sm font-medium text-gray-700 mb-4">
          Type of record
        </p>
        <div className=" flex items-center justify-around">
          <div className="flex items-center mb-2">
            <input
              id="record-spend"
              name="typeOfRecord"
              type="radio"
              value="spend"
              checked={typeOfRecord === "spend"}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              required
              onChange={handleInputChange}
            />
            <label
              htmlFor="record-spend"
              className="ml-3 text-sm inline-block p-2 px-4 text-center leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800"
            >
              Spend
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="record-earn"
              name="typeOfRecord"
              type="radio"
              value="earn"
              checked={typeOfRecord === "earn"}
              onChange={handleInputChange}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              required
            />
            <label
              htmlFor="record-earn"
              className="ml-3 text-sm inline-block p-2 px-4 text-center leading-5 font-semibold rounded-full bg-green-100 text-green-800"
            >
              Earn
            </label>
          </div>
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Label
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="label"
              id="label"
              value={label}
              onChange={handleInputChange}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 py-5 pr-12 sm:text-sm border-2 border-gray-100 rounded-md"
              placeholder="Label Name here"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="date"
              name="createdAt"
              id="createdAt"
              value={createdAt || new Date().toISOString().substr(0, 10)}
              onChange={handleInputChange}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 py-5 pr-12 sm:text-sm border-2 border-gray-100 rounded-md"
              placeholder="Label Name here"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{currency}</span>
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={handleInputChange}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 py-5 pr-12 sm:text-sm border-2 border-gray-100 rounded-md"
              placeholder="0.00"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="currency" className="sr-only">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={currency}
                onChange={(event) => {
                  setFields({
                    ...fields,
                    [event.target.name]: event.target.value,
                  });
                }}
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
              >
                <option value="RON">RON</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className="rounded-md border border-gray-300 shadow-sm px-4 py-2 my-5 text-base font-medium text-white bg-indigo-700 w-full"
        >
          Add
        </button>
      </form>
    </>
  );
}
