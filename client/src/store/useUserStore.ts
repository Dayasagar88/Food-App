import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "../schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8000/api/v1/user";
axios.defaults.withCredentials = true;

type User = {
  fullname: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture : string;
  admin: boolean;
  isVerified: boolean;
};

type userState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthentication: () => Promise<void>;
  forgotPassword : (email : string)=> Promise<void>;
  resetPassword : (token : string , newPassword : string)=> Promise<void>;
  updateProfile : (input : any) => Promise<void>
};

export const useUserStore = create<userState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      //Sign up api implementation
      signup: async (input: SignupInputState) => {
        try {
          set({ loading: true });
          const res = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (res.data.success) {
            toast.success(res.data.message);
            set({ loading: false, user: res.data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          console.log(error);
          toast.error(error?.response?.data?.message);
          set({ loading: false });
        }
      },
      login: async (input: LoginInputState) => {
        try {
          set({ loading: true });
          const res = await axios.post(`${API_END_POINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (res.data.success) {
            // console.log(res.data.userWithoutPassword);
            toast.success(res.data.message);
            // console.log(res)
            set({ loading: false, user: res.data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          console.log(error);
          toast.error(error?.response?.data?.message);
          set({ loading: false });
        }
      },
      verifyEmail: async (verificationCode: string) => {
        try {
          set({ loading: true });
          const res = await axios.post(
            `${API_END_POINT}/verify-email`,
            { verificationCode },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          // console.log(verificationCode);
          if (res.data.success) {
            set({ loading: false, user: res.data.user, isAuthenticated: true});
            toast.success(res.data.message);
          }
          //    return res.data
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message);
        }
      },
      checkAuthentication: async () => { 
        try {
          set({ isCheckingAuth: true });
          const res = await axios.get(`${API_END_POINT}/check-auth`);
          if (res.data.success) {
            set({user: res.data.user, isAuthenticated: true, isCheckingAuth: false });
          }
        } catch (error) {
          set({ isAuthenticated: false, isCheckingAuth: false });
        }
      },
      logout: async () => {
        try {
          set({ loading: true });
          const res = await axios.post(`${API_END_POINT}/logout`);
          if (res.data.success) {
            toast.success(res.data.message);
            set({ loading: false, user: null, isAuthenticated: false });
          }
        } catch (error) {
          set({ loading: false });
        }
      },
      forgotPassword: async (email: string) => {
        try {
          set({ loading: true });
          const res = await axios.post(`${API_END_POINT}/forgot-password`, {
            email,
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
      resetPassword: async (token: string, newPassword: string) => {
        try {
          set({ loading: true });
          const res = await axios.post(
            `${API_END_POINT}/reset-password/${token}`,
            { newPassword }
          );
          if (res.data.success) {
            toast.success(res.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
      updateProfile: async (input: any) => {
        try {
          set({ loading: true });
          const res = await axios.put(
            `${API_END_POINT}/profile/update`,
            input,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.data.success) {
            toast.success(res.data.message);
            set({ loading: false, user: res.data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
    }),
    {
      name: "user-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
