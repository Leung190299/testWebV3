type CardGiftItem = {
  name: string;
  image: string;
  newPrice: string;
  oldPrice: string;
  restProduct: string;
};

type CardWithRadioProps = {
  radioId?: string;
  isChecked?: boolean;
  onChange?: () => void;
  cardGift: CardGiftItem;
};

const CardGiftWithRadio = ({ radioId, isChecked = false, onChange, cardGift }: CardWithRadioProps) => {
  return (
    <div className={`relative rounded-2xl border border-transparent ${isChecked ? 'border-red-600' : ''} overflow-hidden`}>
      <button
        className={`absolute right-4 top-4 h-5 w-5 rounded-full border border-neutral-300 bg-neutral-0 ${
          isChecked ? 'border-red-600' : ''
        }`}
        onClick={onChange}
      />
      <div className={`absolute right-5 top-5 h-3 w-3 rounded-full bg-red-600 ${isChecked ? 'block ' : 'hidden'}`} />
      <input
        type="checkbox"
        name="flexRadioDefault"
        id={radioId}
        checked={isChecked}
        onChange={onChange}
        className="absolute right-4 top-4 h-4 w-4 cursor-pointer opacity-0"
      />
      <label htmlFor={radioId}>
        <div
          className={`overflow-hidden rounded-2xl border  ${
            isChecked ? 'border-red-600 bg-neutral-0' : 'border-transparent bg-neutral-50'
          }`}
        >
          <img src={`${cardGift.image}`} alt="gitf-img" className="aspect-square w-[17.5rem]" />
          <div className="p-4">
            <div className="whitespace-nowrap text-xl font-bold">{cardGift.name}</div>
            <div className="mt-2 flex items-center gap-2">
              <p className="text-xl font-bold">{cardGift.newPrice}đ</p>
              <p className="text-sm font-medium text-neutral-500 line-through">{cardGift.oldPrice}</p>
            </div>
            <p className="mt-2 whitespace-nowrap text-sm font-normal text-neutral-500">{`Chỉ còn ${cardGift.restProduct} sản phẩm`}</p>
          </div>
        </div>
      </label>
    </div>
  );
};

export default CardGiftWithRadio;
