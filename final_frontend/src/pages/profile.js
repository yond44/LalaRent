import React, {useState, useEffect} from 'react'
import { GetMyProfile } from '../service/API';
import axios from 'axios';
import { data } from 'autoprefixer';
import EditProfile from '../components/modal/edit_Profile_modal';

function Profile() {

      const [dataUser, setDataUser] = useState([]);
      const [showAddProductModal, setShowAddProductModal] = useState(false);
      const [refresh, setRefresh] = useState(false);
      const [show, setShow] = useState(false);
      const [showEdit, setShowEdit] = useState(false);
      const onClose = () => setShow(false);
     
      const [token, setToken] = useState("");

      const refreshToken = async () => {
        try {
          const response = await axios.get("http://localhost:8000/token");
          setToken(response.data.accessToken);
        } catch (error) {
          console.log(error);
        }
      };


      const fetchProducts = async () => {
        await GetMyProfile(token)
          .then((response) => setDataUser(response.data))
          .catch((error) => console.log(error));
      };

      useEffect(() => {
        refreshToken();
        if (token) {
          fetchProducts(token);
        }
      }, [token, refresh]);

      console.log (dataUser,"ini mahluk apaan")

  return (
    <div className="flex flex-col item-center justify-center min-h-screen py-2 ">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20">
        <div className="bg-white rounded-2xl shadow-2xl w-4/5">
          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <img
                  className="relative w-10 h-10 rounded-full"
                  src={dataUser.image}
                ></img>
                <div className="w-20 h-20 p-1 border border-gray-300 rounded-full"></div>
              </div>
            </div>

            <div class="border-t border-gray-200">
              <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Full name</dt>

                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    {dataUser.name}
                  </dd>
                </div>

                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Address</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {dataUser.address}
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {dataUser.email}
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {dataUser.phone_number}
                  </dd>
                </div>
              </dl>
            </div>
            <button
              type="button"
              class="ml-5 mt-10 mb-10 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Change Password
            </button>
            <button
              type="button"
              class="ml-5 mb-10 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile