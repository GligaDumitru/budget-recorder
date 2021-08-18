import React, { useEffect, useState } from "react";
const tableHeaders = ["Edit", "Label", "Value", "Date", "Status"];

type DataTypes = {
  id?: string;
  typeOfRecord: string;
  label: string;
  createdAt: string;
  amount: string;
  currency: string;
};

interface TableProps {
  handleDelete(arg: string): void;
  data?: DataTypes[] | [];
}

const SimpleTable = (props: TableProps) => {
  const { handleDelete } = props;
  const [data, setData] = useState<DataTypes[] | []>(props.data || []);
  const [currentFilter, setCurrentFilter] = useState({
    type: "Date", // date or value
    orderBy: "DESC", // ASC or DESC
  });

  useEffect(() => {
    const filterData = () => {
      let _tempArray = props.data || [];
      switch (currentFilter.type) {
        case "Status": {
          if (currentFilter.orderBy === "ASC") {
            _tempArray.sort((a, b) =>
              a["typeOfRecord"].toLowerCase() > b.typeOfRecord.toLowerCase()
                ? 1
                : a.typeOfRecord.toLowerCase() < b.typeOfRecord.toLowerCase()
                ? -1
                : 0
            );
          } else if (currentFilter.orderBy === "DESC") {
            _tempArray.sort((a, b) =>
              a.typeOfRecord.toLowerCase() > b.typeOfRecord.toLowerCase()
                ? -1
                : a.typeOfRecord.toLowerCase() < b.typeOfRecord.toLowerCase()
                ? 1
                : 0
            );
          }
          break;
        }
        case "Label": {
          if (currentFilter.orderBy === "ASC") {
            _tempArray.sort((a, b) =>
              a.label.toLowerCase() > b.label.toLowerCase()
                ? 1
                : a.label.toLowerCase() < b.label.toLowerCase()
                ? -1
                : 0
            );
          } else if (currentFilter.orderBy === "DESC") {
            _tempArray.sort((a, b) =>
              a.label.toLowerCase() > b.label.toLowerCase()
                ? -1
                : a.label.toLowerCase() < b.label.toLowerCase()
                ? 1
                : 0
            );
          }
          break;
        }
        case "Value": {
          if (currentFilter.orderBy === "ASC") {
            _tempArray.sort((a, b) =>
              a.amount > b.amount ? 1 : a.amount < b.amount ? -1 : 0
            );
          } else if (currentFilter.orderBy === "DESC") {
            _tempArray.sort((a, b) =>
              a.amount > b.amount ? -1 : a.amount < b.amount ? 1 : 0
            );
          }
          break;
        }
        case "Date": {
          if (currentFilter.orderBy === "ASC") {
            _tempArray.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            );
          } else if (currentFilter.orderBy === "DESC") {
            _tempArray.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
          }
          break;
        }
        default: {
          _tempArray.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
      }

      return _tempArray;
    };
    setData(filterData());
  }, [currentFilter, props.data]);

  const handleSortByHeader = (hr: string) => {
    const { type, orderBy } = currentFilter;
    if (hr === type) {
      setCurrentFilter({
        ...currentFilter,
        orderBy: orderBy === "ASC" ? "DESC" : "ASC",
      });
    } else {
      setCurrentFilter({
        type: hr,
        orderBy: "ASC",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tableHeaders.map((tH, index) => (
                    <th
                      key={index}
                      scope="col"
                      onClick={() => handleSortByHeader(tH)}
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {tH}
                      {currentFilter.type === tH &&
                        currentFilter.orderBy === "ASC" && (
                          <i className="fas fa-chevron-down"></i>
                        )}
                      {currentFilter.type === tH &&
                        currentFilter.orderBy === "DESC" && (
                          <i className="fas fa-chevron-up"></i>
                        )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data &&
                  data.length > 0 &&
                  data?.map(
                    (
                      { label, amount, currency, createdAt, typeOfRecord, id },
                      index
                    ) => (
                      <tr key={`${label}-${index}`}>
                        <td className="px-6  text-center py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            <div className="">
                              <div className="text-sm text-gray-500">
                                <button
                                  onClick={() => handleDelete(id || "")}
                                  className="text-red-700 hover:text-red-500 hover:cursor-pointer"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6  text-center py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            <div className="">
                              <div className="text-sm text-gray-500">
                                {label}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 text-center">
                            {amount} {currency}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 text-center">
                            {new Date(createdAt)?.toLocaleDateString()}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {typeOfRecord === "spend" && (
                            <div className="text-sm inline-block px-2 text-center leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                              {typeOfRecord}
                            </div>
                          )}
                          {typeOfRecord === "earn" && (
                            <div className="text-sm inline-block px-2 text-center leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {typeOfRecord}
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTable;
