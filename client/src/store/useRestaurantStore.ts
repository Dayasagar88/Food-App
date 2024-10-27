import { Orders } from "@/types/orderType";
import { MenuItem, RestaurantState } from "@/types/restaurantType";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = "http://localhost:8000/api/v1/restaurant";
axios.defaults.withCredentials = true;

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set, get) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter : [],
      singleRestaurant : null,
      restaurantOrders : [],
      createRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const res = await axios.post(`${API_END_POINT}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data.success) {
            toast.success(res.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
      getRestaurant: async () => {
        try {
          set({ loading: true });
          const res = await axios.get(`${API_END_POINT}`);
          if (res.data.success) {
            // toast.success(res.data.message);
            set({ loading: false, restaurant: res.data.restaurant });
            // console.log(res.data.restaurant)
          }
        } catch (error: any) {
          if (error.response.status === 404) {
            set({ restaurant: null });
          }
          set({ loading: false });
        }
      },
      updateRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const res = await axios.put(`${API_END_POINT}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data.success) {
            toast.success(res.data.message);
            set({ loading: false, restaurant: res.data.restaurant });
          }
        } catch (error: any) {
          set({ loading: false });

          toast.error(error.response.data.message);
        }
      },
      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: any
      ) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));

          await new Promise((resolve) => setTimeout(resolve, 500));
          const res = await axios.get(
            `${API_END_POINT}/search/${searchText}?${params.toString()}`
          );
          if (res.data.success) {
            // console.log(res.data);
            set({ loading: false, searchedRestaurant: res.data });
          }
        } catch (error: any) {
          set({ loading: true });
        }
      },
      addMenuToRestaurant: (menu: MenuItem) => {
        set((state: any) => ({
          restaurant: state.restaurant
            ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
            : null,
        }));
      },
      updateMenuToRestaurant: (updatedMenu: MenuItem) => {
        set((state: any) => {
          if (state.restaurant) {
            const updatedMenuList = state.restaurant.menus.map((menu: any) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenuList,
              },
            };
          }
          // if state.restaruant is undefined then return state
          return state;
        });
      },
      setAppliedFilter : (value : string) => {
        set((state : any) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item : string) => item !== value): [...state.appliedFilter, value]
          return {appliedFilter : updatedFilter}
        })
      }, 
      resetAppliedFilter : () => {
        set({appliedFilter : []})
      },
      getSingleRestaurant : async (restaurantId : string) => {
        try {
          const res = await axios.get(`${API_END_POINT}/${restaurantId.toString()}`);
          if(res.data.success){
            set({singleRestaurant : res?.data.restaurant});
          }
        } catch (error) {
          
        }
      },
      getRestaurantOrders : async () => {
        try {
          set({loading : true})
          const res = await axios.get(`${API_END_POINT}/orders`);
          if(res.data.success){
            set({loading : false , restaurantOrders:res.data.orders,});
          }
        } catch (error : any) {
          toast.error(error.response.data.message);
          console.log(error)
        }
      },
      updateRestaurantOrder : async (orderId: string, status : string) => {
        try {
          const res = await axios.put(`${API_END_POINT}/order/${orderId}/status`, {status} , {
            headers : {
              "Content-Type" : "application/json"
            }
          });
          if(res.data.success){
            const updatedOrder = get().restaurantOrders.map((order : Orders) => {
             return order._id === orderId ? {...order, status : res.data.save} : order; 
            })
            set({restaurantOrders : updatedOrder});
            toast.success(res.data.message);
          }
        } catch (error : any) {
          console.log(error)
          toast.error(error.response.data.message)
        }
      }

    }),
    {
      name: "restarant-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
