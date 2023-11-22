
const NewsContact = () => {
  return (
	<div className="mt-4">

	<div className="mb-2 font-bold text-3xl font-itel">Liên hệ với iTel</div>

	<div className="social ">

	  <ul className="flex text-xs gap-4">
		<li className=" bg-neutral-200 px-6 py-3  rounded-full flex justify-center items-center">
		  <a href="https://zalo.me/3281327437324952111" className="flex font-bold items-center">
			<img src="/tutorial/social-1.png" alt="" className="mr-1 object-contain" />
			Zalo
		  </a>
		</li>

		<li className=" bg-neutral-200 px-6 py-3 rounded-full flex justify-center items-center">
		  <a href="tel:0877087087" className="flex font-bold items-center">
			<img src="/tutorial/social-4.png" alt="" className="mr-2 object-contain " />
			0877 087 087
		  </a>
		</li>
	  </ul>
	</div>
  </div>
  )
}

export default NewsContact