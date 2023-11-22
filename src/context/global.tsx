/* eslint-disable react-hooks/exhaustive-deps */
import ModalAuth from '@/components/modal/modal-auth';
import ModalLoginCompleteWithQr from '@/components/modal/modal-login-complete-with-qr';
import ModalLoginErrorWithQr from '@/components/modal/modal-login-error-with-qr';
import ModalLoginLookUser from '@/components/modal/modal-login-look-user';
import ModalLoginOtp from '@/components/modal/modal-login-otp';
import ModalLoginUpdatePassword from '@/components/modal/modal-login-update-password';
import ModalLoginUser, { LoginUserStatus } from '@/components/modal/modal-login-user';
import ModalLoginUserNotFound from '@/components/modal/modal-login-user-not-found';
import ModalUpdateProfile from '@/components/modal/modal-update-profile';
import { loadFromLocal } from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import type { Model } from '@/types/model';
import useBoolean, { UseBooleanOutput } from '@pit-ui/modules/hooks/useBoolean';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

import { modal, ModalProvider } from '@/libs/modal';
import { Router, useRouter } from 'next/router';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Mock
import ModalOtpLogin from '@/components/modal/modal-otp-login';
import defaultUser from '@/mock/users.json';
import { Address } from '@/services/address/model';
import itelClubService from '@/services/itelClubService';
import profileService from '@/services/profileService';
import { User } from '@/services/user/model';
import { profileModel } from '@/types/profile';

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'trong %s',
    past: '%s',
    s: 'vài phút ',
    m: '1 phút',
    mm: '%d phút',
    h: '1 giờ',
    hh: '%d giờ',
    d: '1 ngày',
    dd: '%d ngày',
    M: '1 tháng',
    MM: '%d tháng',
    y: '1 năm',
    yy: '%d tháng'
  }
});

type Props = {
  children?: React.ReactNode;
};

type WithAuth<T extends (...args: any) => void> = (cb: T, deps: any[]) => T;
type UserData = Model.User & {
  address: Model.DeliveryAddress[];
};
type GlobalContextState = {
  status: 'loading' | 'authenticated' | 'unauthenticated';
  withAuth<T extends (...args: any) => void>(cb?: T, deps?: any[]): T;
  showModalAuth(): void;
  hideModalAuth(): void;
  toggleModalAuth(tabIndex?: number, props?: any): void;
  menu: UseBooleanOutput;
  search: UseBooleanOutput;
  user: UserData;
  setUser: React.Dispatch<UserData | null>;
  logout(): void;
  reloadBalance(): void;
  updateProfile(): void;
  info: itelClubModel.DataInfo;
  profile: profileModel.Profile;
};
const GlobalContext = createContext<GlobalContextState>({
  status: 'unauthenticated',
  withAuth: (cb) => (cb ? cb : ((() => void 0) as unknown as any)),
  showModalAuth() {},
  hideModalAuth() {},
  toggleModalAuth() {},
  menu: {} as any,
  user: {} as any,
  search: {} as any,
  setUser() {},
  logout() {},
  reloadBalance() {},
  updateProfile() {},
  info: {},
  profile: {}
});

