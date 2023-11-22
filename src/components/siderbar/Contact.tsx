const Contact = () => {
  return (
    <div className="mt-4">

      <div className="mb-2 font-bold">Liên hệ với iTel</div>
      <div className="livechat-contact flex p-3 px-4 mb-4 ">
        <div className="left">
          <p>Hỗ trợ 24/24</p>
          <div className="font-bold">Live Chat</div>
        </div>
        <button className="btn-chat">
          <div className="btn-primary btn rounded-full">
            <img src="tutorial/livechat.svg" alt="" />
            <span className="pl-2">Chat ngay</span>
          </div>
        </button>
      </div>
      <div className="social ">
        <p className="mb-2">Hoặc liên hệ với iTel qua</p>
        <ul className="flex text-xs gap-1">
          <li className=" bg-neutral-200 px-3 py-3  rounded-full flex justify-center items-center">
            <a href="https://zalo.me/3281327437324952111" className="flex font-bold">
              <img src="/tutorial/social-1.png" alt="" className="mr-1 object-contain" />
              Zalo
            </a>
          </li>
          <li className=" bg-neutral-200 px-3 py-3 rounded-full flex justify-center items-center">
            <a href="https://m.me/itel.fan" className="flex font-bold">
              <img src="/tutorial/social-2.png" alt="" className="mr-2 object-contain" />
              Facebook
            </a>
          </li>
          <li className=" bg-neutral-200 px-3 py-3 rounded-full flex justify-center items-center">
            <a href="mailto:dvkh@itelecom.vn" className="flex font-bold">
              <img src="/tutorial/social-3.png" alt="" className="mr-2 object-contain" />
              Email
            </a>
          </li>
          <li className=" bg-neutral-200 px-3 py-3 rounded-full flex justify-center items-center">
            <a href="tel:0877087087" className="flex font-bold">
              <img src="/tutorial/social-4.png" alt="" className="mr-2 object-contain" />
              0877 087 087
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
