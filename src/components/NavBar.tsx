import {  useState } from "react";
import { Popover, Dialog } from "@headlessui/react";
import {
  UserCircleIcon,
} from "@heroicons/react/outline";
import SimpleModal from "./SimpleModal";


interface NavBarProps {
  handleSubmit(arg: string): void;
  isAuth?: string;
}

const NavBar = (props: NavBarProps) => {
  const { isAuth, handleSubmit } = props;
  const [openLoginModel, setOpenLoginModal] = useState<boolean>(false);
  const [workspace, setWorkspace] = useState<string>("");

  const handleOnClick = () => {
    localStorage.setItem("current-workspace-budget-recod", workspace);
    handleSubmit(workspace);
    setWorkspace("");
    setOpenLoginModal(false);
  };

  return (
    <>
      <SimpleModal open={openLoginModel} setOpen={setOpenLoginModal}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="flex flex-col text-center items-center">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <UserCircleIcon
                className="h-6 w-6 text-blue-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4  w-full">
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                Login to workspace
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  You need to choose a name for your private record. If the name
                  is not found, we will create a new space for you.
                </p>
              </div>
            </div>

            <div className="my-5">
              <input
                placeholder="Workspace name 1"
                type="text"
                name="first-name"
                id="first-name"
                value={workspace}
                autoComplete="given-name"
                onChange={(event) => setWorkspace(event.target.value)}
                className="my-3 p-3  focus:ring-indigo-200 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-indigo-500 rounded-md"
              />
            </div>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-white bg-indigo-700 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleOnClick}
            >
              Start
            </button>
          </div>
        </div>
      </SimpleModal>

      <Popover className="relative bg-white">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 justify-start space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-auto sm:h-10"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt=""
                      />
                      <span className="pl-2">Budget Record</span>
                    </div>
                </div>
                <div className="flex items-center justify-end flex-1 lg:w-0">
                  <button
                    onClick={() => setOpenLoginModal(true)}
                    className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    {isAuth ? (
                      <span>{isAuth}</span>
                    ) : (
                      <UserCircleIcon className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Popover>
    </>
  );
};

export default NavBar;