let loginPromise: Promise<any> | undefined;
const GlobalProvider = ({ children }: Props) => {
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('unauthenticated');
  const [user, setUserDefault] = useState<UserData>(null as any);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const menu = useBoolean(false);
  const search = useBoolean(false);
  const currentTime = dayjs();
  const [info, setInfo] = useState<itelClubModel.DataInfo>({});
  const [profile, setProfile] = useState<profileModel.Profile & { phone?: string }>({});
  const [token, setToken] = useState<string>(() => {
    let token: string = '';
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token') || '';
    }
    return token;
  });
  const setUser = useCallback((user: UserData | null) => {
    if (user) {
      setUserDefault(user);
      setStatus('authenticated');
    } else {
      localStorage.removeItem('__logged_id');
      localStorage.removeItem('status');
      setUserDefault(null as any);
      setStatus('unauthenticated');
    }
  }, []);

  async function fetchUser() {
    try {
      const userId = localStorage.getItem('__logged_id') ? Number(localStorage.getItem('__logged_id')) : null;

      let user: Model.UserDataBase | null;
      if (userId) {
        user = await User.find(userId);
      } else {
        const users = await User.all();
        user = users.length ? users[Math.floor(Math.random() * users.length)] : (null as any);
      }
      if (user) {
        const addressList = await Address.all();
        const address = addressList.filter((addr) => addr.user_id === user!.id);
        setUser({ ...user, address });
        return;
      } else setUser(defaultUser);
    } catch (error) {
      console.log(error);
    } finally {
      loginPromise = undefined;
    }
  }
  async function reloadBalance() {
    if (!user) return;
    const d = await User.find(user.id);
    if (d) setUser({ ...user, balance: d.balance });
  }

  async function getInfoClub() {
    try {
      const res = itelClubService.getInfo();
      await res.then((data) => {
        setInfo(data.result.data || {});
      });
    } catch (error) {}
  }

  async function getProfile(phone: string) {
    try {
      const res = await profileService.getInfo(phone);
      if (res.code == 200) {
        setProfile({ ...res.result, phone });
      }
    } catch (error) {}
  }

  useEffect(() => {
    let lastWidth = innerWidth;
    const resizeHandler = () => {
      if (lastWidth !== innerWidth) {
        lastWidth = innerWidth;
        menu.setFalse();
        search.setFalse();
      }
    };
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [menu, search]);
  useEffect(() => {
    // const checkStatus = localStorage.getItem('status');
    // if (checkStatus === 'authenticated') {
    //   !loginPromise && (loginPromise = fetchUser());
    // }

    if (token) {
      const user = localStorage.getItem('user');
      getProfile(user || '');
      getInfoClub();
      setUser({
        id: 1,
        email: null,
        name: null,
        role: null,
        phone: user || '',
        is_verified: null,
        default_address_id: null,
        address: []
      });
    }
  }, [token]);

  const isMinuteEven = currentTime.minute() % 2 === 0;
  const loginDoneWithQr = (isRegister?: boolean) => {
    localStorage.setItem('status', 'authenticated');
    modal.open({
      render({ close }) {
        return <ModalLoginCompleteWithQr onClose={close} isRegister={isRegister} />;
      },
      onDone(data) {
        loginPromise = fetchUser();
        // Tại sao cần phải reload?
        // window.location.reload();
      },
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  const handleMoldalAuth = (tabIndex?: number, props?: any) => {
    modal.open({
      render: <ModalAuth tabIndex={tabIndex || 0} {...props} />,
      async onDone(data: { tabIndex?: number; phone?: string } = {}) {
        // force remove old modal
        modal.close();

        if (data.tabIndex === 1) {
          // login with qr
          if (isMinuteEven) {
            loginPromise = fetchUser();
            return loginDoneWithQr();
          } else {
            return loginErrorWithQr();
          }
        }
        // login  user not found
        if (data.phone === '0351234567') return loginUserNotFound();

        // Show new modal
        handlerModalLoginStep2(data.phone === '0351234568', data.phone || '0351234568');
        return;
      },
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50',
      classWrap: 'theme-light'
    });
  };
  const loginErrorWithQr = () => {
    modal.open({
      render: <ModalLoginErrorWithQr />,
      onDone(data) {
        if (data === 1) {
          return handleMoldalAuth(0);
        }
        return handleMoldalAuth(1);
      },
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };
  const loginUserNotFound = () => {
    modal.open({
      render: <ModalLoginUserNotFound />,
      onDone(data) {
        if (data === 1) {
          return handleMoldalAuth(0);
        }
        if (data === 2) {
          return handlerModalOtp({ isRegister: true });
        }
      },
      transition: false,
      className: 'modal-box shadow-itel w-11/12 md:max-w-[35rem] max-md:p-6',
      classNameContainer: 'height-auto items-center md:modal-middle',
      classNameOverlay: 'bg-neutral-900 bg-opacity-50'
    });
  };

  const handlerModalLoginStep = () => {
    modal.open({
      render: <ModalOtpLogin />,
      onDone(data: loginModel.dataType) {
        if (data.type === LoginUserStatus.UseOtp) {
          return handlerModalOtp({ isRegister: false, phone: data.phone, numInputs: 3 });
        }
      },
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };
  const handlerModalLoginStep2 = (isOtherNetwork: boolean, phone: string) => {
    modal.open({
      render: <ModalLoginUser isOtherNetwork={isOtherNetwork} phone={phone} />,
      onDone(data: loginModel.dataType) {
        // correct login ok
        if (data.type === LoginUserStatus.Success) {
          void loginDoneWithQr();
        }
        if (data.type === LoginUserStatus.LockUser) {
          // look user
          void handlerModalLookUser();
        }
        // click login with otp
        if (data.type === LoginUserStatus.UseOtp) {
          return handlerModalOtp({ isRegister: false, phone: data.phone, numInputs: 3 });
        }
        //for got password
        if (data.type === LoginUserStatus.ForgotPass) {
          return handlerModalOtp({ isRegister: false, isForgotPassword: true, phone: data.phone });
        }
        // choose other phone
        if (data.type === LoginUserStatus.UseOtherPhone) {
          return handleMoldalAuth(0);
        }
      },
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };
  const handlerModalLookUser = () => {
    modal.open({
      render: <ModalLoginLookUser />,
      onDone(data) {
        if (data === 2) {
          return handleMoldalAuth(0);
        }
        if (data === 1) {
          return handlerModalOtp({ isRegister: false, isForgotPassword: false, isLookUser: true });
        }
      },
      transition: false,
      className: 'modal-box shadow-itel w-11/12 md:max-w-[35rem] max-md:p-6',
      classNameContainer: 'height-auto items-center md:modal-middle',
      classNameOverlay: 'bg-neutral-900 bg-opacity-50'
    });
  };

  const handlerModalOtp = ({
    isRegister,
    isForgotPassword,
    isLookUser,
    phone,
    numInputs = 4
  }: {
    isRegister: boolean;
    isForgotPassword?: boolean;
    isLookUser?: boolean;
    phone?: string;
    numInputs?: number;
  }) => {
    modal.open({
      render() {
        return (
          <ModalLoginOtp
            phone={phone || ''}
            numInputs={numInputs}
            isLookUser={isLookUser}
            isRegister={isRegister}
            isForgotPassword={isForgotPassword}
          />
        );
      },
      onDone(data: { otp: string; isRegister: boolean; isClose?: boolean; isLookUser?: boolean; phone?: string; token?: string }) {
        if (isLookUser && data.isClose) {
          return void handlerModalLookUser();
        }
        if (data.isClose && data.isRegister) {
          return void loginUserNotFound();
        }
        if (data.isClose && !data.isRegister) {
          return void handlerModalLoginStep2(false, '034629292');
        }
        if (data.phone && data.token) {
          setToken(data.token);
          return setUser({
            id: 1,
            email: null,
            name: null,
            role: null,
            phone: data.phone,
            is_verified: null,
            default_address_id: null,
            address: []
          });
        }
        if (data) {
          return void updatePassword({ isRegister });
        }
      },
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  const updatePassword = ({ isRegister }: { isRegister?: boolean }) => {
    modal.open({
      render: <ModalLoginUpdatePassword />,
      onDone() {
        if (!isRegister) {
          return loginDoneWithQr();
        } else if (isRegister) {
          return void modalUpdateProfile();
        }
      },
      onReject() {
        if (isRegister) {
          void handlerModalOtp({ isRegister: true, phone: '' });
        } else if (!isRegister) {
          void handlerModalOtp({ isRegister: false, phone: '' });
        }
      },
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };
  const modalUpdateProfile = useCallback(() => {
    modal.open({
      render: <ModalUpdateProfile isUseForCreateProfile />,
      onDone(data) {},
      onReject() {
        return loginDoneWithQr(true);
      },
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[45rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  }, []);

  const withAuth: WithAuth<any> = useCallback(
    function (cb, deps) {
      return cb
        ? // eslint-disable-next-line react-hooks/rules-of-hooks
          useCallback(
            (...args: any[]) => {
              if (status !== 'authenticated') return handlerModalLoginStep();
              return cb(...args);
            },
            [status, ...deps]
          )
        : () => void 0;
    },
    [status]
  );
  useEffect(() => {
    dispatch(loadFromLocal());
  }, []);
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    function handleChange() {
      menu.setFalse();
      search.setFalse();
    }
    function closeModal() {
      modal.close(null);
    }
    Router.events.on('routeChangeComplete', handleChange);
    Router.events.on('routeChangeStart', closeModal);
    return () => {
      Router.events.off('routeChangeStart', closeModal);
      Router.events.off('routeChangeComplete', handleChange);
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        info,
        profile,
        setUser,
        user,
        status,
        withAuth,
        showModalAuth() {},
        hideModalAuth() {},
        toggleModalAuth: handlerModalLoginStep, //handleMoldalAuth,
        menu,
        search,
        logout() {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('userItelClub');
          }

          setUser(null);
          setInfo({});
          void router.push('/');
        },
        reloadBalance,
        updateProfile: modalUpdateProfile
      }}
    >
      {/* <DatabaseRegister /> */}
      {children}
      <ModalProvider />
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;
