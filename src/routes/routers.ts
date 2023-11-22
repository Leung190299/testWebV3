const Routers = {
  HOME: '/',
  NOT_FOUND: '/404',

  // Authen
  LOGIN: '/login',

  // Imal
  IMALL: '/imall',
  IMALL_DEVICE: '/imall/device',
  IMALL_FASHION: '/imall/fashion',
  IMALL_MOTHER_TO_BABY: '/imall/mother-to-baby',
  IMALL_MOTHER_TO_BABY_SEARCH: '/imall/mother-to-baby/search',
  IMALL_FOOD: '/imall/food',
  IMALL_DETAIL: '/imall/detail',

  // Sim
  SIM: '/sim',
  SIM_FENG_SHUI: '/sim/geo-sim', // '/sim/feng-shui',
  SIM_FENG_SHUI_SEARCH: '/sim/geo-sim-result', // '/sim/feng-shui/search', // Result
  SIM_NUMEROLOGY: '/sim/numerology-sim', // '/sim/numerology',
  SIM_NUMEROLOGY_SEARCH: '/sim/numerology-sim-result', // '/sim/numerology/search' // Result
  SIM_COUPLE: '/sim/sim-couple',
  SIM_TYPE:'/sim/sim-select-type',

  // Promotion
  PROMOTION: '/promotion',
  PROMOTION_DETAIL: '/promotion/vouchers/detail',
  PROMOTION_IZUI: '/promotion/izui',
  PROMOTION_ICLUB: '/promotion/club',
  PROMOTION_HOT: '/promotion/hot',

  // Services
  ITRAVEL_SERVIVE: '/i-travel',
  ITRAVEL_SERVIVE_DETAIL: '/i-travel/detail/[id]',
  ITRAVEL_VEXERE_SERVIVE: '/i-travel/vexere',
  IFINANCE_SERVIVE: '/i-finance',
  IFINANCE_VIETLOTT_SERVIVE: '/i-finance/vietloot',
  IFINANCE_TIMA_SERVIVE: '/i-finance/tima',
  IHEALTH_SERVIVE: '/service/i-health',
  SHOPING_SERVIVE: '/i-shoping',

  // Cart - checkout
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_CARD: '/checkout/card',
  CHECKOUT_PACK: '/checkout/pack',
  CHECKOUT_INSTALLMENT: '/checkout/installment',
  CHECKOUT_RESULT: '/checkout/result', // this is shallow

  // Recharge
  RECHARGE: '/recharge',
  RECHARGE_PAYMENT: '/recharge/payment',
  RECHARGE_STATUS: '/recharge/payment-status',

  // Recruitment
  RECRUITMENT: '/recruitment',
  RECRUITMENT_SEARCH: '/recruitment/search',
  RECRUITMENT_JOB_DETAIL: '/recruitment/detail',
  RECRUITMENT_APPLY: '/recruitment/apply/detail',

  // IGame
  IGAME: '/igame',
  IGAME_ACTION: '/igame/category/action',
  IGAME_SPORTS: '/igame/category/sports',
  IGAME_INTELLECTUAL: '/igame/category/intellectual',

  IGAME_DETAIL: '/igame/detail/[id]',
  IGAME_PLAY: '/igame/play/[id]',

  //News
  NEWS: '/news',
  NEWS_DETAIL: '/news/detail',
  NEWS_ITEL: '/news/itel',
  NEWS_ACTIVE: '/news/active',
  NEWS_SERVICE: '/news/service',
  NEWS_VIDEO: '/news/video',

  // DataPack
  DATA: '/data',
  DATA_SUGGESTION: '/data/suggestion',

  // IFilm
  IFILM: '/ifilm',
  FILM_SERIES: '/ifilm/film-series',
  FILM_FEATURED: '/ifilm/film-featured',
  FILM_POPULAR: '/ifilm/film-popular',
  FILM_FAVORITE: '/ifilm/film-favorite',

  // Support
  TRACKING_ORDER: '/tracking-order',
  ACTIVATE_SIM: '/active-sim',
  SUBSCRIBER_INFORMATION: '/subscriber-information',
  CHANGE_SIM: '/change-sim',
  UNLOCK_SIMS: '/unlock-sim',
  DOWNLOAD_ITEL: '/download-itel',

  // Tutorial
  SUPPORT_TUTORIAL: '/support-tutorial',
  QUESSTION_TUTORIAL: '/quesstion-tutorial',
  CONTACT_TUTORIAL: '/contact-tutorial',
  FEEDBACK_TUTORIAL: '/feedback-tutorial',
  SHOWROOM_TUTORIAL: '/showroom-tutorial',

  //profile
  PROFILE_INFORMATION: '/profile',
  PROFILE_NOTIFICATION: '/profile/notification',
  PROFILE_MY_ORDER: '/profile/my-order',
  PROFILE_DETAIL_ORDER: '/profile/order/detail-package/[id]',
  PROFILE_RANK: '/profile/rank',
  PROFILE_DISCOUNT: '/profile/discount',
  PROFILE_FAVOURITE: '/profile/favourite',
  PROFILE_HISTORY: '/profile/history',
  PROFILE_POINT_GUIDE: '/profile/point-guide',
  LOGOUT: '/logout',

  //about us
  ABOUT: '/about'
};
export default Routers;
