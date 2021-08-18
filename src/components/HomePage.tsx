import { GlobeAltIcon } from "@heroicons/react/outline";
import SimpleTable from "./SimpleTable";
import AddMoneyForm from "./AddMoneyForm";
import { useEffect, useState } from "react";
import { firestore, convertCollectionsSnapshotToMap } from "../firebase";
import NavBar from "./NavBar";

const features = [
  {
    name: "Just start record",
    description:
      "Insert any amount, for what you spent that money and see the calculation for each month",
    icon: GlobeAltIcon,
  },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type fieldTypes = {
  typeOfRecord: string;
  label: string;
  createdAt: string;
  amount: string;
  currency: string;
};
const HomePage = () => {
  const [spendings, setSpendings] = useState<fieldTypes[] | []>([]);
  const [isAuth, setIsAuth] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const currentMonthsToAppear = [
    currentMonth - 1 >= 0 ? currentMonth - 1 : 11,
    currentMonth,
    currentMonth + 1 <= 11 ? currentMonth + 1 : 0,
  ];
  const currentWorkspace = localStorage.getItem(
    "current-workspace-budget-recod"
  );

  const handleAddRecord = (fields: fieldTypes) => {
    try {
      const collectionRef = firestore.collection(
        `spendings/${currentWorkspace}/budget`
      );
      collectionRef.add(fields);
      setRefresh(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id: string) => {
    if (id) {
      try {
        const collectionRef = firestore.collection(
          `spendings/${currentWorkspace}/budget`
        );
        collectionRef.doc(id).delete();
        setRefresh(true);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    const collectionRef = firestore.collection(
      `spendings/${currentWorkspace}/budget`
    );
    collectionRef.get().then((snapshot) => {
      const collectionsObject = convertCollectionsSnapshotToMap(snapshot);
      const currentMonthExpensives: fieldTypes[] = collectionsObject.filter(
        (expense: fieldTypes) =>
          new Date(expense.createdAt).getMonth() === currentMonth
      );
      setSpendings(currentMonthExpensives);
      setRefresh(false);
    });
  }, [currentWorkspace, refresh, currentMonth]);

  useEffect(() => {
    if (currentWorkspace) {
      if (isAuth !== currentWorkspace) {
        setIsAuth(currentWorkspace);
      }
    }
  }, [currentWorkspace, isAuth]);

  const handleChangeWorkspace = (workspace: string): void => {
    setIsAuth(workspace);
  };

  const totalSpent = spendings
    .filter((el) => el.currency === "RON" && el.typeOfRecord === "spend")
    .reduce((acc, current) => acc + parseInt(current.amount), 0);
  const totalEarned = spendings
    .filter((el) => el.currency === "RON" && el.typeOfRecord === "earn")
    .reduce((acc, current) => acc + parseInt(current.amount), 0);

  return (
    <>
      <NavBar isAuth={isAuth} handleSubmit={handleChangeWorkspace} />
      <div className=" bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isAuth ? (
            <>
              <div className="lg:text-center">
                <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                  See exactly what you spend
                </h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  A better way to record your savings
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  Free and easy to use
                </p>
              </div>

              <div className="mt-10">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                  {features.map((feature, index) => (
                    <div key={`${feature.name}-${index}`} className="relative">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                          <feature.icon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                          {feature.name}
                        </p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500">
                        {feature.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </>
          ) : (
            <div className="my-10">
              <AddMoneyForm handleOnSubmit={handleAddRecord} />
              <div className="flex">
                {currentMonthsToAppear.map((month) => {
                  return (
                    <button
                      key={month}
                      type="submit"
                      onClick={() => setCurrentMonth(month)}
                      className={`rounded-md border border-gray-300 shadow-sm px-4 py-2 my-5 text-base font-medium  w-full ${
                        month === currentMonth
                          ? "text-white bg-indigo-700"
                          : "text-indigo-700"
                      }`}
                    >
                      {MONTHS[month]}
                    </button>
                  );
                })}
              </div>

              <div className="relative  my-5 md:flex md:justify-between sm:block ">
                <div className="md:w-2/5 border-2 md:p-10 p-5 sm:w-full">
                  <div>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      <span className="text-green-500">Spent</span>
                    </p>
                  </div>
                  <div className="mt-2 ml-16 text-base text-gray-500">
                    {totalSpent} RON
                  </div>
                </div>
                <div className="md:w-2/5 border-2 md:p-10 p-5 sm:w-full">
                  <div>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                      <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      <span className="text-green-500">Earned</span>
                    </p>
                  </div>
                  <div className="mt-2 ml-16 text-base text-gray-500">
                    {totalEarned} RON
                  </div>
                </div>
              </div>
              <SimpleTable data={spendings || []} handleDelete={handleDelete} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
